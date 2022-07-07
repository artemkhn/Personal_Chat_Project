import React, {useState} from 'react'
import '../css/Login.css'
import { Container, Button, Form, FormGroup } from 'react-bootstrap'

export default function Login({ onUserSubmit }) {
    const [username, setUsername] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        if(username != null) {
            onUserSubmit(username)
        }
    }

  return (
    <div id="loginContainer">
        <p id="appLogo">Quick Chat</p>
        <form onSubmit={handleSubmit} id="loginForm">
            <h3 id="enter">Enter Your Username</h3>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
            <br />
            <button id="loginButton" type="submit">Enter</button>
        </form>
    </div>
  )
}
