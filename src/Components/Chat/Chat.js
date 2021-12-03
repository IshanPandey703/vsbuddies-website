import FriendCard from "./FriendCard/FriendCard"
import "./Chat.css"

function Chat(props) {
    const Friends = [{
        icon: "https://avatars.githubusercontent.com/u/44966242?v=4",
        name: "Friend 1"
    }, {
        icon: "https://avatars.githubusercontent.com/u/44966242?v=4",
        name: "Friend 2"},{
            icon: "https://avatars.githubusercontent.com/u/44966242?v=4",
            name: "Friend 3"}]
    return (
        <div className="Chat">
            <div className="Friends-List">
                {Friends && Friends.map((fr)=>{return<FriendCard icon={fr.icon}>{fr.name}</FriendCard>}) }
            </div>
            <div className="CurChat">
                fdjkhgdfkj
            </div>
        </div>
    )
}

export default Chat