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

	const [curActivity,setCurActivity] = useState(0);

	return (
		<div className="Dashboard">
			<AppBar position="static" className="dashboard-navbar" sx={{bgcolor: "#fff"}}>
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

		{curActivity===0&&<Chat uid={props.user.uid}/>}
		{curActivity===1&&<Friends uid={props.user.uid}/>}

		</div>
	);
}

export default Dashboard;
