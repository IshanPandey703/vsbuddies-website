import FriendCard from "./FriendCard/FriendCard"
import "./Chat.css"
import { useState, useEffect } from "react";
import firebase from "firebase/compat";
function Chat(props) {

    const [Friends, setFriends] = useState([]);
    useEffect(()=>{
        const firestore = firebase.firestore();
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
    }, [props.uid])
    return (
        <div className="Chat">
            <div className="Friends-List">
                {Friends && Friends.map((fr)=>{return<FriendCard key={fr.uid} icon={fr.icon}>{fr.name}</FriendCard>}) }
            </div>
            <div className="CurChat">
                fdjkhgdfkj
            </div>
        </div>
    );
}

export default Chat