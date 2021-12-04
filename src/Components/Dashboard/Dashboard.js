// import firebase from 'firebase/compat/app';
import {
	AppBar,
	Avatar,
	Button,
	Toolbar,
} from "@mui/material";
import "./Dashboard.css";
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from "react";
import Chat from "../Chat/Chat"
import { PersonAdd } from "@mui/icons-material";
import Friends from "../Friends/Friends";


function Dashboard(props) {
	let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
	// Checks if user is in the Chat section or add Friends Section, initialises to 0 ie chats
	const [curActivity,setCurActivity] = useState(0);

	return (
		<div className="Dashboard">
			<AppBar position="static" className="dashboard-navbar" sx={{bgcolor: bgcolor}}>
				<Toolbar>
					<div className="dashboard-nav-left">
						<Avatar src={props.user.photoURL} />
					</div>
					<Button className="dashboard-nav-btn" variant="outlined" onClick={()=>{
						setCurActivity(1)
					}}>
						<PersonAdd color="primary"/>
					</Button>
					<Button className="dashboard-nav-btn" variant="outlined" onClick={()=>{
						setCurActivity(0)
					}}>
						<ChatIcon color="primary"/>
					</Button>
					<Button className="dashboard-nav-btn" onClick={props.func} variant="outlined">
						Sign Out
					</Button>
				</Toolbar>
			</AppBar>
		{/* On currActivity 0 -> renders Chat 
			   currActivity 1 -> renders Friends panel */}
		{curActivity===0&&<Chat uid={props.user.uid}/>}
		{curActivity===1&&<Friends uid={props.user.uid}/>}

		</div>
	);
}

export default Dashboard;
