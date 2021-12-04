import FriendCard from "./FriendCard/FriendCard"
import "./Chat.css"
import { useState, useEffect } from "react";
import firebase from "firebase/compat";
import CurChat from "./CurChat";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.uid])
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

    if(isMobile){
        return(
            <div className="Chat">
            <div className="Friends-List">
                {curChat==="0"?(<div className="Friends-container">
                    {Friends && Friends.map((fr)=>{return<FriendCard onClick={()=>{setCurChat(fr.uid)}} key={fr.uid} icon={fr.icon}>{fr.name}</FriendCard>}) }
                </div>):(<CurChat uid={props.uid} curChat={curChat}/>)}
            </div>
        </div>
        )
    }

    if(!isMobile){return (
        <div className="Chat">
            <div className="Friends-List">
                <div className="Friends-container">
                    {Friends && Friends.map((fr)=>{return<FriendCard onClick={()=>{setCurChat(fr.uid)}} key={fr.uid} icon={fr.icon}>{fr.name}</FriendCard>}) }
                </div>
            </div>
            {curChat ==="0"?(<div className="CurChat">
                
            </div>):<CurChat uid={props.uid} curChat={curChat}/>}
        </div>
    );}
}

export default Chat