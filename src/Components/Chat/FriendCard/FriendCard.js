import { Avatar, Button } from '@mui/material'
import "./FriendCard.css"
import CircleIcon from '@mui/icons-material/Circle';
export default function FriendCard(props) {
    // console.log(props.status);
    const status = props.status?"online":"offline";
    return (
        <div className="FriendCard">
            <Button onClick={props.onClick}>
            <div className="avatar-container">
                <Avatar className="FriendCardAvatar" src={props.icon} />
                <CircleIcon className={status} fontSize='1px'/>
            </div>
            {props.children}
            </Button>
        </div>
    )
}
