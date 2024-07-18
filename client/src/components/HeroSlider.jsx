
import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 3000,
    autoplaySpeed: 1500,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    lazyLoad: "ondemand",
  };

  const images = [
    "https://hips.hearstapps.com/hmg-prod/images/2024-ford-mustang-gt-111-64e6608fce997.jpg?crop=0.639xw:0.538xh;0.00801xw,0.375xh&resize=2048:*",
    "https://www.cnet.com/a/img/resize/449f9e27e7949cce20b641d6a869526221a33f09/hub/2018/07/23/052f8057-176e-411b-aa71-a750825c994e/005-2019-mercedes-amg-c63-coupe.jpg?auto=webp&width=1200",
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/2018_Ford_F-150_XLT_Crew_Cab%2C_front_11.10.19.jpg",
    "https://www.topgear.com/sites/default/files/2023/09/NOVITEC%20N%20LARGO%20S%20Pic04.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/VW_K%C3%A4fer_Baujahr_1966.jpg"
  ];

  return (
    <Slider {...settings} className="hero__slider">
      {images.map((image, index) => (
        <div key={index} className={`slider__item mt0 slider__item-${index + 1}`}>
          <Container>
            <div className="slider__content">
              <h4 className="text-light mb-3">Cars for sale</h4>
              <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>
              <button className="btn reserve__btn mt-4">
                <Link to="/cars">Reserve Now</Link>
              </button>
            </div>
          </Container>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;

