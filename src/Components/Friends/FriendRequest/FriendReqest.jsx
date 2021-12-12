import firebase from "firebase/compat";
import {useState,useEffect} from "react";
import {AppBar,Toolbar} from "@mui/material";
import SenderCard from "./SenderCard/SenderCard";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import "./FriendRequest.css";

function FriendRequest(props) {
    const db = firebase.firestore();

    // senderIdList contains uid of every user that sent req to Logged in user
    const [senderIdList,setSenderIdList] = useState([]);
    
    useEffect(()=>{
        
        const senderListRef = db.collection("Users").doc(props.uid).collection("Pending Requests");
        
        senderListRef.get().then(async(doc)=>{
            const docs = doc.docs;
            const temp = docs.map(senderId => senderId.id);
            setSenderIdList(temp);
        })
    },[])

    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
    const color = bgcolor === "#fff"?"black":"white"

    return (
        <div className="All-sender-list-container">
            <AppBar position="static" elevation={1} sx={{
                    bgcolor: bgcolor,
                    color: color
                    }}>
                <Toolbar>
                    <ArrowCircleRightIcon />
                    {props.option}
                </Toolbar>
            </AppBar>
            <div className="Sender-card-container">
                {(senderIdList.length > 0) && 
                    senderIdList.map(senderId=> <SenderCard key={senderId} uid = {senderId} receiverUid = {props.uid} />)
                }
            </div>
        </div>
    );

}

export default FriendRequest;