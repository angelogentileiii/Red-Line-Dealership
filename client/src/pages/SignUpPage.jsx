import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";

function SignUpPage(){
    const navigate = useNavigate()
  
    function handleFormSubmit(event){
        event.preventDefault();

        const newUser = new FormData(event.target)
        const JSONData = {}

        // it does not JSONIFY properly as FormData....
        // make it a standard object
        newUser.forEach((value, key) => {
            JSONData[key] = value
        })

        console.log(JSONData)
        fetch(`/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
        },
        body: JSON.stringify(JSONData)
        })
        .then((res) => {
            if (res.ok) {
            return res.json().then((returnedData) => {
                navigate(`/profile/${returnedData.id}`)
            });
            } else {
            // Handle error
            console.error("Error:", res.status, res.statusText);
            }
        })
        .catch((error) => {
            console.log(`${error}`);
        });
    }

    return (
        <>
            <form
            id="user-form"
            onSubmit={handleFormSubmit}
            >
                <input
                type="text"
                name="first_name"
                placeholder="First Name..."
                // onChange={onFormValueInput}
                />
                <input
                type="text"
                name="last_name"
                placeholder="Last Name..."
                // onChange={onFormValueInput}
                />
                <input
                type="text"
                name="city"
                placeholder="City..."
                // onChange={onFormValueInput}
                />
                <input
                type="text"
                name="state"
                placeholder="State..."
                // onChange={onFormValueInput}
                />
                <input
                type="text"
                name="username"
                placeholder="Username..."
                // onChange={onFormValueInput}
                />
                <input
                type="text"
                name="password"
                placeholder="Password..."
                // onChange={onFormValueInput}
                />
                <button 
                type="submit"
                >Sign Up</button>
            </form>
            <p>Already have a login? Login <Link to="/login" className="instring-button">here</Link></p>
        </>
        
    )
}

export default SignUpPage