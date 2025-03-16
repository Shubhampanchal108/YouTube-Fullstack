const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    subscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // User who is subscribing
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Channel being subscribed to
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
