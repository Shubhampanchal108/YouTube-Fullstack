const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // References the User model
        default: []
      }]      
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
