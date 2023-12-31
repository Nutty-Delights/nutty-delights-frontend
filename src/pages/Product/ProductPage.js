import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllProductsByCategory, getProduct, getProducts, getProductsByCategory, getProductsById, getProductsByIdError, getProductsByIdLoading, getProductsError, getProductsLoading } from '../../redux/slices/products'
import Image from 'mui-image';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './productPage.css'
import { Box, Button, Divider, Skeleton, Typography, Toolbar, CircularProgress, LinearProgress, Card, Chip, IconButton, MenuItem } from '@mui/material';
import ShoppingBag from '@mui/icons-material/ShoppingBagOutlined';
import NavBar from '../../components/shared/NavBar/NavBar';
import BuyNow from '@mui/icons-material/Bolt';
import Ratings from '@mui/icons-material/StarRounded';
import Slider from 'react-slick';
import HomeProductCard from '../Home/HomeProductCard';
import { Add, BrandingWatermark, ChevronLeft, ChevronRight, EnergySavingsLeaf, EnergySavingsLeafOutlined, EventAvailable, FoodBank, FoodBankOutlined, HealthAndSafety, LineWeight, PropaneOutlined, Remove, TypeSpecimen } from '@mui/icons-material';
import Footer from '../../components/shared/Footer/Footer';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import cart, { addItemToCart, addItems, getCart, getCartLoading } from '../../redux/slices/cart';
import { LoadingButton } from '@mui/lab';
import { ToastContainer } from 'react-toastify';
import ErrorPage from '../ErrorPage';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import { bindMenu } from 'material-ui-popup-state';
import { bindHover, usePopupState } from 'material-ui-popup-state/hooks';
import { loginDialogHandler } from '../../handlers/handlers';
// import { ProgressBar } from 'react-toastify/dist/components';


var settings = {
    dots: false,
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
                dots: false,

                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                autoplay: true,
            }
        },
        {
            breakpoint: 700,
            settings: {
                dots: false,

                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                autoplay: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                dots: false,

                slidesToShow: 2,
                slidesToScroll: 2,
                autoplay: true,
            }
        }
    ]
};
var settingsBrowse = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                dots: false,

                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                autoplay: true,
            }
        },
        {
            breakpoint: 700,
            settings: {
                dots: false,

                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                autoplay: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                dots: false,

                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
            }
        }
    ]
};

