import connectDB from "@/lib/db";
import Car from "@/models/Car";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const isAuthorised = (req: NextRequest) => {
  if (!req.cookies.has("access_token")) return false;

  const { value } = req.cookies.get("access_token") || {
    name: "",
    value: "",
  };

  try {
    verify(value, process.env.JWT_SECRET || "");
  } catch (error) {
    return false;
  }

  return true;
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const cars = await Car.find({}).sort({ updatedAt: -1 });
    return NextResponse.json({ cars }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting cars data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json(
      {
        message: "Unauthorised",
      },
      {
        status: 401,
      }
    );
  }

  const { form } = await req.json();

  try {
    await connectDB();
    const car = await Car.create(form);
    return NextResponse.json(
      {
        message: "Car added successfully",
        car,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
