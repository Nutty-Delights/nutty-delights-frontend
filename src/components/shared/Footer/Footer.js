import React from 'react'
import './footer.css'
import { Box, Typography, IconButton } from '@mui/material'
import Image from 'mui-image'
import logo from '../../../assets/images/LogoTransparent.png'
import Facebook from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import { NavLink, useLocation } from 'react-router-dom'

function Footer() {

    const location = useLocation().pathname;
    console.log("location", location)

    const content = [
        {
            title: 'Contact Us',
            children: [
                {
                    title: 'Anant Nutty Delights',
                    link: '',
                    active: false
                },
                {
                    title: 'shop@nuttydelights.co.in',
                    link: '',
                    active: false
                },
                {
                    title: 'Gwalior, Madhya Pradesh',
                    link: '',
                    active: false
                },




            ]
        },
        {
            title: 'Company',
            children: [
                {
                    title: 'About Us',
                    link: '/about-us'
                },
                {
                    title: 'Shipping and Return Policy',
                    link: '/about-us'
                },
                {
                    title: 'Terms and Condtions',
                    link: '/about-us'
                },
                {
                    title: 'Privacy  ',
                    link: '/about-us'
                },

            ]
        },
        // {
        //     title: 'Quick Links',
        //     children: [
        //         {
        //             title: 'Categories',
        //             link: '/categories'
        //         },
        //         {
        //             title: 'Offers',
        //             link: '/offers'
        //         },
        //         {
        //             title: 'Bulk Order',
        //             link: '/bulk-order'
        //         },
        //         {
        //             title: 'Delivery',
        //             link: '/delivery'
        //         },

        //     ]
        // }
    ]
    return (
        <Box sx={{ display: { xs: 'block', sm: 'block', md: 'flex' }, }} className='footer' >


            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block' }, alignItems: 'center', marginBottom: '15px' }}>
                <Image style={{}} duration={0} src={logo} fit='contain' width='160px' height='fit-content' />
                <Typography className='content-heading'>Always serving the best.</Typography>
            </Box>

            <div className='content'>
                {content.map((item, index) => {
                    return <div key={index}>
                        <Typography className='content-heading'>{item.title}</Typography>
                        {
                            item.children.map((subItem, i) => (
                                <Typography className={'content-subheading'} key={subItem.title}>{subItem.title}</Typography>
                            ))
                        }
                    </div>
                })}
            </div>
        </Box>
    )
}

export default Footer
