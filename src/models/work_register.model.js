import mongoose from "mongoose";

const workRegisterSchema = new mongoose.Schema(
    {
        workerId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        workDate: {
            type: Date,
            required: true,
        },
        workTitle: {
            type: String,
            required: true,
            trim: true,
        },
        workColor: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("workRegister", workRegisterSchema);
