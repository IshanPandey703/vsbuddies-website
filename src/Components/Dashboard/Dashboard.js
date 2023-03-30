import { AppBar,Avatar,Button,Toolbar} from "@mui/material";
import "./Dashboard.css";
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat"
import { PersonAdd } from "@mui/icons-material";
import firebase from "firebase/compat"
import { Link } from "react-router-dom";
import MODAL from "../Modal/Modal";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from "react-firebase-hooks/auth";
import {io} from "socket.io-client";

function Dashboard() {
	//initalise firestore
    const firestore = firebase.firestore();
	const auth = firebase.auth();
	// eslint-disable-next-line no-unused-vars
	const [user,loading,err] = useAuthState(auth);
	const [avatarSrc, setAvatarSrc] = useState({icon: "", name: ""})
	// if user details are incomplete modal will appear
	const [showModal,setShowModal] = useState(false);

	useEffect(()=>{
		const foruseeffect = async()=>{
			//get user icon from firestore db
			if(user){
				// connect to socket-server
				const socket = io(process.env.REACT_APP_SOCKET_SERVER);
				socket.on("connect",()=>{
					// on connecting send actv user's to server 
					socket.emit("message",user.email);
				});

				const avatarSrcRef = await firestore.collection("Users").doc(user.email).collection("Details").doc("Details");
				avatarSrcRef.get().then(async(doc)=>{
					const temp = await doc.data()
					// Display Modal if user details incomplete
					if(temp){
						if(temp.name==="No-Name"||temp.bio.length===0
						||temp.college.length===0||temp.topTwoLanguages[0].length===0
						||temp.topTwoLanguages[1].length===0||temp.interests.length===0){
							setShowModal(true);
						}
						setAvatarSrc(temp)
					}
				})
			}
		}
		foruseeffect();
	}, [firestore, user])


	let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
	const color = bgcolor === "#fff"?"#1976d2":"white"
	// Checks if user is in the Chat section or add Friends Section, initialises to 0 ie chats
	const [curActivity,setCurActivity] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const signOut = () => {
		auth.signOut();
		window.location.href = process.env.REACT_APP_DASHBOARD_URL;
	};

	const isMobile = width <= 768;
	return (
		<>
		{ (user) && 
			<div className="Dashboard">
			<AppBar position="static" className="dashboard-navbar" elevation={3} sx={{
				bgcolor: bgcolor,
				color: color
				}}>
				<Toolbar>
					<div className="dashboard-nav-left">
						<Avatar src={avatarSrc.icon } />
						{!isMobile && avatarSrc.name}
					</div>
					<Link to={"/connect"}>
						<Button className="dashboard-nav-btn" variant="outlined" >
							<PersonAdd color="primary"/>
						</Button>
					</Link>
					<Button className="dashboard-nav-btn" variant="outlined" onClick={()=>{
						setCurActivity(0)
					}}>
						<ChatIcon color="primary"/>
					</Button>
					<Button className="dashboard-nav-btn" onClick={signOut} variant="outlined">
						<LogoutIcon/>
					</Button>
				</Toolbar>
			</AppBar>
			{showModal && <MODAL />}
			{/* On currActivity 0 -> renders Chat  */}
			{curActivity===0&&<Chat uid={user.email}/>}
			</div>
		}
		</>
	);
}

export default Dashboard;

// /Profile?uid={}

// /Profile?uid={anouauoad}
