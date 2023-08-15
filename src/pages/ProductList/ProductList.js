import React, { useEffect, useState } from 'react'
import CategoryCarousel from './CategoryCarousel'
import ProductFilter from './ProductFilter'
import { Box, Button, Divider, Paper, Skeleton, Toolbar, Typography } from '@mui/material'
import { NavLink, useSearchParams } from 'react-router-dom'
import './productlist.css'
import Image from 'mui-image'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllProductsByCategory, getProductsError, getProductsLoading, getProducts, getProductsByCategory } from '../../redux/slices/products'
import Ratings from '@mui/icons-material/StarRounded';
import ShoppingBag from '@mui/icons-material/ShoppingBagOutlined';
import NavBar from '../../components/shared/NavBar/NavBar'
import Footer from '../../components/shared/Footer/Footer'



function ProductList() {

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('productType');
    console.log("categoryId", categoryId, searchParams);
    const dispatch = useDispatch();
    const products = useSelector(getProductsByCategory);
    const isLoading = useSelector(getProductsLoading);
    const isError = useSelector(getProductsError);
    const loading = [1, 2, 3, 4, 5, 6];


    useEffect(() => {
        // if (!products)
        dispatch(getAllProductsByCategory({ categoryId }))
    }, [categoryId])


    return (

        <div >
            <NavBar />
            {/* <CategoryCarousel /> */}
            <Toolbar></Toolbar>

            <Box className='product-list-box'>
                <ProductFilter />
            </Box>

            <div className='middle-box'>
                <Typography className='product-list-box-heading'>{`Best for you !`}</Typography>
            </div>

            <div style={{ padding: '50px', }} className='product-list'>
                {
                    isLoading ? loading.map((e, i) => (
                        <Box key={i} width={"350px"} >
                            <Skeleton variant="rectangular" height={250} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    )) : isError ? "Something Went Wrong! \n Please try again" :
                        products?.map((product, index) => (
                            <Paper sx={{ borderRadius: '15px !important', }} key={product.productId} elevation={3}>
                                <NavLink to={`/pid=${product.productId}`}>
                                    <Image
                                        style={{ padding: '10px' }}
                                        duration={0}
                                        // showLoading
                                        height={200}
                                        fit='contain'
                                        src={product.productImageUrl}>

                                    </Image>
                                </NavLink>
                                <Box
                                    sx={{
                                        padding: '10px'
                                    }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'grey',
                                            padding: '5px'
                                        }}
                                    >{product.productName}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                padding: '5px',
                                                alignItems: 'center'
                                            }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '18px'
                                                }}>
                                                {`₹ ${product?.productVariants?.[0]?.sellingPrice}`}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'grey',
                                                    textDecoration: 'line-through',
                                                    marginLeft: '5px',
                                                    fontSize: '17px'
                                                }}>
                                                {`₹ ${product?.productVariants?.[0]?.sellingPrice + product?.productVariants?.[0]?.discount}`}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "orange",
                                                    marginLeft: '5px',
                                                    fontWeight: 'bold'
                                                }}>
                                                {`${Math.round(product?.productVariants?.[0]?.discount * 100 / (product?.productVariants?.[0]?.sellingPrice + product?.productVariants?.[0]?.discount))}% OFF`}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
                                            <Ratings sx={{ color: 'green', fontSize: '16px' }} />
                                            <Typography sx={{ color: "green", marginLeft: '1px', fontSize: '14px' }}>{`${product.productNumberOfReviews} reviews`}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                                        {
                                            product.productStockCount <= 0 ?
                                                <Button
                                                    // disabled={!product.productStockCount}
                                                    sx={{
                                                        pointerEvents: 'none',
                                                        width: "100%",
                                                        margin: '15px',
                                                        color: 'red',
                                                        fontWeight: 'bold',
                                                        borderRadius: '20px',
                                                        borderColor: 'white',
                                                        ':hover': {
                                                            backgroundColor: 'white', color: 'red', borderColor: 'white'
                                                        }
                                                    }} variant='outlined' >
                                                    Out Of Stock
                                                </Button> : <Button sx={{
                                                    width: "100%",
                                                    margin: '15px',
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                    borderRadius: '20px',
                                                    borderColor: 'green',
                                                    ':hover': {
                                                        backgroundColor: 'green', color: 'white', borderColor: 'white'
                                                    }
                                                }} variant='outlined' endIcon={<ShoppingBag />}>
                                                    Add To Bag
                                                </Button>
                                        }
                                    </Box>

                                </Box>
                            </Paper>
                        ))
                }
            </div>
            <Divider sx={{ margin: '20px' }} />
            <div style={{ margin: '40px' }}></div>

            {/* <CategoryCarousel /> */}
            <Footer />
        </div>
    )
}

export default ProductList
