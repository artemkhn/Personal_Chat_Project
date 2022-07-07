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
    <Container className="d-flex align-items-center" id="loginContainer">
        <Form onSubmit={handleSubmit} className="w-100 d-flex align-items-center flex-column">
            <Form.Group className="py-2">
                <Form.Label className="d-flex justify-content-center">Enter Your Username</Form.Label>
                <Form.Control className="w-100" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required></Form.Control>
            </Form.Group>
            <Button type="submit">Enter</Button>
        </Form>
    </Container>
  )
}
