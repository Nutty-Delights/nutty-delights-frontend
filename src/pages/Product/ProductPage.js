import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, getProductsById, getProductsLoading } from '../../redux/slices/products'
import Image from 'mui-image';
import { useLocation } from 'react-router-dom';
import './productPage.css'
import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';
import ShoppingBag from '@mui/icons-material/ShoppingBagOutlined';
import NavBar from '../../components/shared/NavBar/NavBar';


function ProductPage() {

    const product = useSelector(getProductsById);
    const isLoading = useSelector(getProductsLoading);
    const location = useLocation().pathname.split('/pid=')[1];
    const [productId, setProductId] = useState(location);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct({ productId }));
    }, [productId])
    return (

        <div>
            <NavBar />
            <Box sx={{
                display: {
                    'xs': 'block',
                    'sm': 'block',
                    'md': 'flex',
                    'lg': 'flex',
                    'xl': 'flex'
                }
            }} className='product-page'>
                <div className='product-images'>

                    <Image height={'50vh'} fit='contain' showLoading duration={100} src={product?.productImageUrl}></Image>
                </div>
                <div className='product-details'>
                    <Typography>{product?.productName}</Typography>
                    <Typography>{product?.productDescription + "Product Description Goes Here"}</Typography>
                    <Divider></Divider>
                    <Typography>{product?.productPrice}</Typography>
                    <Divider></Divider>
                    <div className='buy-actions'>
                        <Button sx={{
                            width: "100%",
                            marginBlock: '15px',
                            color: 'orange',
                            fontWeight: 'bold',
                            borderRadius: '20px',
                            borderColor: 'Orange',
                            ':hover': {
                                backgroundColor: 'green', color: 'white', borderColor: 'white'
                            }
                        }} variant='outlined' endIcon={<ShoppingBag />}>
                            Buy Now
                        </Button>
                        <Button sx={{
                            width: "100%",
                            marginBlock: '15px',
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
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default ProductPage
