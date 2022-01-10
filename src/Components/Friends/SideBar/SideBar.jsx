import React from "react";
import "./SideBar.css";
import { Button } from '@mui/material'
    import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

export default function SideBar(props) {
    return (
        <div className="Options-List">
            <div className="Options-Container">
                <div className ="option-card">
                    <Button onClick={()=>{
                        props.onClick(0);
                    }}>
                        <PersonAddIcon className="optionIcon"/>
                        Add other Devs
                    </Button>
                </div>
                <div className ="option-card">
                    <Button onClick={()=>{
                        props.onClick(1);
                    }}>
                        <ArrowCircleRightIcon className="optionIcon" />
                        Friend Requests
                    </Button>
                </div>
                <div className ="option-card">
                    <Button onClick={()=>{
                        props.onClick(2);
                    }}>
                        <PeopleAltIcon className="optionIcon" />
                        Friends List
                    </Button>
                </div>
                <div className ="option-card">
                    <Link to={`/profile/${props.user}`}>
                        <Button>
                            <AccountCircleIcon className="optionIcon" />
                            Your Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
