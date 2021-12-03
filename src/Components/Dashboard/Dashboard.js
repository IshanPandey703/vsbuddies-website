// import firebase from 'firebase/compat/app';
import {
	AppBar,
	Avatar,
	Button,
	Toolbar,
	Typography,
} from "@mui/material";
import "./Dashboard.css";
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from "react";
import Chat from "../Chat/Chat"
function Dashboard(props) {

	const [curActivity,setCurActivity] = useState(0);

	return (
		<div className="Dashboard">
			<AppBar position="static" className="dashboard-navbar" elevation={0} sx={{bgcolor: "#fff"}}>
				<Toolbar>
					<div className="dashboard-nav-left">
						<Avatar src={props.user.photoURL} />
					</div>
					<Button variant="outlined" onClick={()=>{
						setCurActivity(0)
					}}>
						<ChatIcon color="primary"/>
					</Button>
					<Button onClick={props.func} variant="outlined">
						Sign Out
					</Button>
				</Toolbar>
			</AppBar>

		{curActivity===0&&<Chat uid={props.uid}/>}

		</div>
	);
}

export default Dashboard;
