import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Box } from '@mui/material';
import Image from 'mui-image';


const Carousel = ({ images }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        cssEase: 'linear'
    };
    return (
        <div className='slider' style={{ marginInline: '35px', marginBlock: '10px' }}>
            <Slider  {...settings}>
                {images?.map((image, index) => (
                    <Box key={index} sx={{ height: '30vw', background: 'white' }}>
                        <Image style={{ borderRadius: '10px' }} duration={1000} easing='ease' fit='cover' src={image}></Image>
                    </Box>

                ))}
            </Slider>
        </div>
    )
}

export default Carousel
