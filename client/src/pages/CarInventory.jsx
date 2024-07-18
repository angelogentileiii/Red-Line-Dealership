import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

function CarInventory() {
    const [carData, setCarData] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filters, setFilters] = useState({
        body_style: "",
        year: "",
        make: "",
        model: "",
        price: "150000",
    });

    // fetch car data //
    useEffect(() => {
        fetch("/cars").then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    setCarData(data);
                    setFilteredCars(data);
                });
            }
        });
    }, []);

    // function for search bar

    function onSearchChange(event) {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        console.log(value);
    }

    useEffect(() => {
        const filteredList = carData.filter((car) => {
            if (filters.price === "150000") {
                return (
                    (car.body_style.includes(filters.body_style) ||
                        !filters.body_style) &&
                    (car.year.toString().includes(filters.year) ||
                        !filters.year) &&
                    (car.make.includes(filters.make) || !filters.make) &&
                    (car.model
                        .toLowerCase()
                        .includes(filters.model.toLowerCase()) ||
                        !filters.model)
                );
            } else {
                return (
                    (car.body_style.includes(filters.body_style) ||
                        !filters.body_style) &&
                    (car.year.toString().includes(filters.year) ||
                        !filters.year) &&
                    (car.make.includes(filters.make) || !filters.make) &&
                    (car.model
                        .toLowerCase()
                        .includes(filters.model.toLowerCase()) ||
                        !filters.model) &&
                    (car.price <= parseInt(filters.price) || !filters.price)
                );
            }
        });
        setFilteredCars(filteredList);
    }, [filters, carData]);

    /////// SEARCH BAR ///////

    // builds car year options from 1900
    const yearOptions = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        yearOptions.push(
            <option key={year} value={year}>
                {year}
            </option>
        );
    }

    // builds car make options based on fetched car data => maybe change to a permananent list?
    const makeOptions = [];
    // filters out any duplicates for car makes in the car data using Set object
    const makeSet = new Set(carData.map((car) => car.make));
    // spread the set into a list again
    const currentMakes = [...makeSet];
    // iterate through the list and make options
    currentMakes.forEach((make) => {
        makeOptions.push(
            <option key={make} value={make}>
                {make}
            </option>
        );
    });

    // repeat for body styles (maybe can combine into one?)
    const bodyStyleOptions = [];
    const bodyStyleSet = new Set(carData.map((car) => car.body_style));
    const currentBodyStyles = [...bodyStyleSet];
    currentBodyStyles.forEach((bodyStyle) => {
        bodyStyleOptions.push(
            <option key={bodyStyle} value={bodyStyle}>
                {bodyStyle}
            </option>
        );
    });

    ////////////////////////////////////////

    return (
        <div>
            <h2>Car Listings</h2>
            <div className="search-form-container">
                <div className="search-form">
                    <select
                        id="year"
                        name="year"
                        value={filters.year}
                        onChange={onSearchChange}
                    >
                        <option value="">Select Year</option>
                        {yearOptions}
                    </select>

                    <select
                        name="make"
                        value={filters.make}
                        onChange={onSearchChange}
                    >
                        <option value="">Select Make</option>
                        {makeOptions}
                    </select>

                    <input
                        type="text"
                        name="model"
                        value={filters.model}
                        placeholder="Search by Model"
                        onChange={onSearchChange}
                    />

                    <select
                        id="body_style"
                        name="body_style"
                        value={filters.bodyStyle}
                        onChange={onSearchChange}
                    >
                        <option value="">Select Body Style</option>
                        {bodyStyleOptions}
                    </select>

                    {/* range for a slider to determine prices -- add in values to display above slider */}
                    <div className="price-filter">
                        <input
                            type="range"
                            name="price"
                            min="0"
                            max="150000"
                            step="5000"
                            value={filters.price}
                            onChange={onSearchChange}
                        />
                        <span className="price-text">
                            {filters.price === "150000"
                                ? "All Available"
                                : "Max Price: $" + filters.price}
                        </span>
                    </div>
                </div>
            </div>

            <div className="car-listings">
                <CarCard carData={filteredCars} />
            </div>
        </div>
    );
}

export default CarInventory;
