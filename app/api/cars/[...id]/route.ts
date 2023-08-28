import connectDB from "@/lib/db";
import Car from "@/models/Car";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const isAuthorised = (req: NextRequest) => {
    if (!req.cookies.has("access_token")) return false;

    const { value } = req.cookies.get("access_token") || {
        name: "",
        value: ""
    };

    try {
        verify(value, process.env.JWT_SECRET || "");
    } catch (error) {
        return false;
    }

    return true;
};

type Params = {
    id: string[];
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const id: string = params.id[0];

    try {
        const car = await Car.findById(id);

        if (!car) {
            return NextResponse.json(
                { message: "Car does not exist" },
                { status: 404 }
            );
        }

        return NextResponse.json({ car }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error getting car data"
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    if (!isAuthorised(req)) {
        return NextResponse.json(
            {
                message: "Unauthorised"
            },
            {
                status: 401
            }
        );
    }

    const id: string = params.id[0];
    const { form } = await req.json();

    try {
        await connectDB();

        const originalDocument = await Car.findById(id);
        if (!originalDocument) {
            return NextResponse.json(
                { message: "Car does not exist" },
                { status: 404 }
            );
        }

        const updateObject = {
            ...form,
            $unset: Object.keys(originalDocument._doc)
                .filter(
                    (field) =>
                        !(field in form) && field !== "_id" && field !== "__v"
                )
                .reduce((obj, field) => ({ ...obj, [field]: 1 }), {})
        };

        await Car.updateOne({ _id: id }, updateObject);

        const car = await Car.findById(id);

        return NextResponse.json(
            {
                message: "Car updated successfully",
                car
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error updating car"
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    if (!isAuthorised(req)) {
        return NextResponse.json(
            {
                message: "Unauthorised"
            },
            {
                status: 401
            }
        );
    }

    const id: string = params.id[0];

    try {
        await connectDB();
        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return NextResponse.json(
                { message: "Car does not exist" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Car removed successfully",
                car
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error removing car" },
            { status: 500 }
        );
    }
}
