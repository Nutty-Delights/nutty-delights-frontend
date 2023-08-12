import { MicOutlined } from "@mui/icons-material";
import Image from "mui-image";
import React from "react";

import { useNavigate } from "react-router-dom";
import { Card, Typography, Box } from '@mui/material'
import './HomePageCard.css';

const HomeCategoryCard = ({ category: category }) => {
    const navigate = useNavigate();
    const handleDragStart = (e) => e.preventDefault();


    return (
        <Card sx={{ margin: '10px', borderRadius: '10px' }}>
            <div onDragStart={handleDragStart}>
                <Image
                    // height={100}
                    duration={0}
                    src={category?.categoryImageUrl}
                    alt={category?.categoryName}
                />
            </div>

            <div className="category-name" style={{ background: '', padding: '10px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography sx={{
                    color: 'black',
                    fontWeight: 'bold', fontSize: {
                        "xs": "13px",
                        "sm": "13px",
                        "md": "16px",

                    }
                }}>{category?.categoryName}</Typography>
                {/* <Box
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
                            {`₹ ${category.categoryPrice}`}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'grey',
                                textDecoration: 'line-through',
                                marginLeft: '5px',
                                fontSize: '15px'
                            }}>
                            {`₹ ${category.categoryPrice + category.categoryDiscount}`}
                        </Typography>
                        <Typography
                            sx={{
                                color: "orange",
                                marginLeft: '5px',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}>
                            {`${Math.round(category.categoryDiscount * 100 / (category.categoryPrice + category.categoryDiscount))}% Off`}
                        </Typography>
                    </Box>
                </Box> */}
            </div>
        </Card>
    );
};

export default HomeCategoryCard;