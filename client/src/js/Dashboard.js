import React, {useState} from 'react'
import '../css/Dashboard.css'
import io from 'socket.io-client'
import Chat from './Chat'

export default function Dashboard({ username }) {
  const socket = io.connect("http://localhost:3001");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if(username !== "" && room !== "") {
      socket.emit("join_room", room)
    }
  }
  const [open, setOpen] = useState(false);
  return (
    <div className="dashboardContainer">
        <div className="addContactBox">
            <h1>Find Another User</h1>
            <input type="text" name="Channel" onChange={(event) => {setRoom(event.target.value)}}/>
            <button onClick={() =>{setOpen(true);joinRoom();}}>Find</button>
        </div>

        <Chat isOpen={open} socket={socket} username={username} room={room} onClose={() => setOpen(false)}/>

    </div>
  )
}
