import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import { useOutletContext } from "react-router-dom";

function UserFavorites(){
    const [currentFavorites, setCurrentFavorites] = useState([])

    const { currentUser } = useOutletContext()
    // console.log(currentUser)

    function updateFavorites(){
        fetch('/favoritecars')
        .then(res => {
            if (res.ok) {
                res.json().then(returnedData => {
                    // console.log(returnedData)
                    const userFavorites = returnedData.filter((car) => {
                        if (car.user_id === currentUser?.id) {
                            return car
                        }
                    })
                    setCurrentFavorites(userFavorites.map((car) => car.car_obj))
                })
            }
        })
    }

    
    useEffect(() => {
        updateFavorites()
    }, [currentUser])


    return (
        <CarCard carData={currentFavorites} updateFavorites={updateFavorites} />
    )
}

export default UserFavorites