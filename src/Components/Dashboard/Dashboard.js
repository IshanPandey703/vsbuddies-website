import {
	AppBar,
	Avatar,
	Button,
	Toolbar,
} from "@mui/material";
import "./Dashboard.css";
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat"
import { PersonAdd } from "@mui/icons-material";
import Friends from "../Friends/Friends";
import firebase from "firebase/compat"
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Dashboard(props) {
	//initalise firestore
    const firestore = firebase.firestore();
	const [avatarSrc, setAvatarSrc] = useState("")
	useEffect(()=>{
		//get user icon from firestore db
		const avatarSrcRef = firestore.collection("Users").doc(props.user.email).collection("Details").doc("Details");
		avatarSrcRef.get().then(async(doc)=>{
			const temp = await doc.data()
			setAvatarSrc(temp)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
	const color = bgcolor === "#fff"?"#1976d2":"white"
	// Checks if user is in the Chat section or add Friends Section, initialises to 0 ie chats
	const [curActivity,setCurActivity] = useState(0);

	return (
		<div className="Dashboard">
			<AppBar position="static" className="dashboard-navbar" elevation={3} sx={{
				bgcolor: bgcolor,
				color: color
				}}>
				<Toolbar>
					<div className="dashboard-nav-left">
						<Avatar src={avatarSrc.icon} />
						{avatarSrc.name}
					</div>
					<Link to="/IshanPandey">
						<Button className="dashboard-nav-btn" variant="outlined" >
							<AccountCircleIcon color="primary"/>
						</Button>
					</Link>
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
			   currActivity 1 -> renders Friends panel  */}
		{curActivity===0&&<Chat uid={props.user.email}/>}
		{curActivity===1&&<Friends uid={props.user.email}/>}

		</div>
	);
}

export default Dashboard;
