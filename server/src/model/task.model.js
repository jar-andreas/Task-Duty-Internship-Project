import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    title: {
      type: String,
      required: [true, "Please add a task title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    tags: {
      type: String,
      enum: ["Urgent", "Important", "Personal"],
      required: [true, "Please select a tag"],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Task || model("Task", taskSchema);
