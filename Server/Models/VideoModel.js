const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Refers to the User (Uploader)
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId, // Users who liked the video
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId, // Users who disliked
        ref: "User",
      },
    ],
    category: {
      type: String,
      enum: [
        "Technology",
        "Education",
        "Entertainment",
        "Gaming",
        "Music",
        "Sports",
        "News",
        "Vlogs",
        "Comedy",
        "Lifestyle",
        "Science",
      ],
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
