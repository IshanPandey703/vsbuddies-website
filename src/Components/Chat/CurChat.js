/* eslint-disable no-unused-vars */
import { Send } from "@mui/icons-material";
import { Button } from "@mui/material";
import firebase from "firebase/compat";
import { useState, useEffect } from "react";
import MessageCard from "./MessageCard/MessageCard";
import { useCollectionData } from 'react-firebase-hooks/firestore';
function CurChat(props) {
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection("Users").doc(props.uid).collection("Messages");
    const recipientRef = firestore.collection("Users").doc(props.curChat).collection("Messages")
    const recvdquery = messagesRef.where("author","in",[props.uid, props.curChat])
    const [rcvd] = useCollectionData(recvdquery)
    const filteredrcvd = rcvd?rcvd.filter(msg=>((msg.author === props.uid && msg.to===props.curChat)||(msg.to === props.uid && msg.to === props.curChat ))):[]
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

    const [messageInput, setMessageInput] = useState("")

    const messageInputChange= (e)=>{
        setMessageInput(e.target.value)
    }
    const sendMessage = async (e)=>{
        e.preventDefault();
        await messagesRef.add({
            message: messageInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: props.uid,
            to: props.curChat
        })
        await recipientRef.add({
            message: messageInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: props.uid,
            to: props.curChat
        })
    }

    return (
        <div className="CurChat">
            <div className="messages-container">
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
