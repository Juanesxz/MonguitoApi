import mongoose from "mongoose";

const workRegisterSchema = new mongoose.Schema(
    {

        conceptstitle: {
            type: String,
            required: true,
            trim: true,
        },
        propertyconcept: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("concepts", workRegisterSchema);
