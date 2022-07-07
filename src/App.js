import logo from './logo.svg';
import React, {useState} from 'react'
import io from 'socket.io-client'
import './App.css';
import Login from './js/Login'
import Dashboard from './js/Dashboard'
import useLocalStorage from './js/Storage'


const socket = io.connect("https://quiet-inlet-36677.herokuapp.com/");
function App() {
  const [username, setUsername] = useLocalStorage("username");
  var path;
  if(username) {
    path = <Dashboard username={username} />
  } else {
    path = <Login onUserSubmit={setUsername}/>
  }
  return (
    <>
      {path}

    </>
  )
}

export default App;
