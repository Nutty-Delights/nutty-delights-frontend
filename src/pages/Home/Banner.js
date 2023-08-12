import React from 'react'
import { Box, Typography, Divider } from '@mui/material';
// import Shipping from '../../assets/images/shipping.jpg'
import Shipping from '@mui/icons-material/LocalShippingTwoTone';
import Price from '@mui/icons-material/CurrencyRupeeTwoTone';
import Premium from '@mui/icons-material/WorkspacePremiumTwoTone';
// import Shop from '@mui/icons-material/StoreRounded';
import Shop from '@mui/icons-material/StoreTwoTone';
const Banner = () => {

    const items = [
        {
            title: 'Shipping',
            subTitle: 'All over India',
            icon: <Shipping sx={{ color: '#505050', fontSize: '3rem' }} />
        },
        {
            title: "Premium Quality",
            subTitle: "100% Guarantee",
            icon: < Premium sx={{ color: 'orange', fontSize: '3rem' }} />
        },
        {
            title: "Lowest Prices",
            subTitle: "With quality products",
            icon: <Price sx={{ color: 'green', fontSize: '3rem' }} />
        },
        {
            title: 'Available',
            subTitle: "Online and In-store",
            icon: <Shop color='orange' sx={{ color: 'teal', fontSize: '3rem' }} />

        }
    ]
    return (
        <Box sx={{
            gap: '22px',
            position: 'relative',
            bottom: '-30px',
            marginBlock: '20px', background: '', display: {
                xs: 'flex',
                sm: 'flex',
                md: 'flex'
            }, justifyContent: 'space-around', width: '100%', paddingInline: '40px', paddingBlock: '20px'
        }}>

            {
                items.map((item, ind) => (
                    <Box key={ind} sx={{}}>
                        <Box sx={{
                            display: {
                                'xs': 'block',
                                'sm': 'block',
                                'md': 'flex'
                            }, alignItems: "center", gap: '10px', justifyContent: 'space-around'
                        }}>
                            {item?.icon}
                            <Box>
                                <Typography sx={{
                                    color: 'black', fontWeight: 'bold', fontSize: {
                                        "xs": '12px',
                                        "md": '20px'
                                    }
                                }}>{item.title}</Typography>
                                <Typography sx={{
                                    color: 'grey', fontSize: {
                                        "xs": '12px',
                                        "md": '15px'
                                    }
                                }}>{item.subTitle}</Typography>
                            </Box>
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Banner
