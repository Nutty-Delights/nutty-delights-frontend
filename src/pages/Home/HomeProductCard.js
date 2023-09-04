import { MicOutlined } from "@mui/icons-material";
import Image from "mui-image";
import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Card, Typography, Box } from '@mui/material'
import './HomePageCard.css';

const HomeProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handleDragStart = (e) => {
        console.log(e);
        e.stopPropagation();
        console.log("Dragging")
    }


    return (

        <Card className="home-product-card">

            <div >
                <NavLink
                    onDragEnd={(e) => {
                        console.log("event", e);
                    }}
                    onClick={(e) => {
                        console.log("event", e);
                    }} to={`/pid=${product.productId}`}>
                    <Image
                        duration={0}
                        src={product?.productImageUrl}
                        alt={product?.productName}
                    />
                </NavLink>
            </div>



            <div className="product-name" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography>{product?.productName?.split("Nutty Delights ")[1]?.split("|")[1]} </Typography>

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
                                fontSize: '14px'
                            }}>
                            {`₹ ${product?.productVariants?.[0]?.sellingPrice}`}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'grey',
                                textDecoration: 'line-through',
                                marginLeft: '5px',
                                fontSize: '15px'
                            }}>
                            {`₹ ${product?.productVariants?.[0]?.sellingPrice + product?.productVariants?.[0]?.discount}`}
                        </Typography>
                        <Typography
                            sx={{
                                color: "orange",
                                marginLeft: '5px',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}>
                            {`${Math.round(product?.productVariants?.[0]?.discount * 100 / (product?.productVariants?.[0]?.sellingPrice + product?.productVariants?.[0]?.discount))}% Off`}
                        </Typography>
                    </Box>

                </Box>
                {/* <Typography>{product?.productVariants?.[0]?.weight} </Typography> */}
            </div>
        </Card>

    );
};

export default HomeProductCard;