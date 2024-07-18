import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarCard from "../components/CarCard";

function CarDetails() {
    const [vehicle, setVehicle] = useState([]);
    const [details, setDetails] = useState({});
    const { vehicleID } = useParams();
  
    useEffect(() => {
      fetch(`/cars/${vehicleID}`)
        .then((res) => {
          if (res.ok) {
            res.json().then((returnedData) => {
              console.log(returnedData);
              setDetails(returnedData);
              setVehicle([returnedData]);
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching vehicle:', error);
        });
    }, [vehicleID]);
  
    if (!vehicle) {
      return null;
    }
  
    return (
      <div className="car-details-container">
        <div key={vehicle.id}>
          {/* Display the vehicle image slider */}
          {/* <div className="image-slider">
            <img src={vehicle.images[currentImageIndex]} alt={`${vehicle.make} ${vehicle.model}`} />
            <button onClick={prevImage}>&lt;</button>
            <button onClick={nextImage}>&gt;</button>
          </div> */}
  
          {/* Render CarCard component with vehicle data */}
          <CarCard carData={vehicle} />
  
          {/* Additional details section */}
          <div className="additional-details">
            <h2>Additional Details</h2>
            <div className="detail-item">
              <strong>Model Year:</strong> {details.year}
            </div>
            <div className="detail-item">
              <strong>Make:</strong> {details.make}
            </div>
            <div className="detail-item">
              <strong>Model:</strong> {details.model}
            </div>
            <div className="detail-item">
              <strong>Color:</strong> {details.body_color}
            </div>
            <div className="detail-item">
              <strong>Body Style:</strong> {details.body_style}
            </div>
            <div className="detail-item">
              <strong>Engine HP / Torque:</strong> {details.engine_horse_power} / {details.engine_torque}
            </div>
            <div className="detail-item">
              <strong>Mileage:</strong> {details.total_miles} miles
            </div>
            <div className="detail-item">
              <strong>Price:</strong> ${details.price}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CarDetails;
  