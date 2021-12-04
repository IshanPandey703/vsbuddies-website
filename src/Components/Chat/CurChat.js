/* eslint-disable no-unused-vars */
import { Send } from "@mui/icons-material";
import { Button } from "@mui/material";
import firebase from "firebase/compat";
import { useState, useEffect } from "react";
import MessageCard from "./MessageCard/MessageCard";
import { useCollectionData } from 'react-firebase-hooks/firestore';
function CurChat(props) {
    //initalise firestore
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection("Users").doc(props.uid).collection("Messages");
    const recipientRef = firestore.collection("Users").doc(props.curChat).collection("Messages")
    // messages ref -> firebase ref to the users Messages Collection
    // recipient ref -> firebase ref to the recipients Messages Collection
    const recvdquery = messagesRef.where("author","in",[props.uid, props.curChat])
    // this is a query to fetch all the messages ever created by either the user or the recipient
    const [rcvd] = useCollectionData(recvdquery)
    // this hook auto updates the rcvd which is an array of message objects
    const filteredrcvd = rcvd?rcvd.filter(msg=>((msg.author === props.uid && msg.to===props.curChat)||(msg.to === props.uid && msg.author === props.curChat ))):[]
    // filter through the rcvd array to find messages between the user and recipient
    // line 22 to 32 check if the user is on a mobile device for future use
    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = width <= 768;

    // Bind the input from chat box to messageInput State
    const [messageInput, setMessageInput] = useState("")
    const messageInputChange= (e)=>{
        setMessageInput(e.target.value)
    }
    // Handles form submission ie sending message
    const sendMessage = async (e)=>{
        e.preventDefault();
        // add message object to user's Message collection
        await messagesRef.add({
            message: messageInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: props.uid,
            to: props.curChat
        })
        // add message object to recipient's Message collection
        await recipientRef.add({
            message: messageInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: props.uid,
            to: props.curChat
        })
        setMessageInput("")
    }

    return (
        <div className="CurChat">
            <div className="messages-container">
                {/* Iterate through filetered messaged, applying a class of sent or recieved */}
            {rcvd?(filteredrcvd.map(msgObject=><MessageCard sr={msgObject.author === props.uid?"sent":"recieved"}>{msgObject.message}</MessageCard>)):""}
            </div>
            <form className="message-form" onSubmit={sendMessage}>
                <input className="message-input" value={messageInput} onChange={messageInputChange} placeholder="Message"/>
                <Button variant="contained" type="submit">
                    <Send color="#fff" />
                </Button>
            </form>
        </div>
    )
}

export default CurChat