const commentModel = require('../Models/CommentsModel')


//Add Comment 
const addComment = async(req, res)=>{
    try{
        const {videoId, userId , comment} = req.body;
        const newComment = new commentModel({
            videoId, userId , comment
        })

        await newComment.save()
        res.status(200).json({msg:"Comment added successfully"})

    }
    catch(e){
        console.log(e.message)
    }
}

//Get Commnets
const getComments = async(req, res)=>{
    try{
        const {videoId} = req.params;
        const comments = await commentModel.find({videoId}).populate("userId", "name profilePic")
        res.status(200).json(comments)
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = {addComment, getComments}