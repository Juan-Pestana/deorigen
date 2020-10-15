import React, { useState, setIndex } from 'react'
import {Link} from 'react-router-dom'

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
            src="https://res.cloudinary.com/pestana/image/upload/v1602762691/deorigen/Carousel-market_1_v9pyub.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
      <Link to="/shop">
            <h3 className="text-secondary">Visita nuestra tienda</h3>
      </Link>
            <p>Productos de calidad directos De Origen.</p>
          </Carousel.Caption>
        </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImg"
          src="https://res.cloudinary.com/dpflfpgcj/image/upload/v1602668520/deorigen/Queso%20hero.jpg.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="text-secondary">Carne de primera</h3>
          <p>Ganado alimentado solo con pastos.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImg"
          src="https://res.cloudinary.com/dpflfpgcj/image/upload/v1602604372/deorigen/wine%20content.jpg.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className="text-secondary">Tiempo de vendimia</h3>
          <p>
            Toda una nueva selección de productos de temporada en otoño.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

//render(<ControlledCarousel />);

export default ControlledCarousel