const PlaylistModel = require("../Models/PlaylistModel")

const showPlaylist = async(req, res)=>{
    try{
        const result = await PlaylistModel.find({}).populate("userId", "videos")

        if (!result){
            return res.json({msg:"No data found"})
        }
        else{
            res.json(result)
        }
    }catch(error){
        console.log(error.message)
    }
}

// Create playlist controller
const createPlaylist = async(req, res)=>{
    try{
        const {userId, name} = req.body;

        const result = new PlaylistModel
    }catch(error){
        console.log(error.message)
    }
}


module.exports = {showPlaylist}