import React,{useState,useEffect} from "react";
// import firebase from "firebase/compat";
import { Avatar, Button } from '@mui/material'
// import { useDocumentData } from "react-firebase-hooks/firestore";
import "./UserCard.css";


export default function UserCard(props) {
    
    // TODO: data fetch -> react-firebase-hooks 

    // console.log(props.uid);
    // const db = firebase.firestore();
    // // let [userDetails,setUserDetalis] = useState({});
    // const userRef = db.collection("Users").doc(props.uid).collection("Details").doc("Details");
    // const [userDetails] = useDocumentData(userRef);
    // buttonText changes according to type of card 
    // if Add Friend=> buttonText changes to Request Sent
    // if Remove Friend=> Removed
    let [btnText,setBtnText] = useState(props.text);
    let[btnDisabled,setBtnDisabled] = useState(false); 

    const matchPercent = Math.floor(Math.random()*100);
    return (
        <div>
            <div className="User-Card">
                <div className="Spacer-small"></div>
                <div className="Card-head">
                    <Avatar sx={{width:60, height:60}} className="User-Card-Avatar" src={props.icon} />
                    <p>
                        {props.name}
                    </p>
                </div>
                <p>
                    {"Match Percent: "+matchPercent+"%"}
                </p>
                <div className="Spacer-large"></div>
                <Button onClick={()=>{
                    props.func(props.uid);
                    let txt = "";
                    if(props.text==="Add Friend"){
                        txt = "Request Sent"
                    }else if(props.text==="Remove Friend"){
                        txt = "Removed";
                    }
                    setBtnText(txt);
                    setBtnDisabled(true);
                }} sx={{color:"#0984e3", backgroundColor:"black", justifySelf:"flex-end"}} 
                variant ="outlined" disabled = {btnDisabled} >{btnText}</Button>
            </div>
        </div> 
    );
}