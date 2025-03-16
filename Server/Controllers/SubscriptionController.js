const Subscription = require('../Models/SubscriptionModel');
const user = require('../Models/UserModel')

// Subscribe a user to a channel
const subscribeUser = async (req, res) => {
  try {
    const { subscriberId, channelId } = req.body;

    const existingSubscription = await Subscription.findOne({ subscriberId, channelId });
    if (existingSubscription) {
      return res.status(400).json({ message: "Already subscribed." });
    }

    const newSubscription = new Subscription({ subscriberId, channelId });
    await newSubscription.save();

    //Update userModel 
    await user.findByIdAndUpdate(channelId, { $inc: { subscribers: 1 } });
    await user.findByIdAndUpdate(subscriberId, { $addToSet: { subscribedUsers: channelId } });

    res.status(200).json({ message: "Subscribed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unsubscribe a user from a channel
const unsubscribeUser = async (req, res) => {
  try {
    const { subscriberId, channelId } = req.body;
    
    // Find and delete the subscription
    const subscription = await Subscription.findOneAndDelete({ subscriberId, channelId });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }

    await user.findByIdAndUpdate(channelId, { $inc: { subscribers: -1 } });

    // ✅ Remove `channelId` from `subscribedUsers` array of `subscriberId`
    await user.findByIdAndUpdate(subscriberId, { $pull: { subscribedUsers: channelId } });

    res.status(200).json({ message: "Unsubscribed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all subscribers for a specific channel
const getSubscribers = async (req, res) => {
  try {
    const { channelId } = req.params;
    // Populate subscriber details (e.g., username, email)
    const subscribers = await Subscription.find({ channelId }).populate("subscriberId", "username email");
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all channels that a specific user is subscribed to
const getSubscribedChannels = async (req, res) => {
  try {
    const { subscriberId } = req.params;
    // Populate channel details (e.g., username, email)
    const subscriptions = await Subscription.find({ subscriberId }).populate("channelId", "profilePic name subscribers username");
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {subscribeUser, getSubscribedChannels, getSubscribers, unsubscribeUser}
