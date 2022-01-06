import "./Friends.css"
import SideBar from "./SideBar/SideBar"
import AllUsers from "./AllUsers/AllUsers"
import React,{useState,useEffect} from "react"
import FriendList from "./FriendList/FriendList.jsx";
import FriendRequest from "./FriendRequest/FriendReqest";
import {useParams} from "react-router-dom";
import firebase from "firebase/compat";
import {AppBar,Avatar,Toolbar,} from "@mui/material";

function Friends() {

    // uid of actv user
    const {uid} = useParams(); 
    const [curOption,setCurOption] = useState(0);
    const firestore = firebase.firestore();
	const [avatarSrc, setAvatarSrc] = useState("")

    useEffect(()=>{
		//get user icon from firestore db
		const avatarSrcRef = firestore.collection("Users").doc(uid).collection("Details").doc("Details");
		avatarSrcRef.get().then(async(doc)=>{
			const temp = await doc.data()
			setAvatarSrc(temp)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
	const color = bgcolor === "#fff"?"#1976d2":"white"

    function handleClick(num) {
        console.log(num);
        setCurOption(num);
    }

    return (
        <>
        <AppBar position="static" className="dashboard-navbar" elevation={3} sx={{
            bgcolor: bgcolor,
            color: color
            }}>
            <Toolbar>
                <div className="dashboard-nav-left">
                    <Avatar src={avatarSrc.icon} />
                    {avatarSrc.name}
                </div>
            </Toolbar>
        </AppBar>
        <div className="Friends">
            <SideBar onClick ={handleClick} />
            {curOption === 0 && <AllUsers uid = {uid} option="Connect with other Devs" />}
            {curOption === 1 && <FriendRequest uid ={uid} option="Pending Friend Requests" />}
            {curOption === 2 && <FriendList uid = {uid} option="Friends" />}
        </div>
        </>
    )
}

export default Friends
