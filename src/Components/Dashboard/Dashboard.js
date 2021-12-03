// import firebase from 'firebase/compat/app';
import { Search } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import "./Dashboard.css"
// import { useCollectionData } from 'react-firebase-hooks/firestore';
function Dashboard(props) {
	// const firestore = firebase.firestore()
	// const messagesRef = firestore.collection("Messages")
	// const query = messagesRef.orderBy("createdAt").limit(25)

	// const [Messages] = useCollectionData(query, {idField: 'id'});
	// {Messages && Messages.map(msg=><p key={msg.id}>{msg.message}</p>)}
	return (
		<div className="Dashboard">
			<Button onClick={props.func} variant="outlined">Sign Out</Button>
		</div>
	);
}

export default Dashboard;
