/* eslint-disable no-unused-vars */
import firebase from "firebase/compat";
import { useState, useEffect } from "react";
function CurChat(props) {
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection("Users").doc(props.uid).collection("Messages");
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

    return (
        <div className="CurChat">
            my:{props.uid}
            <br/>
            friend: {props.curChat}
        </div>
    )
}

export default CurChat
