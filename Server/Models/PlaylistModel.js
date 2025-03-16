const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",  // References the Video model
        default: []
      }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
