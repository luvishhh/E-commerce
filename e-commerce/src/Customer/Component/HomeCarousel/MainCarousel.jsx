import React from 'react';
import { homeCarouselData } from './MainCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const MainCarousel = () => {
    const items = homeCarouselData.map((item) => (
        <img
            src={item.image}
            alt='Error 404'
            className='carousel-image'
            role='presentation'
            key={item.path}
            style={{ height: "650px", width: "100%", objectFit: "cover" ,filter:'brightness(0.7)'}}
        />
    ));

    return (
        <div className='carousel-container' style={{ position: 'relative' }}>
            <AliceCarousel
                items={items}
                disableButtonsControls
                autoPlay
                autoPlayInterval={2000}
                infinite
            />
            <div
                className='carousel-text-overlay'
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    textAlign: 'center',
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    borderRadius: '10px',
                    width:'100%',
                    fontWeight:'bold',


                }}
            >
                <h1 style={{ fontSize: '5rem', margin: '0' }}>Welcome to Your Uniform Destination!</h1>
                <p style={{ fontSize: '2rem' }}>Where Style Meets Professionalism</p>
            </div>
        </div>
    );
};

export default MainCarousel;
