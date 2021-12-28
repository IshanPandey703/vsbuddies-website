// import randomImg from "../../Media/random.jpg";
import "./Profile.css";
import { useParams } from 'react-router-dom';
import firebase from "firebase/compat";
import {useEffect,useState,useRef} from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile(){

    const  {uid}  = useParams()
    // console.log(uid);

    const db = firebase.firestore();
    const auth = firebase.auth();
    
    const [user,loading,err] = useAuthState(auth);
    // console.log(user.email);

    const actvUserInterests = useRef();

    const [details,setDetails] = useState({})
    // fetching data on mount
    useEffect(async()=>{

        const docSnapshot = await db.collection("Users").doc(uid).collection("Details").doc("Details").get();
        const temp = docSnapshot.data();
        
        if(user.email!==uid){
            // fetching actv user interest list
            const userDoc = await db.collection("Users").doc(user.email).collection("Details").doc("Details").get();
            const temp = userDoc.data().interests;
            actvUserInterests.current=[...temp];
            // console.log(actvUserInterests);
        }

        setDetails(temp);
    },[]) 
    
    return (
        <div>
            {(Object.keys(details).length!==0) && (
                <div className="Profile">
                    <div className="Container-1">
                        <div className="profile-img">
                            {/* <img src = {randomImg} alt="User"/> */}
                        </div>
                        <div className="Name">
                            {details.name}
                        </div>
                        <div className="Bio">
                            <textarea maxLength="50" >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            </textarea>
                        </div>
                    </div>
                    <div className="Container-2">
                        <div className="Interests">
                            <div className="heading">Interests</div>
                            <div className="text-bg">
                            {details.interests.map((interest)=> {
                                if(user.email!==uid){
                                    if(actvUserInterests.current.includes(interest)){
                                        return (<div key={interest} className="text highlight"> {interest} </div>)
                                    }
                                }
                                return (<div key={interest} className="text"> {interest} </div>) 
                            })}
                            </div>
                        </div>
                        <div className="College">
                            <div className="heading">College/University</div>
                                <div className="text">{details.college}</div>
                        </div>
                        <div className="Top-two-languages">
                                <div className="heading">Top Two Languages </div>
                                <div className="text"> {details.topTwoLanguages[0]} </div>
                                <div className="text"> {details.topTwoLanguages[1]} </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}