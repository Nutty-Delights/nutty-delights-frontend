import { Box, Paper, Skeleton, Typography } from '@mui/material';
import Image from 'mui-image';
import React, { useEffect } from 'react'
import Slider from 'react-slick';
import banner from '../../assets/images/banner.jpg'
import banner3 from '../../assets/images/banner3.jpg'
import banner4 from '../../assets/images/banner4.jpg'
import { NavLink } from 'react-router-dom';
import Category from '../Categories/Category';
import './categoriesCarousel.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getCategories, getCategoriesLoading } from '../../redux/slices/categories';

function CategoryCarousel() {

    const loading = [1, 2, 3, 4, 5, 6];
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getCategoriesLoading);
    // const [categories, setCategories] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
        // console.log("")
    }, [dispatch])
    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        // // fade: true,
        // cssEase: 'linear',
        centerMode: true,
        centerPadding: '60px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        isLoading ? <Box width={"100vw"} sx={{ marginInline: '30px' }} >
            <Skeleton variant="rectangular" height={100} />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
            : <div className='slider' style={{ marginInline: '30px' }}>
                <Slider   {...settings}>
                    {categories?.map((category, index) => (
                        <Box key={index} sx={{ height: 'fit-content', background: 'white', margin: '0px', padding: '10px' }}>
                            {/* <Image style={{ height: '200px', borderRadius: '10px' }} duration={1000} easing='ease' src={banner3}></Image> */}
                            <Typography className='carousel-category-heading'>{category.categoryName}</Typography>
                            <Paper sx={{ height: 'fit-content', width: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center' }} elevation={4}>
                                <NavLink to={`/products?productType=${category.categoryId}`}>
                                    <div >

                                        <Image height={120} style={{ borderRadius: '5px' }} duration={100} src={category.categoryImageUrl} />
                                        {/* <Typography className='carousel-category-heading'>{category.name}</Typography> */}
                                    </div>
                                </NavLink>
                                {/* <Category category={category} style={{ height: '150px', borderRadius: '15px' }} /> */}
                            </Paper>
                        </Box>
                    ))}
                </Slider>
            </div >
    )
}

export default CategoryCarousel
