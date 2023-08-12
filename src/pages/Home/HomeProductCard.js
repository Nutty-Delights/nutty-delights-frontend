import { MicOutlined } from "@mui/icons-material";
import Image from "mui-image";
import React from "react";

import { useNavigate } from "react-router-dom";
import { Card, Typography, Box } from '@mui/material'
import './HomePageCard.css';

const HomeProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handleDragStart = (e) => e.preventDefault();


    return (
        <Card className="home-product-card">
            <div onDragStart={handleDragStart}>
                <Image
                    duration={0}
                    src={product?.productImageUrl}
                    alt={product?.productName}
                />
            </div>

            <div className="product-name" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography>{product?.productName?.split("Nutty Delights")[1]?.split("|")[0]}</Typography>
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
                                fontSize: '15px'
                            }}>
                            {`₹ ${product.productPrice}`}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'grey',
                                textDecoration: 'line-through',
                                marginLeft: '5px',
                                fontSize: '15px'
                            }}>
                            {`₹ ${product.productPrice + product.productDiscount}`}
                        </Typography>
                        <Typography
                            sx={{
                                color: "orange",
                                marginLeft: '5px',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}>
                            {`${Math.round(product.productDiscount * 100 / (product.productPrice + product.productDiscount))}% Off`}
                        </Typography>
                    </Box>
                </Box>
            </div>
        </Card>
    );
};

export default HomeProductCard;