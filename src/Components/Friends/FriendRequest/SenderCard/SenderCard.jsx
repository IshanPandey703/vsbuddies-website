import { Button, ButtonGroup, Avatar } from "@mui/material";
import firebase from "firebase/compat";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import "./SenderCard.css";

function SenderCard(props) {
    const db = firebase.firestore();

    async function reqAccept() {
        const sender = props.uid;
        const receiver = props.receiverUid;
        const receiverRref = db.collection("Users").doc(receiver).collection("Details").doc("Details");
        const senderRref = db.collection("Users").doc(sender).collection("Details").doc("Details");

        // Add sender's uid in receiver's friend List
        const addSender = await receiverRref.update({
            friends: firebase.firestore.FieldValue.arrayUnion(sender)
        });

        // Add receiver's uid in sender's friend List
        const addReceiver = await senderRref.update({
            friends: firebase.firestore.FieldValue.arrayUnion(receiver)
        });

        // delete the doc with key as Uid of sender in receiver's Pending Req Collection
        const removeSender = await db.collection("Users").doc(receiver).collection("Pending Requests")
            .doc(sender).delete();
    }

    async function reqDecline() {
        const sender = props.uid;
        const receiver = props.receiverUid;
        const receiverRef = db.collection("Users").doc(receiver).collection("Pending Requests").doc(sender);

        // delete the doc with key as Uid of sender in receiver's Pending Req Collection
        const removeSender = await receiverRef.delete();
    }

    const matchPercent = props.matchPercent;
    return (
        <div>
            <div className="Sender-Card">
                <div className="Spacer-small"></div>
                <div className="Card-head">
                    <Avatar sx={{ width: 60, height: 60 }} className="Display-Card-Avatar" src={props.icon} />
                    <p>
                        {props.name}
                    </p>
                </div>
                <p>
                    {"Match Percent: " + matchPercent + "%"}
                </p>
                <div className="Spacer-large"></div>
                <div className="button-container">
                    <ButtonGroup size="large">
                    <Button onClick={() => {
                    }} sx={{ color: "white", backgroundColor: "#181a1b", justifySelf: "flex-end", fontSize: "0.8rem" }}
                        variant="outlined" fullWidth >View Profile</Button>
                    </ButtonGroup>
                    <ButtonGroup fullWidth = {true}>
                        <Button onClick={reqAccept}
                            sx={{ color: "#fff", backgroundColor: "#181a1b", justifySelf: "flex-end" }}
                            variant="outlined"> <DoneIcon /> </Button>
                        <Button onClick={reqDecline}
                            sx={{ color: "#fff", backgroundColor: "#181a1b", justifySelf: "flex-end" }}
                            variant="outlined"> <ClearIcon /> </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );


}

export default SenderCard;