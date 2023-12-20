import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarCard from "../components/CarCard";

function CarDetails() {
  const [vehicle, setVehicle] = useState(null);
  const { vehicleID } = useParams();
  const URL = "http://localhost:3000";

  useEffect(() => {
    fetch(URL + `/vehicles/${vehicleID}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((returnedData) => {
            setVehicle(returnedData);
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching vehicle:', error);
      });
  }, [vehicleID]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + vehicle.images.length) % vehicle.images.length);
  };

  if (!vehicle) {
    return null;
  }

  console.log(vehicle.images)
  console.log(vehicle.images[currentImageIndex])

  return (
    <div className="car-details-container">
      <div key={vehicle.id}>
        {/* Display the vehicle image slider */}
        <div className="image-slider">
          <img src={vehicle.images[currentImageIndex]} alt={`${vehicle.make} ${vehicle.model}`} />
          <button onClick={prevImage}>&lt;</button>
          <button onClick={nextImage}>&gt;</button>
        </div>

        {/* Render CarCard component with vehicle data */}
        <CarCard carData={vehicle} />

        {/* Additional details section */}
        <div className="additional-details">
          <h2>Additional Details</h2>
          <p>
            <strong>Model Year:</strong> {vehicle.modelYear}
          </p>
          <p>
            <strong>Color:</strong> {vehicle.color}
          </p>
          <p>
            <strong>Condition:</strong> {vehicle.condition}
          </p>
          <p>
            <strong>Description:</strong> {vehicle.description}
          </p>
          <p>
            <strong>Price:</strong> ${vehicle.price}
          </p>
          <p>
            <strong>Mileage:</strong> {vehicle.mileage} miles
          </p>
          {/* Additional details */}
          <p>
            <strong>Body Style:</strong> {vehicle.body_style}
          </p>
          <p>
            <strong>Cylinders:</strong> {vehicle.cylinders}
          </p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
}

export default CarDetails;




