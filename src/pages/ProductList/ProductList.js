import React, { useEffect, useState } from 'react'
import CategoryCarousel from './CategoryCarousel'
import ProductFilter from './ProductFilter'
import { Box, Button, Paper, Skeleton, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import './productlist.css'
import Image from 'mui-image'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllProductsByCategory, getProductsError, getProductsLoading, getProducts, getProductsByCategory } from '../../redux/slices/products'
import Ratings from '@mui/icons-material/StarRounded';
import ShoppingBag from '@mui/icons-material/ShoppingBagOutlined';



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
        dispatch(getAllProductsByCategory({ categoryId }))
    }, [categoryId])


    return (

        <div >
            {/* <CategoryCarousel /> */}

            <Box className='product-list-box'>
                <ProductFilter />
            </Box>

            <div className='middle-box'>
                <Typography className='product-list-box-heading'>{`Best for you !`}</Typography>
            </div>

            <div className='product-list'>
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
                                <Image style={{ padding: '10px' }} duration={100} showLoading height={300} src={product.productImageUrl}></Image>
                                <Box sx={{ padding: '10px' }}>
                                    <Typography sx={{ fontWeight: 'bold', color: 'grey', padding: '5px' }}>{product.productName}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{`₹ ${product.productPrice}`}</Typography>
                                            <Typography sx={{ color: 'grey', textDecoration: 'line-through', marginLeft: '5px', fontSize: '17px' }}>{`₹ ${product.productPrice + product.productDiscount}`}</Typography>
                                            <Typography sx={{ color: "orange", marginLeft: '5px', fontWeight: 'bold' }}>{`${Math.round(product.productDiscount * 100 / (product.productPrice + product.productDiscount))}% OFF`}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
                                            <Ratings sx={{ color: 'green', fontSize: '16px' }} />
                                            <Typography sx={{ color: "green", marginLeft: '1px', fontSize: '14px' }}>{`${product.productNumberOfReviews} reviews`}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button sx={{
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
                                    </Box>

                                </Box>
                            </Paper>
                        ))
                }
            </div>

        </div>
    )
}

export default ProductList
