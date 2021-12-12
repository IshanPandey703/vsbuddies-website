import React, { useEffect, useState } from "react";
import firebase from "firebase/compat";
import "./AllUsers.css";
import UserCard from "../UserCard/UserCard";
import {AppBar,Toolbar} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export default function AllUsers(props) {
    
    const db = firebase.firestore();
    // let [userList,setUserList] = useState([]);

    let [allUserId,setAllUserId] = useState([]);
    let [curUserFriendsId,setCurUserFriendsId] = useState([]);
    let [filteredUserId,setFilterUserId] = useState([]);

    useEffect(()=>{
            db.collection("Users").get().then(async (docSnapshot)=>{
                const docs = docSnapshot.docs;
                const temp = docs.map(userid => userid.id);
                setAllUserId(temp);
            })
        
            db.collection("Users").doc(props.uid).collection("Details").doc("Details").get().then(async(curUserData) => {
                    const temp = await curUserData.data().friends;
                    setCurUserFriendsId(temp);
                }
            );
        },[]
    );
    
    useEffect(()=>{
        const temp = allUserId.filter(userId => {
            return !curUserFriendsId.includes(userId)&& userId!==props.uid
        });
        setFilterUserId(temp);
    },[allUserId,curUserFriendsId]);

    console.log(allUserId);
    console.log(curUserFriendsId);

    console.log(filteredUserId);

    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
    const color = bgcolor === "#fff"?"black":"white"

    function AddFriend(uid) {
        db.collection("Users").doc(uid).collection("Pending Requests").doc(props.uid).set({
            receivedTime: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    
    return(
        <div className = "All-User-List-Container">
        <AppBar position="static" elevation={1} sx={{
                bgcolor: bgcolor,
                color: color
                }}>
            <Toolbar>
                <PersonAddIcon />
                {props.option}
            </Toolbar>
        </AppBar>
            <div className = "UserCard-Container">
            {(filteredUserId.length>0)&&
                filteredUserId.map(user=><UserCard 
                key={user} uid = {user} text="Add Friend" onClick = {AddFriend} /> )
            }
            </div>
        </div>
    );


}