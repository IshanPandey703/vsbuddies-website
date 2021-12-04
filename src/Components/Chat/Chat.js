import FriendCard from "./FriendCard/FriendCard"
import "./Chat.css"
import { useState, useEffect } from "react";
import firebase from "firebase/compat";
function Chat(props) {

    const firestore = firebase.firestore();
    const [Friends, setFriends] = useState([]);
    const [curChat, setCurChat] = useState("0");
    useEffect(()=>{
        const friendsRef = firestore.collection('Users');
        friendsRef.doc(props.uid).get().then((doc)=>{
            const friends = doc.data().friends;
            let toSet = [];
            friends.forEach(async(friend) => {
                    const doc2 = await friendsRef.doc(friend).get();
                    const data = await doc2.data();
                    const name = data.name;
                    const icon = data.icon;
                    toSet = [...toSet, {
                        name: name,
                        icon: icon,
                        uid: friend
                    }];
                    setFriends(toSet);
            });
        })
    }, [props.uid, firestore])

    // useEffect(()=>{if(curChat!=="0"){
    //     const messageRef = firestore.collection("Messages").doc(props.uid);
    //     const query = messageRef.where()
    // }

    // },[curChat, props.uid])

    return (
        <div className="Chat">
            <div className="Friends-List">
                <div className="Friends-container">
                    {Friends && Friends.map((fr)=>{return<FriendCard onClick={()=>{setCurChat(fr.uid)}} key={fr.uid} icon={fr.icon}>{fr.name}</FriendCard>}) }
                </div>
            </div>
            <div className="CurChat">
                
            </div>
        </div>
    );
}

export default Chat