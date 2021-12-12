import { Button, ButtonGroup, Avatar } from "@mui/material";
import  firebase  from "firebase/compat";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from "react";
import "./SenderCard.css";

function SenderCard(props){

    const db = firebase.firestore();
    
    // senderDetails contains details of sender of friend request
    let [senderDetails,setSenderDetalis] = useState({});


    useEffect(()=>{
        db.collection("Users").doc(props.uid).collection("Details").doc("Details").get().then(async(senderData)=>{
            const temp = senderData.data();
            setSenderDetalis(temp);
        }
        )// eslint-disable-next-line
    },[]);

    // console.log(userDetails);

    function reqAccept() {
        const sender = props.uid;
        const receiver = props.receiverUid;
        const receiverRref = db.collection("Users").doc(receiver).collection("Details").doc("Details").friend;
        receiverRref.update([sender]);
        const senderRref = db.collection("Users").doc(sender).collection("Details").doc("Details").friend;
        senderRref.update([receiver]);
    }

    function reqDecline() {
        // const sender = props.uid;
        // const receiver = props.receiverUid;
        // const receiverRref = db.collection("Users").doc(receiver).collection("Details").doc("Details");
        // receiverRref.update([sender]);
        // const senderRref = db.collection("Users").doc(sender).collection("Details").doc("Details").friend;
        // senderRref.update([receiver]);
        console.log("Removed");
    }

    const matchPercent = Math.floor(Math.random()*100);
    return (
        <div>
            {senderDetails!=={}&&(
                <div className="Sender-Card">
                    <div className="Spacer-small"></div>
                    <div className="Card-head">
                        <Avatar sx={{width:60, height:60}} className="Display-Card-Avatar" src={senderDetails.icon} />
                        <p>
                            {senderDetails.name}
                        </p>
                    </div>
                    <p>
                        {"Match Percent: "+matchPercent+"%"}
                    </p>
                    <div className="Spacer-large"></div>
                    <div className="button-container">
                        <ButtonGroup size="large">
                            <Button onClick={reqAccept}
                            sx={{color:"#0984e3", backgroundColor:"black", justifySelf:"flex-end"}} 
                            variant ="outlined"> <DoneIcon /> </Button>
                            <Button onClick ={reqDecline} 
                            sx={{color:"#0984e3", backgroundColor:"black", justifySelf:"flex-end"}} 
                            variant ="outlined"> <ClearIcon /> </Button>
                        </ButtonGroup>
                    </div>
                </div>
            )}
        </div> 
    );
    
    
}

export default SenderCard;