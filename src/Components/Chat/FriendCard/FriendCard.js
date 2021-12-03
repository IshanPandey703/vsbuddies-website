import { Avatar } from '@mui/material'
import React from 'react'
import "./FriendCard.css"
export default function FriendCard(props) {
    return (
        <div className="FriendCard">
            <Avatar src={props.icon}/>
            {props.children}
        </div>
    )
}
