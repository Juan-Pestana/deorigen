import React, { useState, setIndex } from 'react'

import Carousel from 'react-bootstrap/Carousel'

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel mb-5 mt-3">
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImg"
          src="https://res.cloudinary.com/dpflfpgcj/image/upload/v1602609705/deorigen/Vegie%20Hero.jpg.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImg"
          src="https://res.cloudinary.com/dpflfpgcj/image/upload/v1602668520/deorigen/Queso%20hero.jpg.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImg"
          src="https://res.cloudinary.com/dpflfpgcj/image/upload/v1602604372/deorigen/wine%20content.jpg.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

//render(<ControlledCarousel />);

export default ControlledCarousel