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
    autoplaySpeed: 2000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    lazyLoad: "ondemand",
  };

  const images = [
    "https://www.worldtoyota.com/new-toyota-camry-research/",
    "https://www.cnet.com/a/img/resize/449f9e27e7949cce20b641d6a869526221a33f09/hub/2018/07/23/052f8057-176e-411b-aa71-a750825c994e/005-2019-mercedes-amg-c63-coupe.jpg?auto=webp&width=1200",
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/2018_Ford_F-150_XLT_Crew_Cab%2C_front_11.10.19.jpg",
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


