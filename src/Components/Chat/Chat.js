import FriendCard from "./FriendCard/FriendCard";
import "./Chat.css";
import { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat";
import CurChat from "./CurChat";
import { PersonAdd } from "@mui/icons-material";
import EmptyCard from "../EmptyCard/EmptyCard";

function Chat(props) {
	// initalise firestore
	const firestore = firebase.firestore();
	// Friends contains the list of friends, initalises to empty array
	const [Friends, setFriends] = useState([]);
	// curChat is the uid of the user whose chat panel is open ie the recipient of the chat messages
	const [curChat, setCurChat] = useState("0");
	// Fetch data on component mount
	const listeners = useRef([]);
	useEffect(() => {
		const friendsRef = firestore.collection("Users");
		friendsRef.doc(props.uid).collection("Details").doc("Details").get()
		.then(async (doc) => {
			if(doc.data()){
				const friends = await doc.data().friends || [];

				// next line handles the cases of undefined / null return types when fetching friends array from firebase
				if (friends && friends.length>0) {
					let toSet = [];
					friends.forEach(async (friend) => {
						const doc2 = await friendsRef.doc(friend).collection("Details").doc("Details").get();
							if(doc2.data()){
								let status = false;
								// attaching listener
								const listener = friendsRef.doc(friend).collection("Status").doc("Status")
								.onSnapshot(async(doc)=>{
									status = await doc.data().status;
									const name = await doc2.data().name || "";
									const icon = await doc2.data().icon || "";
									if(toSet.find(fr=> fr.uid===friend)){
										const temp = [];
										toSet.forEach(fr=>{
											// console.log(fr);
											if(fr.uid===friend) fr.status=status;
											temp.push(fr);
											// console.log(fr);	
										})
										// console.log(temp);
										setFriends(temp);
									} else {
										toSet = [
											...toSet,
											{
												name: name,
												icon: icon,
												uid: friend,
												status: status
											},
										];
										// console.log(toSet);
										// Update the friends state array
										setFriends(toSet);
									}
								});
								listeners.current.push(listener); 
							}
					});
				}
			}
		});
		return (()=>{
			// console.log(Friends);
			// deattaching listener
			listeners.current.forEach(listener=> listener());
		})
	}, [props.uid, firestore]);

	// console.log(statusList);
	// useEffect(()=>{
	// 	if(Friends && Friends.length>0){
	// 		const temp = {};
	// 		Friends.forEach(friend=>{
	// 			const listener = firestore.collection("Users").doc(friend.uid).collection("Status").doc("Status")
	// 			.onSnapshot(async(doc)=>{
	// 				temp[friend.uid] = await doc.data().status;
	// 				// console.log(temp);
	// 				setStatusList(temp);
	// 			})
	// 			listeners.current.push(listener);
	// 		})
	// 		// console.log(Friends);
	// 	}
	// 	return (()=>{
	// 		// console.log(Friends);
	// 		listeners.current.forEach(listener=> listener());
	// 	})
	// },[Friends]);

	// Line 51 to 61 check if the user is on a mobile device
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
	const isMobile = width <= 768;
	// For mobile only render either chat or Friends List
	if (isMobile) {
		const back = () => {
			setCurChat("0");
		};
		return (
			<div className="Chat">
				{curChat === "0" && (
					<div className="Friends-List">
						<div className="Friends-container">
							{(Friends && Friends.length>0)&&
								Friends.map((fr) => {
									return (
										<FriendCard
											onClick={() => {
												setCurChat(fr.uid);
											}}
											key={fr.uid}
											icon={fr.icon}
											status={fr.status}>
											{fr.name}
										</FriendCard>
									);
								})}
								{(Friends && Friends.length===0)&&
								<h3 className="nofriends">Go to <PersonAdd /> to make new friends</h3>
								}
						</div>
					</div>
				)}
				{curChat !== "0" && (
					<CurChat
						back={back}
						uid={props.uid}
						curChat={curChat}
						friendObj={Friends.find((fr) => fr.uid === curChat)}
					/>
				)}
			</div>
		);
	}
	// For Desktop / tablet load both side by side
	if (!isMobile) {
		return (
			<div className="Chat">
				<div className="Friends-List">
					<div className="Friends-container">
					{(Friends && Friends.length>0)&&
								Friends.map((fr) => {
									return (
										<FriendCard
											onClick={() => {
												setCurChat(fr.uid);
											}}
											key={fr.uid}
											icon={fr.icon}
											status={fr.status}>
											{fr.name}
										</FriendCard>
									);
								})}
								{(Friends && Friends.length===0)&&
								<h3 className="nofriends">Go to <PersonAdd /> to make new friends</h3>
								}
					</div>
				</div>
				{curChat === "0" ? (
					<div style={{height: "inherit", width: "100%"}}>
						<EmptyCard type="chat" text="Click any friend to start chatting!"/>
					</div>
				) : (
					<CurChat
						uid={props.uid}
						curChat={curChat}
						friendObj={Friends.find((fr) => fr.uid === curChat)}
					/>
				)}
			</div>
		);
	}
}

export default Chat;
