import { useEffect, useState } from "react";
import firebase from "firebase/compat";
import UserCard from "../UserCard/UserCard";
import { AppBar, Toolbar } from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import "./FriendList.css";


function FriendList(props) {
    
    const db = firebase.firestore();
    
    const [friendIdList,setFriendIdList] = useState([]);
    
    useEffect(()=>{
        db.collection("Users").doc(props.uid).collection("Details").doc("Details").get().then(async(doc)=>{
            const temp = await doc.data().friends;
            setFriendIdList(temp);
        })
    // eslint-disable-next-line
    },[]
    );

    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
    const color = bgcolor === "#fff"?"black":"white"

    async function RemoveFriend(friend){
        const userRef = db.collection("Users").doc(props.uid).collection("Details").doc("Details");
        const friendRef = db.collection("Users").doc(friend).collection("Details").doc("Details");

        console.log(friend);

        // Remove friend's Uid from user's friend list
        const removeFriend = userRef.update({
            friends: firebase.firestore.FieldValue.arrayRemove(friend)
        })

        // Remove user's Uid from Friend's friend list
        const removeUser = friendRef.update({
            friends: firebase.firestore.FieldValue.arrayRemove(props.uid)
        })
    }

    return (
        <div className= "Friends-list-container">
                <AppBar position="static" elevation={1} sx={{
                    bgcolor: bgcolor,
                    color: color
                    }}>
                <Toolbar>
                    <PeopleAltIcon />
                    {props.option}
                </Toolbar>
                </AppBar>
                <div className="Friends-card-container">
                    {(friendIdList.length > 0) && friendIdList.map(friend=> <UserCard 
                    key={friend} uid = {friend} text = "Remove Friend" func = {RemoveFriend}/>)}
                </div>
        </div>
    );
}

export default FriendList;