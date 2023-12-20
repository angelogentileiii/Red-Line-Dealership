import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import { useOutletContext } from "react-router-dom";

function ShoppingCart () {
    const [currentCart, setCurrentCart] = useState([])
    const [fetchTrigger, setFetchTrigger] = useState(true)

    function updateCart(){

        fetch('/shoppingcarts')
            .then(res => {
                if (res.ok) {
                    res.json().then(returnedData => {
                        setCurrentCart(returnedData.map((car) => car.car_obj))
                        // console.log(carsInCart)
                    })
                }
            })
    }

    useEffect(() => {
        updateCart()
    }, [])

    // setFetchTrigger(currentCart)

    return (
        <CarCard carData={currentCart} updateCart={updateCart} />
        // <CarCard carData={currentCart} />
    )
}

export default ShoppingCart