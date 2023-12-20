import React from "react";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import CarDetailsButton from "./CarDetailsButton";
import { useOutletContext } from "react-router-dom";

function CarCard({ carData, handleRemoveClick, updateCart, setFavFetchTrigger}){
    if (!Array.isArray(carData)) {
    // Or handle the case when carData is not an array
      return null; // Return null instead of displaying a loading message
    }
  
    // iterate through prop data to populate list
    const carItems = carData?.map((car) => {
        const {make, model, year, img, id} = car
        return(
            <div key={id} id={id} className="car-card">
                <img src={img} alt={`${make} ${model}`} />
                <p>{`${year} ${make} ${model}`}</p>
                <FavoriteButton 
                carData={carData} 
                carID={id}
                setFavFetchTrigger={setFavFetchTrigger}
                />
                <AddToCartButton 
                carID={id} 
                handleRemoveClick={handleRemoveClick}
                updateCart={updateCart}
                />
                {/* <FavoriteButton 
                carData={carData} 
                carID={id}
                />
                <AddToCartButton 
                carID={id} 
                handleRemoveClick={handleRemoveClick}
                /> */}
                <CarDetailsButton />
            </div>
        )
    });

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



