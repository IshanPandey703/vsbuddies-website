import { Avatar, Button } from '@mui/material'
import "./FriendCard.css"
export default function FriendCard(props) {
    return (
        <div className="FriendCard">
            <Button onClick={props.onClick}>
            <Avatar src={props.icon}/>
            {props.children}
            </Button>
        </div>
    )
}
