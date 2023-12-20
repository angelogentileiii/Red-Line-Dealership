import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageDropzone from "../components/ImageDropzone";
import "../stylesheets/index.css"

function ListCar(){
    const [ images, setImages ] = useState([])
    const navigate = useNavigate()

    function handleFormSubmit(event){
        event.preventDefault();
        
        const newCarListing = new FormData(event.target)
        const JSONData = {}

        newCarListing.forEach((value, key) => {
            JSONData[key] = value
        })

        console.log(JSONData)
        // JSONData['images'] = images
        JSONData['owner_id'] = 1

        fetch('/cars', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(JSONData)
        })
        .then((res) => {
            if (res.ok) {
            return res.json().then((returnedData) => {
                console.log(returnedData)
                navigate(`/vehicle/${returnedData.id}`)
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
        <form
        onSubmit={handleFormSubmit}
        id="sell-car-form"
        >
            <input
            type="text"
            name="year"
            placeholder="Year..."
            // onChange={onFormValueInput}
            />
            <input
            type="text"
            name="make"
            placeholder="Brand..."
            // onChange={onFormValueInput}
            />
            <input
            type="text"
            name="model"
            placeholder="Model..."
            // onChange={onFormValueInput}
            />
            <select name="body_style">
                <option value="coupe">Coupe</option>
                <option value="sedan">Sedan</option>
                <option value="wagon/hatchback">Wagon/Hatchback</option>
                <option value="suv">SUV</option>
                <option value="pickup">Pickup</option>
            </select>
            <select name="body_color">
                <option value="black">Black</option>
                <option value="silver">Silver</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
            </select>
            <input
            type="number"
            name="price"
            placeholder="List Price..."
            // onChange={onFormValueInput}
            />
            <ImageDropzone 
            name="img"
            className='image-dropzone'
            images={images}
            setImages={setImages}
            />
            <input
            type="number"
            name="total_miles"
            placeholder="Current Mileage..."
            // onChange={onFormValueInput}
            />
            <span>
                {' Engine Details: '}
            </span>
            <input
            type="number"
            name="engine_horse_power"
            placeholder="Horsepower..."
            // onChange={onFormValueInput}
            />
            <input
            type="number"
            name="engine_torque"
            placeholder="Torque..."
            // onChange={onFormValueInput}
            />
            <button 
            type="submit"
            >List</button>
        </form>
    )
}

export default ListCar