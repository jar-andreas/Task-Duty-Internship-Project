import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please input a username name"],
      maxlength: [20, "Username must not be more than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
      minlength: [8, "Password must not be less than 8 characters"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || model("User", userSchema);
