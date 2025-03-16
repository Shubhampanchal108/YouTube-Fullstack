const history = require('../Models/HistoryModel')

const getHistory = async (req, res)=>{
    try {
        const {userId} = req.params;
        const response = await history.find({userId}).populate("videoId")

        if(response){
            return res.json({response})
        }
        else{
            res.json({msg:"No found"})
        }
    } catch (error) {
        console.log(error)
    }
}

// Add history entry
const addHistory = async (req, res) => {
    try {
      const { userId, videoId } = req.body;
      const historyEntry = new history({ userId, videoId });
      await historyEntry.save();
      res.status(201).json(historyEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {addHistory, getHistory}