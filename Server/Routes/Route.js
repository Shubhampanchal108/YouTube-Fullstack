const express = require("express");
const Router = express.Router();
const {
  UserSignUp,
  getUser,
  userLogin,
  singleUser
} = require("../Controllers/UserController");
const {
  getVideo,
  uploadVideos,
  singleVideo,
  Like,
  disLike,
  removeLike,
} = require("../Controllers/VideoController");
const upload = require("../Middlewares/Multer");
const {
  subscribeUser,
  getSubscribedChannels,
  getSubscribers,
  unsubscribeUser,
} = require("../Controllers/SubscriptionController");
const {addHistory, getHistory} = require('../Controllers/HistoryController')
const {addComment, getComments} = require('../Controllers/CommentController')
const {showPlaylist} = require('../Controllers/PlaylistController')

//USER ROUTES
Router.get("/getUser", getUser);
Router.get("/singleUser/:id", singleUser)
Router.post("/signUp", upload.single("profilePic"), UserSignUp);
Router.post("/login", userLogin);
Router.put("/updateUser");
Router.delete("/deleteUser");

//VIDEO ROUTES
Router.get("/videos", getVideo);

Router.post(
  "/uploadVideo",
  upload.fields([
    { name: "videoUrl", maxCount: 1 }, // One video file
    { name: "thumbnail", maxCount: 1 }, // One image file
  ]),
  uploadVideos
);

Router.put("/updateVideo");
Router.get("/singleVideo/:id", singleVideo);
Router.delete("/deleteVideo");
Router.post('/like', Like)
Router.post('/dislike', disLike)
Router.post('/removeLike', removeLike)

//SUBSCRIBE ROUTES
Router.post("/subscribe", subscribeUser);
Router.post("/unsubscribe", unsubscribeUser);
Router.get("/channel/:channelId/subscribers", getSubscribers);
Router.get("/user/:subscriberId/subscriptions", getSubscribedChannels);

//HISTORY ROUTES
Router.get("/history/:userId", getHistory)
Router.post("/createHistory", addHistory)

//COMMENT ROUTES
Router.post("/addComment", addComment)
Router.get("/getComment/:videoId", getComments)

//PLAYLIST ROUTES
Router.get('/playlist', showPlaylist)

module.exports = Router;
