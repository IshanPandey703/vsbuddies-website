import React,{useState,useEffect} from "react";
import firebase from "firebase/compat";
import { Avatar, Button } from '@mui/material'
import "./UserCard.css";


export default function UserCard(props) {
    
    console.log(props.uid);
    const db = firebase.firestore();
    let [userDetails,setUserDetalis] = useState({});

    useEffect(()=>{
        db.collection("Users").doc(props.uid).collection("Details").doc("Details").get().then(async(userData)=>{
            const temp = userData.data();
            setUserDetalis(temp);
        }
        )// eslint-disable-next-line
    },[]);

    // console.log(userDetails);
    const matchPercent = Math.floor(Math.random()*100);
    return (
        <div>
            {userDetails!=={}&&(
                <div className="User-Card">
                    <div className="Spacer-small"></div>
                    <div className="Card-head">
                        <Avatar sx={{width:60, height:60}} className="User-Card-Avatar" src={userDetails.icon} />
                        <p>
                            {userDetails.name}
                        </p>
                    </div>
                    <p>
                        {"Match Percent: "+matchPercent+"%"}
                    </p>
                    <div className="Spacer-large"></div>
                    <Button onClick={()=>{
                        props.onClick(props.uid);
                    }} sx={{color:"#0984e3", backgroundColor:"black", justifySelf:"flex-end"}} 
                    variant ="outlined">{props.text}</Button>
                </div>
            )}
        </div> 
    );
}