import React, { useState, useEffect } from 'react'
import '../css/Chat.css'
import ReactDom from 'react-dom'

export default function Chat({socket, username, room, isOpen, onClose}) {
    const [cMessage, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if(cMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: cMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messageData);
            setMessage("");
        }
    }

    const CHAT_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFAFA',
        padding: '20px',
        width: '30vw',
        height: '60vh',
        borderRadius: '2%',
        zIndex: 1000
    }

    const OVERLAY = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
    
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);

    if(!isOpen) {
        return null;
    }
  return ReactDom.createPortal(
    <>
    <div style={OVERLAY} />
    <div style={CHAT_STYLES}>
        <div id="chatContainer">
            <button onClick={onClose}>Close</button>
            <div className="chatHeader">
                <p>Quick Chat</p>
             </div>
            <div className="chatBody">
                {messageList.map((messageC) => {
                    return <div className="message" id={username === messageC.username ? "you" : "other"}>
                        <div className="messageBox">
                            <div className="message-content">
                                <p>{messageC.message}</p></div><div className="message-meta">
                                <p>{messageC.username}</p><p>{messageC.time}</p>
                            </div>
                        </div>
                        </div>;
                })}
            </div>
            <div className="chatFooter">
                <input type="text" value={cMessage} placeholder='Message' onChange={(event) => {setMessage(event.target.value)}} onKeyPress={(event) => {event.key === "Enter" && sendMessage();}}/>
                <button id="sendButton" onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    </div>
    </>,
    document.getElementById('portal')
  )
}
