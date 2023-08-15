import React, { useEffect, useState } from 'react'
import banner1 from '../../assets/images/banner1.png'
import banner from '../../assets/images/banner.jpg'
import banner3 from '../../assets/images/banner3.jpg'
import banner4 from '../../assets/images/banner4.jpg'
import homepageimag1 from '../../assets/images/homepageimage.jpg'
import homepageimage2 from '../../assets/images/homepageimage2.jpg'
import discount from '../../assets/images/discount banner.jpg'
import image from '../../assets/images/categories.png'
import nuts from '../../assets/images/nuts.png'
import Almonds from '../../assets/images/Almonds.jpg'
import Carousel from '../../components/shared/Carousel/Carousel'
import { Typography, Box, Skeleton, Toolbar, Button, Divider, IconButton } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllProductsByCategory, getProducts, getProductsByCategory, getProductsError, getProductsLoading } from '../../redux/slices/products'
import HomeProductCard from './HomeProductCard'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from 'react-slick'
import Image from 'mui-image'
import Categories from '../Categories/Categories'
import { NavLink, useLocation } from 'react-router-dom'
import Banner from './Banner'
import { getAllCategories, getCategories, getCategoriesError, getCategoriesLoading } from '../../redux/slices/categories'
import HomeCategoryCard from './HomeCategoryCard'
import CategoryIcon from '@mui/icons-material/CategoryTwoTone';
import { ArrowRight, ChevronLeft, ChevronRight } from '@mui/icons-material'


var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                autoplay: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                autoplay: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplay: true,
            }
        }
    ]
};
var settingsCategory = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5.5,
                slidesToScroll: 1,
                infinite: true,
                // dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                dots: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
            }
        }
    ]
};


const Home = () => {
    const handleDragStart = (e) => e.preventDefault();
    const products = useSelector(getProducts);
    // const categories = useSelector(getAllCa)
    const topProduct = useSelector(getProductsByCategory);
    const isLoading = useSelector(getProductsLoading);
    const categories = useSelector(getCategories);
    const isLoadingCategories = useSelector(getCategoriesLoading);
    const isError = useSelector(getCategoriesError);
    const location = useLocation().pathname;
    // const [categories, setCategories] = useState();
    // const dispatch = useDispatch();


    // const isError = useSelector(getProductsError);
    // const loading = [1, 2, 3, 4, 5, 6];
    const dispatch = useDispatch();
    const categoryId = "64c65505f38445205f52ecd6";


    const responsive = {
        0: {
            items: 1.8,
            itemsFit: "contain",
        },
        568: {
            items: 3,
            itemsFit: "contain",
        },
        1024: {
            items: 5,
            itemsFit: "contain",
        }
    }


    useEffect(() => {
        if (products.length === 0)
            dispatch(getAllProducts())
        // dispatch(getAllProductsByCategory({ categoryId }))
        if (!categories)
            dispatch(getAllCategories());
    }, [])

    const images = [banner3, banner, banner4];

    const items = products?.slice(0, 10).map((item) => (
        <div className="">
            <HomeProductCard product={item} />
        </div>
    ));

    const categoryItems = categories?.map((item) => (
        <div className="">
            <HomeCategoryCard category={item} />
        </div>
    ));

    // items.reverse();
    // const topProductItems = topProduct?.map((item) => (
    //     <div className="top-product">
    //         <HomeProductCard product={item} />
    //     </div>
    // ));

    const [activeIndex, setActiveIndex] = useState(0);

    const slidePrev = () => setActiveIndex(activeIndex - 1);
    const slideNext = () => setActiveIndex(activeIndex + 1);
    const syncActiveIndex = ({ item }) => setActiveIndex(item);
    console.log(items)
    return (
        <div className='home'>

            <Carousel images={images} />
            <Typography className='heading'>
                Today's Best Deal For you
            </Typography>
            {
                isLoading ? <Box sx={{ margin: '50px' }}>
                    <Skeleton animation='wavie' variant='rounded' height={90} />
                    <Skeleton animation='wave' height={60} />
                    <Skeleton />

                </Box> : < Slider
                    style={{ marginInline: '20px' }}
                    arrows={false}
                    autoplay={true}
                    autoplaySpeed={3000}


                    {...settings}>
                    {items}


                </Slider>



            }

            {/* <Typography className='heading'>
                Top Selling Product
            </Typography> */}
            {/* <Typography className='heading' sx={{ marginTop: '80px', marginBottom: '20px' }}>
                In Spotlight
            </Typography> */}
            <Box sx={{ background: 'white', marginInline: '30px', marginTop: '50px' }}>
                <NavLink to={`/products?productType=${categoryId}`}>


                    <Image
                        height={'30vw'}
                        style={{
                            borderRadius: '10px'
                        }} duration={0} easing='ease' fit='fill' src={Almonds}></Image>

                </NavLink>
            </Box>
            {/* {
                isLoading ? <Box sx={{ margin: '50px' }}>
                    <Skeleton animation='wavie' variant='rounded' height={90} />
                    <Skeleton animation='wave' height={50} />
                    <Skeleton />

                </Box> : < Slider

                    arrows={false}


                    {...settings}>
                    {topProductItems}

                </Slider>



            } */}


            <Box sx={{ gap: '10px', padding: '30px', background: 'white', marginInline: '20px', marginTop: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <CategoryIcon sx={{ color: 'green', fontSize: '2rem' }} /> */}
                <Typography sx={{ fontWeight: 'bold', fontSize: '21px', }} >Shop from ton of varieties</Typography>

            </Box>
            {
                isLoadingCategories ? <Box sx={{ margin: '50px' }}>
                    <Skeleton animation='wavie' variant='rounded' height={90} />
                    <Skeleton animation='wave' height={60} />
                    <Skeleton />

                </Box> : <Box sx={{ marginInline: '50px' }}>
                    < Slider

                        // arrows={false}

                        // arrows={false}
                        nextArrow={<ChevronRight sx={{ zIndex: '5', borderRadius: '100px', background: '#e3b131a8 !important', color: 'white !important', marginRight: '-10px', fontSize: '1.5rem', }} />}
                        prevArrow={<ChevronLeft sx={{ zIndex: '5', borderRadius: '100px', background: '#e3b131a8 !important', color: 'white !important', marginLeft: '-10px', fontSize: '1.5rem', }} />}
                        autoplay={true}
                        autoplaySpeed={3000}
                        dots={false}



                        {...settingsCategory}>
                        {categoryItems}

                    </Slider>
                </Box>



            }

            {/* <Categories /> */}
            <Divider sx={{
                marginBottom: {
                    "xs": '50px',
                    "sm": '50px',
                    "md": "50px",
                },
                marginTop: {
                    "xs": '20px',
                    "sm": '20px',
                    "md": "20px",
                },
                marginInline: '30px', display: {
                    "xs": 'flex',
                    "sm": 'flex',
                    "md": "flex",


                }
            }}></Divider>
            <Image style={{ position: 'relative', marginBlock: '40px' }} height={"26vw"} src={nuts} fit='contain'></Image>


            <Banner />

            {/* <Divider sx={{
                marginTop: '0px', marginInline: '30px', display: {
                    "xs": 'none',
                    "sm": 'none',
                    "md": "flex",


                }
            }}></Divider> */}


        </div >
    )
}

export default Home
