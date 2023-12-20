import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";

function UserFavorites(){
    const [currentFavorites, setCurrentFavorites] = useState([])
    const [favFetchTrigger, setFavFetchTrigger] = useState(true)

    useEffect(() => {
        fetch('/favoritecars')
            .then(res => {
                if (res.ok) {
                    res.json().then(returnedData => {
                        setCurrentFavorites(returnedData.map((car) => car.car_obj))
                        // console.log(carsInCart)
                    })
                }
            })
    }, [favFetchTrigger])

    // setFavFetchTrigger(currentFavorites)

    return (
        <CarCard carData={currentFavorites} setFavFetchTrigger={setFavFetchTrigger} />
        // <CarCard carData={currentFavorites} />
    )
}

export default UserFavorites