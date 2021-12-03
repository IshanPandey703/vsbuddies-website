import "./App.css";
import Home from "./Components/Home/Home";
import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "./Components/Dashboard/Dashboard";

firebase.initializeApp({
	apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
	authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
	projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
	storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
	appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
});
const auth = firebase.auth();
const db = firebase.firestore();
function App() {
	const signIn = () => {
		const provider = new firebase.auth.GithubAuthProvider();
		auth.signInWithPopup(provider);
	};
	const signOut = () => {
		auth.signOut();
	};
	//eslint-disable-next-line
	const [user, loading, err] = useAuthState(auth);
		if(user){
		db.collection("Users").doc(user.uid)
			.get()
			.then((docSnapshot) => {
				if (docSnapshot.exists) {
					//user exists
				} else {
					db.collection("Users").doc(user.uid).set({
						uid: user.uid,
						friends: [],
						icon: user.photoURL,
						name: user.displayName?user.displayName:"No-Name",
					});
				}
			})}
	return (
		<div className="App">
			{user ? (
				<Dashboard func={signOut} user={user} />
			) : (
				<Home func={signIn} />
			)}
		</div>
	);
}

export default App;
