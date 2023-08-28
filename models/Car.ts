import mongoose, { Model, Schema } from "mongoose";

let Car: Model<any>;

try {
    Car = mongoose.model("Car");
} catch (error) {
    const carSchema = new Schema({}, { strict: false });

    Car = mongoose.model("Car", carSchema);
}

export default Car;
