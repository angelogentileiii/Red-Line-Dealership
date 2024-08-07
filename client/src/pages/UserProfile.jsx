import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import CarCard from "../components/CarCard";

function UserProfile(){
    const [profile, setProfile] = useState({});
    const { profileID } = useParams();

    const {currentUser} = useOutletContext()
    console.log(currentUser)

  // Fetch profile data for user //
    useEffect(() => {
        if (currentUser) {
            fetch(`/users/${currentUser.id}`)
            .then((response) => response.json())
            .then((returnedData) => {
                setProfile(returnedData);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
        }
    }, [profileID, currentUser]);

    const {profile_img, first_name, last_name, username, cars} = profile

    return (
        <div>
            <img src={profile_img} alt={`${first_name} ${last_name}`} />
            <p>{username}</p>
            <p>{first_name}</p>
            <p>{last_name}</p>
            <CarCard carData={cars} />
        </div>
    )
}

export default UserProfile