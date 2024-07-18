import React, { useEffect, useState } from "react";
// import CarCard from "../components/CarCard";
import HeroSlider from "../components/HeroSlider"

function LandingPage (){
    const [newestCars, setNewestCars] = useState([])

    // build a backend route for the top 5/10 cars with the most recent created_at columns
    useEffect(() => {
        fetch('/cars')
        .then(res => {
            if (res.ok) {
                res.json().then((returnedData) => {
                    setNewestCars(returnedData)
                })
            }
        })
        .catch((error) => {
            console.error('Error fetching newest vehicles', error)
        })
    }, [])

    const topTwoCars = newestCars.slice(0, 2)

    return (
        <>
          <HeroSlider />
          <div className="home-content">
            <div className="hero-section">
                <h1>Your Dream Car Awaits</h1>
                <p>Explore the latest models and find the perfect match for you.</p>
            </div>
          </div>
          {/* <CarCard carData={topTwoCars} />   */}
        </>
    )
}

export default LandingPage