import "./MessageCard.css"
function MessageCard(props) {
    return (
        <div className="Message-Card {props.sr}">
            {props.children}
        </div>
    )
}

export default MessageCard
