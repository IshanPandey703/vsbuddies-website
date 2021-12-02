// import firebase from 'firebase/compat/app';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
function Dashboard (props){
    // const firestore = firebase.firestore()
    // const messagesRef = firestore.collection("Messages")
    // const query = messagesRef.orderBy("createdAt").limit(25)

    // const [Messages] = useCollectionData(query, {idField: 'id'});
    // {Messages && Messages.map(msg=><p key={msg.id}>{msg.message}</p>)}
    return(
        <div className="Dashboard">
            <button onClick={props.func}>Sign Out</button>
        </div>
    )
}

export default Dashboard