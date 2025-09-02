
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer", // references Farmer model
      required: true,
    },
    fertilizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fertilizer", // references Fertilizer model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminRemark: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
