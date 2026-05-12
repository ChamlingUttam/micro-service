import mongoose from "mongoose";

const uberSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    isAvailable:{
      type:Boolean,
      default:false
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// model
const Uber = mongoose.model("Uber", uberSchema);

export default Uber;