import FriendCard from "./FriendCard/FriendCard"
import "./Chat.css"
import { useState, useEffect } from "react";
import firebase from "firebase/compat";
import CurChat from "./CurChat";

function Chat(props) {
    // initalise firestore
    const firestore = firebase.firestore();
    // Friends contains the list of friends, initalises to empty array
    const [Friends, setFriends] = useState([]);
    // curChat is the uid of the user whose chat panel is open ie the recipient of the chat messages
    const [curChat, setCurChat] = useState("0");
    // Fetch data on component mount
    useEffect(()=>{
        const friendsRef = firestore.collection('Users');
        friendsRef.doc(props.uid).collection("Details").doc("Details").get().then(async(doc)=>{
            const friends = await doc.data().friends;
            // next line handles the cases of undefined / null return types when fetching friends array from firebase
            if(typeof friends !== "undefined" && friends !== null){let toSet = [];
            friends.forEach(async(friend) => {
                const doc2 = await friendsRef.doc(friend).collection("Details").doc("Details").get();
                    const name = await doc2.data().name;
                    const icon = await doc2.data().icon;
                    toSet = [...toSet, {
                        name: name,
                        icon: icon,
                        uid: friend
                    }];
                    // Update the friends state array
                    setFriends(toSet);
            }
            );}
        })
        // Firebase is not a real dependency of this useEffect hook, so suppressed es-lint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.uid])
    // Line 40 to 50 check if the user is on a mobile device
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
    // For mobile only render either chat or Friends List
    if(isMobile){
        const back = ()=>{setCurChat("0")}
        return(
            <div className="Chat">
            <div className="Friends-List">
                {curChat==="0"?(<div className="Friends-container">
                    {Friends && Friends.map((fr)=>{return<FriendCard onClick={()=>{setCurChat(fr.uid)}} key={fr.uid} icon={fr.icon}>{fr.name}</FriendCard>}) }
                </div>):(<CurChat back={back} uid={props.uid} curChat={curChat} friendObj={Friends.find(fr=>fr.uid === curChat)}/>)}
            </div>
        </div>
        )
    }
    // For Desktop / tablet load both side by side
    if(!isMobile){return (
        <div className="Chat">
            <div className="Friends-List">
                <div className="Friends-container">
                    {Friends && Friends.map((fr)=>{return<FriendCard onClick={()=>{setCurChat(fr.uid)}} key={fr.uid} icon={fr.icon}>{fr.name}</FriendCard>}) }
                </div>
            </div>
            {curChat ==="0"?(<div className="CurChat">
                
            </div>):<CurChat uid={props.uid} curChat={curChat} friendObj={Friends.find(fr=>fr.uid === curChat)}/>}
        </div>
    );}
}

export default Chat