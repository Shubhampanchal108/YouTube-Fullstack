const video = require('../Models/VideoModel')
const {uploadVideo, uploadFile} = require('../Configs/Cloudinary')
const userModel = require('../Models/UserModel')

const getVideo = async(req, res)=>{
    try {
        const result = await video.find({})
        return res.json({result, success: true})
    } catch (error) {
        console.log(error)
    }
}

//uploadVideos
const uploadVideos = async (req, res) => {
    try {
        const { userId, title, description, views, likes, dislikes, category } = req.body;

        const videoFile = req.files['videoUrl'] ? req.files['videoUrl'][0] : null;
        const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;

        if (!userId || !title || !description || !category || !videoFile || !thumbnailFile) {
            return res.status(400).json({ message: "Please fill all fields and upload both video and thumbnail" });
        }

        // Upload files to Cloudinary
        const thumbnailUrl = await uploadFile(thumbnailFile.path);
        const videoUrlPath = await uploadVideo(videoFile.path);

        console.log(videoUrlPath, thumbnailUrl);

        const newVideo = new video({
            userId,
            title,
            description,
            views,
            likes,
            dislikes,
            category,
            videoUrl: videoUrlPath.secure_url,
            thumbnail: thumbnailUrl.secure_url
        });

        if (!newVideo) {
            return res.status(400).json({ message: "Failed to upload video" });
        }

        await newVideo.save();

        return res.status(201).json({ message: "Video uploaded successfully", newVideo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

//Single Video Controller for playing
const singleVideo = async (req, res) => {
    try {
        const id = req.params.id; // ✅ Corrected destructuring
        const result = await video.findOne({ _id: id }).populate("userId")

        if (result) {
            const Video = await video.findOneAndUpdate(result._id, { $inc: {views : 1 } });
            return res.json({ success: true, result });
        } else {
            return res.json({ msg: "Video not found", success: false });
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
};


//Like Controllers 
const Like = async(req, res)=>{
    try {
        const {userId, videoId} = req.body;
        const videoToLike = await video.findById(videoId);

        if(!videoToLike){
            return res.json("Sorry no video found");
        }
        
        if(videoToLike.likes.includes(userId)){
            return res.json("Already Liked");
        }

        videoToLike.likes.push(userId);

        // Save the updated video document
        await videoToLike.save();

        return res.json({msg:"Liked successfully"})
    } catch (error) {
        console.log(error)
    }
}

//Remove Like Controller
const removeLike = async(req, res)=>{
    try{
        const {userId , videoId} = req.body;
        const videoToRemove = await video.findById(videoId);

        if(!videoToRemove){
            return res.json("Sorry no video found");
        }

        if(videoToRemove.likes.includes(userId)){
            videoToRemove.likes.pull(userId);
            res.json("Like removed successfully")
        }
        else{
            return res.json("Already removed")
        }

        // Save the updated video document
        await videoToRemove.save();
    }
    catch(error){
        console.log(error)
    }
}

//Dislike Controller
const disLike = async(req, res)=>{
    try {
        const {userId, videoId} = req.body;
        const videoToLike = await video.findById(videoId);

        if(!videoToLike){
            return res.json("Sorry no video found");
        }
        
        if(videoToLike.likes.includes(userId)){
            videoToLike.likes.pull(userId);

        // Save the updated video document
            await videoToLike.save();
            return res.json({msg:"disLiked successfully", videoToLike});
        }

        return res.json({msg:"something went wrong"})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getVideo, uploadVideos, singleVideo, Like, disLike, removeLike}