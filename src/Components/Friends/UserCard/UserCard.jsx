import {useState} from "react";
import { Avatar, Button } from '@mui/material'
import "./UserCard.css";
import {Link} from "react-router-dom";


export default function UserCard(props) {
    
    // buttonText changes according to type of card 
    // if Add Friend=> buttonText changes to Request Sent
    // if Remove Friend=> Removed
    let[btnDisabled,setBtnDisabled] = useState(props.disble.includes(props.uid)); 
    let darkmode = false
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkmode=true;
    }
    const matchPercent = props.matchPercent;
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
                    Match Percent: <strong>{matchPercent}%</strong>
                </p>
                <div className="Spacer-large"></div>
                <Link to={`/profile/${props.uid}`}>
                    <Button onClick={()=>{
                    }} sx={{color:darkmode?"white":"black", backgroundColor:darkmode?"#181a1b":"white", justifySelf:"flex-end", fontSize: "0.8rem"}} 
                    variant ="outlined" fullWidth>View Profile</Button>
                </Link>
                <Button onClick={()=>{ 
                    props.func(props.uid);
                    setBtnDisabled(true);
                }} sx={{color:darkmode?"white":"black", backgroundColor:darkmode?"#181a1b":"white", justifySelf:"flex-end", fontSize: "0.8rem"}} 
                variant ="outlined" disabled = {btnDisabled} >{btnDisabled?props.text==="Add Friend"?"Request Sent":"Removed" :props.text}</Button>
            </div>
        </div> 
    );
}