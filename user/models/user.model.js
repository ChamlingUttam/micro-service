import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
  select: false
},
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// export model
const User = mongoose.model("User", userSchema);

export default User;