import "./Friends.css"
import SideBar from "./SideBar/SideBar"
import AllUsers from "./AllUsers/AllUsers"
import React,{useState} from "react"
import FriendList from "./FriendList/FriendList.jsx";
import FriendRequest from "./FriendRequest/FriendReqest";

function Friends(props) {

    const [curOption,setCurOption] = useState(0);

    function handleClick(num) {
        console.log(num);
        setCurOption(num);
    }

    return (
        <div className="Friends">
            <SideBar onClick ={handleClick} />
            {curOption === 0 && <AllUsers uid = {props.uid} option="Connect with other Devs" />}
            {curOption === 1 && <FriendRequest uid ={props.uid} option="Pending Friend Requests" />}
            {curOption === 2 && <FriendList uid = {props.uid} option="Friends" />}
        </div>
    )
}

export default Friends
