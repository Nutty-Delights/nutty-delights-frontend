import React, { useEffect, useState } from 'react'
import CategoryCarousel from './CategoryCarousel'
import ProductFilter from './ProductFilter'
import { Box, Paper, Skeleton, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import './productlist.css'
import Image from 'mui-image'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllProductsByCategory, getProdcutsLoading, getProducts, getProductsByCategory } from '../../redux/slices/products'




function ProductList() {

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('productType');
    console.log("categoryId", categoryId, searchParams);
    const dispatch = useDispatch();
    const products = useSelector(getProductsByCategory);
    const isLoading = useSelector(getProdcutsLoading);
    const loading = [1, 2, 3, 4, 5, 6];


    useEffect(() => {
        dispatch(getAllProductsByCategory({ categoryId }))
    }, [categoryId])


    return (

        <div >
            <CategoryCarousel />

            <Box className='product-list-box'>
                <ProductFilter />
            </Box>

            <div className='middle-box'>
                <Typography className='product-list-box-heading'>{`Best for you !`}</Typography>
            </div>

            <div className='product-list'>
                {
                    isLoading ? loading.map((e, i) => (
                        <Box key={i} width={"250px"} >
                            <Skeleton variant="rectangular" height={250} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    )) :
                        products?.map((product, index) => (
                            <Paper key={product.productId}>
                                <Image duration={100} showLoading height={300} src={product.productImageUrl}></Image>
                                <Box>
                                    <Typography>{product.productName}</Typography>
                                    <Typography>{`₹ ${product.productPrice}`}</Typography>

                                </Box>
                            </Paper>
                        ))
                }
            </div>

        </div>
    )
}

export default ProductList
