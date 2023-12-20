import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const URL = "/api"

function Home() {

  const [currentUser, setCurrentUser] = useState(null)

  // SIGNUP, LOGIN AND LOGOUT FNS //

  // CHECK SESSION 

  useEffect(() => {
    fetch(URL + '/check_session')
    .then(res => {
      if(res.ok){
        res.json()
        .then(userData => {
          setCurrentUser(userData)
        })
      }
    })
  }, [])

  // SIGNUP //
  async function attemptSignup(userInfo) {
    const res = await fetch(URL + '/users', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid sign up')
    }
  }

  // LOGIN //
  async function attemptLogin(userInfo) {
    const res = await fetch(URL + '/login', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid login')
    }
  }

  // LOGOUT //
  function logout() {
    setCurrentUser(null)
    fetch(URL + '/logout', {method: "DELETE"})
  }

  // console.log(currentUser)

  return (
    <div className="home-container">
      <NavBar currentUser={currentUser} logout={logout} />
      <Outlet context={{attemptLogin, logout, currentUser}} />
    </div>
  );
}

export default Home;

