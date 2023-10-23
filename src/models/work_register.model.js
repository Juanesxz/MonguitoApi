import mongoose from "mongoose";

const workRegisterSchema = new mongoose.Schema(
    {
        isHoliday: {
            type: Boolean,
            required: true,
        },
        isWeekend: {
            type: Boolean,
            required: true,
        },
        workerId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        workDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("workRegister", workRegisterSchema);
