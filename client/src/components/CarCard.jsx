import React from "react";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import CarDetailsButton from "./CarDetailsButton";

function CarCard({ carData }) {
  // Check if carData is not an array
  if (!Array.isArray(carData)) {
    // Or handle the case when carData is not an array
    return null; // Return null instead of displaying a loading message
  }

  return (
    <>
      {carData.map((car) => (
        <div key={car.id} id={car.id} className="car-card">
          <img src={car.img} alt={`${car.make} ${car.model}`} />
          <p>{`${car.year} ${car.make} ${car.model}`}</p>
          
          <FavoriteButton carData={carData} carID={car.id} />
          <AddToCartButton carData={carData} carID={car.id} />
          <CarDetailsButton />
        </div>
      ))}
    </>
  );
}

export default CarCard;