function ProductPage() {


    const [itemCount, setItemCount] = useState(1);
    const product = useSelector(getProductsById);
    // const [searchParams, setSearchParams] = useSearchParams();
    // const product = useSelector(getProductsById);
    const isLoading = useSelector(getProductsLoading);
    const isError = useSelector(getProductsError);
    const productLoading = useSelector(getProductsByIdLoading);
    const productError = useSelector(getProductsByIdError);
    const location = useLocation().pathname.split('/pid=')[1];
    console.log("pid", location)
    const [productId, setProductId] = useState(location);
    const products = useSelector(getProducts);
    const productsByCategory = useSelector(getProductsByCategory);
    const isLoadingCategories = useSelector(getProductsLoading);
    const isErrorCategories = useSelector(getProductsError);
    const isLoadingProducts = useSelector(getProductsLoading);
    const addItemToCartLoading = useSelector(getCartLoading);

    const [selectedVariant, setSelectedVariant] = useState(0);

    // const categoryId = searchParams.get('productType');

    const [productVariants, setProductVariants] = useState([
        {
            sellingPrice: 0,
            discount: 0,
        }
    ]);

    const navigate = useNavigate();

    const url = useParams();
    const id = url.productId.split('pid=')[1];
    console.log("url", id);

    // const [searchParams , useSearchParams] = searchParams
    const dispatch = useDispatch();
    useEffect(() => {

        setProductId(id);
        console.log("location,productId", location, productId);

        dispatch(getProduct({ productId }));
        setSelectedVariant(0);
        setProductVariants(product?.productVariants);
        console.log(productVariants);
        setItemCount(1);

        // setCategoryId(product.productCategoryId);
        // dispatch(getAllProductsByCategory({ categoryId }))
        // this url is fetching on everyRefresh

    }, [url, location, productId])

    useEffect(() => {
        if (products.length === 0)
            dispatch(getAllProducts())
        // dispatch(getAllProductsByCategory({ categoryId }))

        // dispatch(getAllProductsByCategory({ categoryId }))//

    }, [])


    const handleAddToCart = () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            let variant = product?.productVariants?.[selectedVariant];
            const productId = product?.productId;
            const data = {
                productId: productId,
                variant: variant,
                quantity: itemCount
            }
            dispatch(addItems({
                data: data
            }))
        }
        else {
            let variant = product?.productVariants?.[selectedVariant];
            const productId = product?.productId;

            const data = {
                productId: productId,
                variant: variant,
                quantity: itemCount
            }

            dispatch(addItemToCart({ token, data }));
        }


    }
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    })




    const filterCategories = products?.filter((item) => item.productId !== product?.productId && item.productCategoryId === product?.productCategoryId)
    const categoryItems = filterCategories?.map((item) => (
        <div className="">
            <HomeProductCard product={item} />
        </div>
    ));
    const items = products?.filter((item) => item.productId !== product?.productId).slice(0, 5)?.map((item) => (
        <div className="">
            <HomeProductCard product={item} />
        </div>
    ));



    return (

        isLoading || productLoading ? <LinearProgress /> : isError || productError ? <ErrorPage /> :

            < div >
                <NavBar />
                <Toolbar />
                {/* <Toolbar /> */}
                <Divider sx={{
                    display: {
                        'xs': 'flex',
                        'sm': 'flex',
                        'md': 'flex '
                    }, borderWidth: '-1px', marginBlock: '20px', marginInline: '20px'
                }}></Divider>
                <Box sx={{
                    margin: '10px',
                    display: {
                        'xs': 'block',
                        'sm': 'block',
                        'md': 'flex',
                        'lg': 'flex',
                        'xl': 'flex'
                    }
                }} className='product-page'>
                    <Box className='product-images' sx={{
                        padding: '20px',
                        height: {
                            xs: '70vw',
                            sm: '50vw',
                            md: '37vw'
                        }
                    }}>

                        <Image fit='scale-down' style={{

                        }} easing='ease-in' duration={10} src={product?.productImageUrl}></Image>
                    </Box>
                    <Box sx={{
                        marginInline: '5px', maxWidth: {
                            md: '50vw !important'
                        }
                    }} className='product-details'>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', padding: '10px' }}>{product?.productName}</Typography>
                        <Typography sx={{ color: 'grey', fontSize: '1.2 rem', paddingInline: '10px' }}>{product?.productDescription}</Typography>
                        {/* <Typography sx={{ color: product?.productVariants?.[selectedVariant]?.quantity > 0 ? 'green' : 'red', padding: "12px", paddingBlock: '12px', fontSize: '18px', fontWeight: "bold" }}>{product?.productVariants?.[selectedVariant]?.quantity > 0 ? "In stock" : "Currently not available"}</Typography> */}

                        {/* <Divider></Divider> */}
                        <Box
                            sx={{
                                display: 'block',
                                alignItems: 'center',
                                // justifyContent: 'space-between',
                                gap: '20px',
                                padding: '10px'
                            }}>

                            <Box
                                sx={{
                                    display: 'flex',
                                    paddingBlock: '8px',
                                    alignItems: 'center'
                                }}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '20px'
                                    }}>
                                    {`₹ ${product?.productVariants?.[selectedVariant]?.sellingPrice}`}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'grey',
                                        textDecoration: 'line-through',
                                        marginLeft: '8px',
                                        marginRight: '8px',
                                        fontSize: '19px'
                                    }}>
                                    {`₹ ${product?.productVariants?.[selectedVariant]?.sellingPrice + product?.productVariants?.[selectedVariant]?.discount}`}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "orange",
                                        marginLeft: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    {`${Math.round(product?.productVariants?.[selectedVariant]?.discount * 100 / (product?.productVariants?.[selectedVariant]?.sellingPrice + product?.productVariants?.[selectedVariant]?.discount))}% OFF`}
                                    {/* {`${productVariants?.[selectedVariant]?.discount}% OFF`} */}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'grey',
                                        textDecoration: 'none',
                                        marginLeft: '8px',
                                        marginRight: '8px',
                                        fontSize: '16px'
                                    }}>
                                    {`Incl. all taxes`}
                                </Typography>
                                {/* <Typography sx={{ color: 'black', paddingInline: "5px", paddingBlock: '0px', fontSize: '16  px', fontWeight: "" }}>{"|"}</Typography>
                                <Typography sx={{ color: product?.productVariants?.[selectedVariant]?.quantity > 0 ? 'green' : 'red', paddingInline: "2px", paddingBlock: '0px', fontSize: '16px', fontWeight: "bold" }}>{product?.productVariants?.[selectedVariant]?.quantity > 0 ? "In stock" : "Currently not available"}</Typography> */}

                            </Box>
                            {/* <Box sx={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
                                <Ratings sx={{ color: 'green', fontSize: '16px' }} />
                                <Typography sx={{ color: "green", marginLeft: '1px', fontSize: '11px' }}>{`${product.productNumberOfReviews} ratings`}</Typography>
                            </Box> */}

                        </Box>

                        {/* <Divider></Divider> */}
                        <Box sx={{ display: 'flex', justifyContent: 'start', gap: '20px', padding: '10px' }}>
                            {
                                product?.productVariants?.map((item, i) => (
                                    <Card onClick={() => { setSelectedVariant(i) }} variant='outlined' sx={{ cursor: 'pointer', padding: '20px', background: selectedVariant === i ? '#ffa5000f' : '', borderColor: selectedVariant === i ? 'orange' : '', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                        <Typography sx={{ color: selectedVariant === i ? 'orange' : '', fontWeight: selectedVariant === i ? 'bold' : "" }}>{item.weight}</Typography>
                                    </Card>
                                ))
                            }
                            {/* <Card variant='outlined' sx={{ borderRadius: '', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                <Typography>100g</Typography>
                            </Card>
                            <Card variant='outlined' sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                <Typography>250g</Typography>
                            </Card>
                           
                            <Card variant='outlined' sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                <Typography>1kg</Typography>
                            </Card> */}

                        </Box>
                        {/* <Typography sx={{ color: product?.productVariants?.[selectedVariant]?.quantity > 0 ? 'green' : 'red', paddingInline: "12px", paddingBlock: '5px', fontSize: '18px', fontWeight: "bold" }}>{product?.productVariants?.[selectedVariant]?.quantity > 0 ? "In stock" : "Currently not available"}</Typography> */}

                        <Box sx={{ display: '' }}>
                            <Card variant='' sx={{ margin: '10px' }}>

                                {/* <SpaOutlinedIcon /> */}
                                <Typography sx={{ paddingInline: "0px", paddingBlock: '5px', fontSize: '18px', fontWeight: "bold" }}>Benefits</Typography>
                                {/* <Divider></Divider> */}
                                {/* <Box sx={{ padding: '10px', display: 'flex' }}> */}

                                <Box sx={{ paddingBlock: "10px", display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    <Chip sx={{ borderRadius: '10px' }} icon={<BuyNow />} variant='outlined' clickable label='Energy Booster'></Chip>
                                    {/* </Box> */}
                                    {/* <Box sx={{ paddingBlock: '5px', paddingInline: '10px', display: 'flex' }}> */}

                                    <Chip sx={{ borderRadius: '10px' }} icon={<HealthAndSafety />} variant='outlined' clickable label='Anti Oxidant'></Chip>
                                    <Chip sx={{ borderRadius: '10px' }} icon={<LineWeight />} variant='outlined' clickable label='High Protien'></Chip>
                                    <Chip sx={{ borderRadius: '10px' }} icon={<LineWeight />} variant='outlined' clickable label='Fibre'></Chip>
                                    {/* </Box> */}
                                </Box>


                                {/* <Box sx={{ padding: '10px', display: 'flex' }}>
                                    <BuyNow />
                                    <Typography>Benefit 2</Typography>
                                </Box> */}
                            </Card>
                            <Card variant='' elevation={5} sx={{ margin: '10px' }}>
                                {/* <SpaOutlinedIcon /> */}
                                <Typography sx={{ display: 'flex', alignItems: 'baseline', paddingInline: "0px", paddingBlock: '5px', fontSize: '18px', fontWeight: "bold" }}>Nutrition Value <Typography sx={{ fontSize: '10px', marginLeft: '7px' }}>Per 100 gm </Typography></Typography>
                                {/* <Divider></Divider> */}
                                {/* <Box sx={{ padding: '10px', display: 'flex' }}> */}

                                <Box sx={{ paddingBlock: "10px", display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    <Chip sx={{ borderRadius: '10px' }} variant='outlined' clickable label='Energy : 500kcal'></Chip>
                                    {/* </Box> */}
                                    {/* <Box sx={{ paddingBlock: '5px', paddingInline: '10px', display: 'flex' }}> */}

                                    <Chip sx={{ borderRadius: '10px' }} variant='outlined' clickable label='Protien : 20g'></Chip>
                                    <Chip sx={{ borderRadius: '10px' }} variant='outlined' clickable label='Fat : 10g'></Chip>
                                    <Chip sx={{ borderRadius: '10px' }} variant='outlined' clickable label='Fibre : 10g'></Chip>
                                    <Chip sx={{ borderRadius: '10px' }} variant='outlined' clickable label='Salt : 1g'></Chip>
                                    {/* </Box> */}
                                </Box>


                                {/* <Box sx={{ padding: '10px', display: 'flex' }}>
                                    <BuyNow />
                                    <Typography>Benefit 2</Typography>
                                </Box> */}
                            </Card>
                        </Box>

                        {
                            product?.productVariants?.[selectedVariant]?.quantity > 0 ?
                                <div className='buy-actions' style={{
                                    display: 'flex',
                                    justifyContent: "start",
                                    gap: '20px',
                                    marginInline: '10px',
                                    alignItems: "center"
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ marginBlock: '12px', marginInline: "0px", height: '35px !important', border: '0.8px solid rgb(189, 189, 189)', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                                            <IconButton onClick={() => { if (itemCount > 1) setItemCount(prev => prev - 1) }} sx={{ paddingInline: '15px' }}>
                                                <Remove sx={{ color: '#808080b3' }} />
                                            </IconButton>
                                            <Box sx={{ minWidth: '23px', borderRadius: '20px', border: '0px solid #8080806e', paddingInline: '20px', paddingBlock: '15px' }}>
                                                <Typography sx={{ fontWeight: 'bold', color: 'orange', fontSize: '17px' }} >{` ${itemCount < 10 ? 0 : ''}${itemCount}`}</Typography>
                                            </Box>
                                            <IconButton onClick={() => { setItemCount(prev => prev + 1) }} sx={{ paddingInline: '12px' }}>
                                                <Add sx={{ color: '#808080b3' }} />
                                            </IconButton>
                                        </Box>



                                    </Box>

                                    <Typography sx={{ textDecoration: 'underline', color: product?.productVariants?.[selectedVariant]?.quantity > 0 ? 'green' : 'red', padding: "12px", paddingBlock: '12px', fontSize: '18px', fontWeight: "bold" }}>{product?.productVariants?.[selectedVariant]?.quantity > 0 ? "In stock" : "Currently not available"}</Typography>


                                </div>
                                : <></>
                        }
                        {
                            product?.productVariants?.[selectedVariant]?.quantity > 0 ? <></> :
                                <Typography sx={{ color: 'red', paddingInline: "12px", paddingBlock: '5px', fontSize: '18px', fontWeight: "bold" }}>{"Currently not available"}</Typography>
                        }

                        {
                            product?.productVariants?.[selectedVariant]?.quantity > 0 ?
                                <div className='buy-actions' style={{
                                    display: 'flex',
                                    justifyContent: "start",
                                    gap: '10px',
                                    marginInline: '10px'
                                }}>
                                    {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ maxWidth: 'fit-content', marginBlock: '15px', marginInline: "0px", height: '35px !important', border: '0.5px solid #8080806e', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                                            <IconButton>
                                                <Remove sx={{ color: '#808080b3' }} />
                                            </IconButton>
                                            <Box sx={{ minWidth: '20px', borderRadius: '10px', border: '0px solid #8080806e', padding: '0px' }}>
                                                <Typography sx={{ fontWeight: 'bold', color: 'orange', fontSize: '17px' }} >{`01`}</Typography>
                                            </Box>
                                            <IconButton>
                                                <Add sx={{ color: '#808080b3' }} />
                                            </IconButton>
                                        </Box>

                                    </Box> */}
                                    <LoadingButton
                                        // loadingIndicator={<LinearProgress />}
                                        loading={addItemToCartLoading}
                                        onClick={handleAddToCart}
                                        sx={{
                                            // margin: '10px',

                                            background: 'green',
                                            width: "100%",
                                            marginBlock: '12px',
                                            color: 'white',
                                            fontSize: '17px',
                                            fontWeight: 'bold',
                                            borderRadius: '15px',
                                            borderColor: 'Orange',
                                            ':hover': {
                                                backgroundColor: 'green', color: 'white', borderColor: 'white'
                                            }
                                        }} variant='contained' endIcon={<ShoppingBag sx={{ fontSize: "24px !important" }} />}>
                                        {addItemToCartLoading ? 'Adding...' : "Add to cart"}
                                    </LoadingButton>
                                    <LoadingButton
                                        // {...bindHover(popupState)}
                                        // loading={addItemToCartLoading}
                                        onClick={() => {
                                            // handleAddToCart();
                                            if (localStorage.getItem('jwt')) {
                                                navigate('/cart');
                                            }
                                            else {
                                                // popupState.open();
                                                loginDialogHandler(true, dispatch)


                                            }

                                        }}
                                        sx={{
                                            // margin: '10px',
                                            background: 'orange',
                                            width: "100%",
                                            marginBlock: '12px',
                                            color: 'white',
                                            fontSize: '17px',
                                            fontWeight: 'bold',
                                            borderRadius: '15px',
                                            borderColor: 'Orange',
                                            ':hover': {
                                                backgroundColor: 'orange', color: 'white', borderColor: 'white'
                                            }
                                        }} variant='contained' endIcon={<BuyNow sx={{ fontSize: "24px !important" }} />}>
                                        Go to cart
                                    </LoadingButton>
                                    {/* <HoverMenu

                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'inherit',
                                                md: 'inherit'
                                            }
                                        }}
                                        {...bindMenu(popupState)}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                // handleOpenDialog();
                                                popupState.close();
                                            }}
                                            disableRipple
                                            disableGutters

                                            sx={{
                                                ":hover": {
                                                    background: 'white',
                                                },
                                                // padding: '8px !important',
                                                padding: '0px',
                                                fontSize: '11px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'start',
                                                alignItems: 'start'
                                            }} >
                                            <Typography sx={{ fontSize: '13px', fontWeight: 'bold', color: 'orange', marginInline: '8px' }}>Sign in to Continue</Typography>
                                        </MenuItem>
                                    </HoverMenu> */}
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={1000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover={false}
                                        theme="light"
                                    />

                                </div>
                                : <></>
                        }
                    </Box>
                    <Divider sx={{
                        display: {
                            'xs': 'flex',
                            'sm': 'flex',
                            'md': 'none'
                        }, borderWidth: '0.1px', margin: '15px'
                    }}></Divider>
                    {
                        categoryItems?.length <= 0 ? <></> : <Box sx={{
                            marginBlock: '25px',
                            marginInline: '5px', maxWidth: {
                                md: '20vw !important'
                            }
                        }} className='product-details'>
                            {/* <Typography sx={{ fontWeight: '', fontSize: '1.5rem', paddingInline: '30px', paddingBlock: '10px' }}>{"Browse More"}</Typography> */}
                            <Typography sx={{ fontWeight: 'bold', marginInline: '60px', }}>
                                Browse more in category
                            </Typography>
                            {/* <Typography sx={{ color: 'grey', fontSize: '1.2 rem', paddingInline: '10px' }}>{product?.productDescription}</Typography> */}
                            {/* <Divider></Divider> */}

                            < Slider
                                // vertical
                                style={{ marginInline: '30px' }}
                                arrows={true}
                                autoplay={true}
                                autoplaySpeed={10000}
                                dots={false}
                                infinite={false}
                                nextArrow={<ChevronRight sx={{ zIndex: '5', borderRadius: '100px', background: '#e3b131a8 !important', color: 'white !important', marginRight: '2px', fontSize: '1.5rem', }} />}
                                prevArrow={<ChevronLeft sx={{ zIndex: '5', borderRadius: '100px', background: '#e3b131a8 !important', color: 'white !important', marginLeft: '2px', fontSize: '1.5rem', }} />}


                                {...settingsBrowse}>
                                {categoryItems}



                            </Slider>


                        </Box>
                    }

                </Box >
                <Box>
                    <Divider sx={{ marginInline: '20px' }} />
                    <Typography className='heading'>
                        Customers also viewed
                    </Typography>
                    {
                        isLoading ? <Box sx={{ margin: '60px' }}>
                            <Skeleton animation='wavie' variant='rounded' height={90} />
                            <Skeleton animation='wave' height={60} />
                            <Skeleton />

                        </Box> : < Slider
                            style={{ marginInline: '40px' }}
                            arrows={true}
                            autoplay={true}
                            autoplaySpeed={3000}
                            dots={false}
                            nextArrow={<ChevronRight sx={{ zIndex: '5', borderRadius: '100px', background: '#e3b131a8 !important', color: 'white !important', marginRight: '2px', fontSize: '1.5rem', }} />}
                            prevArrow={<ChevronLeft sx={{ zIndex: '5', borderRadius: '100px', background: '#e3b131a8 !important', color: 'white !important', marginLeft: '2px', fontSize: '1.5rem', }} />}


                            {...settings}>
                            {items}



                        </Slider>



                    }
                </Box>
                <Footer />
            </div >
    )
}

export default ProductPage
