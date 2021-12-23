import React, { useEffect, useState } from "react";
import firebase from "firebase/compat";
import "./AllUsers.css";
import UserCard from "../UserCard/UserCard";
import {AppBar,Toolbar} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export default function AllUsers(props) {
    
    const db = firebase.firestore();

    let [allUserId,setAllUserId] = useState([]);
    let [curUserFriendsId,setCurUserFriendsId] = useState([]);
    let [filteredUserId,setFilterUserId] = useState([]);
    let [filteredUserData,setFilterUserData] = useState([]);

    useEffect(()=>{
            // fetching uid's of all users
            db.collection("Users").get().then(async (docSnapshot)=>{
                const docs = docSnapshot.docs;
                const temp = docs.map(userid => userid.id);
                setAllUserId(temp);
            })
        
            // fetching uid's of actv user's frineds
            db.collection("Users").doc(props.uid).collection("Details").doc("Details").get().then(async(curUserData) => {
                    const temp = await curUserData.data().friends;
                    setCurUserFriendsId(temp);
                }
            );
        },[]
    );
    
    useEffect(()=>{

        // getting id of user that are not friend with actv user
        const temp = allUserId.filter(userId => {
            return !curUserFriendsId.includes(userId)&& userId!==props.uid
        }); 
        setFilterUserId(temp);
    },[allUserId,curUserFriendsId]);

    useEffect(()=>{
        // fetching data of every user to be displayed 
        const temp = filteredUserId.map((userId)=>{
            let userData;
            // fetching data of user
            db.collection("Users").doc(userId).collection("Details").doc("Details").get().then(
                async(docSnapshot)=>{userData = await docSnapshot.data();}
            )
            return userData;
        })

        console.log(temp);
    },[filteredUserId])

    // console.log(allUserId);
    // console.log(curUserFriendsId);

    // console.log(filteredUserId);

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
                key={user} uid = {user} text="Add Friend" func = {AddFriend} /> )
            }
            </div>
        </div>
    );


}