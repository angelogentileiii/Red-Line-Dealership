import React from "react";
import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function LoginPage(){
    console.log('test')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { attemptLogin } = useOutletContext()

    const navigate = useNavigate()

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    function handleSubmit(e) {
        e.preventDefault()
        attemptLogin({username, password})
        navigate('/')
    }



    return (
        <>
            <form 
            className="user-form"
            onSubmit={handleSubmit}
            >
                <input
                type="text"
                onChange={handleChangeUsername}
                value={username}
                // name="username"
                placeholder="Username..."
                />
                <input
                type="text"
                onChange={handleChangePassword}
                value={password}
                // name="password"
                placeholder="Password..."
                />
                <button
                type="submit"
                value='Login'
                >
                Login
                </button>
            </form>
            <p>If you don't have a Login, please <Link to="/signup" className="instring-button">Signup</Link></p>
            
        </>
    )
}

export default LoginPage