import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { URL } from '../App';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const Navigate = useNavigate()
    const [videos, setVideos] = useState([]);
    const [users, setUsers] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [subscribeBtn, setSubscribeBtn] = useState(false)
    const [subscription, setSubscription] = useState([]);
    const [history, setHistory] = useState([]);
    const [commnets, setComments] = useState([]);


    // Get all Videos
    const getVideos = async () => {
        try {
            const response = await axios.get(`${URL}/api/main/videos`);
            setVideos(response.data.result);
        } catch (error) {
            console.log("Error fetching videos:", error);
        }
    };

    // Get all Users
    const getUsers = async () => {
        try {
            const response = await axios.get(`${URL}/api/main/getUser`);
            if (response.data.success) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    // Get Single Video
    const SingleVideo = async (id) => {
        try {
            const response = await axios.get(`${URL}/api/main/singleVideo/${id}`);
            if (response.data.success) {
                localStorage.setItem("videoLink", response.data.result.videoUrl)
                localStorage.setItem("singleVideoData", JSON.stringify(response.data.result))
                setSidebarOpen(false);
                Navigate('/videoPlayer')
            } else {
                console.log("Oops! Something went wrong.");
            }
        } catch (error) {
            console.log("Error fetching single video:", error);
        }
    };

    //Show Channels details page
    const showChannel = async (id) => {
        try {
            const response = await axios.get(`${URL}/api/main/singleUser/${id}`);
            
            if (response?.data) {
                localStorage.setItem("channel", JSON.stringify(response.data));
    
                // Use navigate function
                // Navigate('/otherChannel')
            } else {
                console.log("Oops! Something went wrong");
            }
        } catch (error) {
            console.log("Error fetching channel data:", error);
        }
    };
    
     //update user
     const updateUser = async(id)=>{
        try {
            const user = await axios.get(`${URL}/api/main/singleUser/${id}`)
            if (user?.data){
                localStorage.setItem("user", JSON.stringify(user.data))
            }
            else{
                console.log("No user found")
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Subscribe User
    const subscribe = async(subscriberId, channelId)=>{
        try {
            const response = await axios.post(`${URL}/api/main/subscribe`, {subscriberId, channelId})

            if(response){
                console.log(response)
                updateUser(subscriberId)
                showChannel(channelId)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Unsubscribe a channel
    const unSubscribe = async(subscriberId, channelId)=>{
        try {
            const response = await axios.post(`${URL}/api/main/unsubscribe`, {subscriberId, channelId})

            if(response){
                console.log(response);
                updateUser(subscriberId)
                showChannel(channelId)
            }
        } catch (error) {
           console.log(error) 
        }
    }

    //get Subscribed Channels
    const getSubscribedChannels = async(id)=>{
        try {
            const result = await axios.get(`${URL}/api/main/user/${id}/subscriptions`)

            if(result.data){
                console.log(result.data)
                setSubscription(result.data)
            }
            else{
                console.log("something went wrong")
            }
        } catch (error) {
            console.log(error)    
        }
    }

    //Add History
    const addHistory = async(userId, videoId)=>{
        try {
            const result = await axios.post(`${URL}/api/main/createHistory`, {userId, videoId})

            if(result){
                console.log(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //get History
    const GetHistory = async(userId)=>{
        try {
            const response = await axios.get(`${URL}/api/main/history/${userId}`)

            if (response){
                console.log(response.data.response)
                setHistory(response.data.response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Like Button
    const Like = async(userId, videoId)=>{
        try {
            const result = await axios.post(`${URL}/api/main/like`, {userId, videoId})
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    //Remove Likes 
    const removeLike = async(userId, videoId)=>{
        try {
            const result = await axios.post(`${URL}/api/main/removeLike`, {userId, videoId})
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }

    }

    //Add Comment
    const addComment = async(videoId, userId, comment)=>{
        try{
            const result = await axios.post(`${URL}/api/main/addComment`, {videoId, userId, comment})

            if(result){
                console.log(result.data)
            }
            else{
                console.log("Something went wrong")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    //Get Comments
    const getComments = async(videoId)=>{
        try {
            const result = await axios.get(`${URL}/api/main/getComment/${videoId}`)

            if(result){
                console.log(result.data)
                setComments(result.data)
            }
            else{
                console.log("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const store = {
        getVideos,
        videos,
        getUsers,
        users,
        SingleVideo,
        sidebarOpen,
        setSidebarOpen,
        subscribe,
        showChannel,
        subscribeBtn, 
        setSubscribeBtn,
        unSubscribe,
        setSubscribeBtn,
        updateUser,
        getSubscribedChannels,
        subscription,
        addHistory,
        GetHistory,
        history,
        Like,
        removeLike,
        addComment,
        getComments,
        commnets,
    };

    return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
