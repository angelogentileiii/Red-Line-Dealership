import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ImageDropzone from "../components/ImageDropzone";
import { useForm } from 'react-hook-form';
import "../stylesheets/index.css"

function ListCar(){
    const [ images, setImages ] = useState([])
    const navigate = useNavigate()

    const {currentUser} = useOutletContext()

    const { 
        register, 
        handleSubmit, 
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            year: undefined,
            make: "",
            model: "",
            body_style: "",
            body_color: "",
            price: undefined,
            total_miles: undefined,
            engine_horse_power: undefined,
            engine_torque: undefined
        }
    });

    console.log(errors);
    console.log(watch())

    const onSubmit = async (data) => {
        data.owner_id = currentUser.id
        
        try {
            const formData = new FormData()
            images.forEach((image) => {
                formData.append('images', image)
            })

            console.log('after "image" append', data)
            console.log('after "image" append', formData.images)

            const response = await fetch('/upload', {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                const responseData = await response.json();
                const imageUrls = responseData.urls
                
                // console.log(data)
                // console.log(imageUrls)

                data['images'] = imageUrls

                const carResponse = await fetch('/cars', {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                if (carResponse.ok){
                    const returnData = await carResponse.json();
                    // console.log(returnData.car)
                    // console.log(returnData.car.id)
                    
                    imageUrls.forEach((url) => {
                        fetch('/carimage', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                car_id: returnData.car.id,
                                image: url
                            })
                        })
                        navigate(`/vehicle/${returnData.car.id}`)
                    })
                } else {
                    console.error('Failed to add new car')
                }
            } else {
                console.error('Failed to upload images')
            }
        } catch (error) {
            console.error('Error:', error )
        }
    }

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        id="sell-car-form"
        >
            <input
            type="text"
            {...register("year", {required: 'Year is required', maxLength: {
                value: 4,
                message: "Year must be four digits long"
            }})}
            placeholder="Year..."
            // onChange={onFormValueInput}
            />
            <p>{errors.year?.message}</p>
            <input
            type="text"
            {...register("make", {required: 'Make is required'})}
            placeholder="Brand..."
            // onChange={onFormValueInput}
            />
            <p>{errors.make?.message}</p>
            <input
            type="text"
            {...register("model", {required: 'Model is required'})}
            placeholder="Model..."
            // onChange={onFormValueInput}
            />
            <p>{errors.model?.message}</p>
            <select {...register("body_style", {required: 'Body Style is reuired'})}>
                <option value="">Body Style</option>
                <option value="coupe">Coupe</option>
                <option value="sedan">Sedan</option>
                <option value="wagon/hatchback">Wagon/Hatchback</option>
                <option value="suv">SUV</option>
                <option value="pickup">Pickup</option>
            </select>
            <p>{errors.body_style?.message}</p>
            <select {...register("body_color", {required: 'Color is required'})}>
                <option value="">Vehicle Color</option>
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
            <p>{errors.body_color?.message}</p>
            <input
                type="number"
                {...register("price", {required: 'Price is required'})}
                placeholder="List Price..."
                // onChange={onFormValueInput}
            />
            <p>{errors.price?.message}</p>
            <input
                type="number"
                {...register("total_miles", {required: 'Total Miles are required'})}
                placeholder="Current Mileage..."
                // onChange={onFormValueInput}
            />
            <p>{errors.total_miles?.message}</p>
            <ImageDropzone 
                // {...register("images")}
                className='image-dropzone'
                images={images}
                setImages={setImages}
            />
            <span>
                {' Engine Details: '}
            </span>
            <input
                type="number"
                {...register("engine_horse_power")}
                placeholder="Horsepower..."
                // onChange={onFormValueInput}
            />
            <p>{errors.engine_horse_power?.message}</p>
            <input
                type="number"
                {...register("engine_torque")}
                placeholder="Torque..."
                // onChange={onFormValueInput}
            />
            <p>{errors.engine_torque?.message}</p>

            <button type="submit">List</button>
        </form>
    )
}

export default ListCar