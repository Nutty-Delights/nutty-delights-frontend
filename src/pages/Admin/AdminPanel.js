import { Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SensorsIcon from '@mui/icons-material/Sensors';
import OrderIcon from '@mui/icons-material/ShoppingBag';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Admin() {


    const actions = [
        {
            "name": "Orders",
            "link": 'orders',
            "icon": <OrderIcon sx={{ color: 'orange', fontSize: '20px' }} />
        },
        {
            "name": "Categories",
            "link": 'categories',
            "icon": <CategoryIcon sx={{ color: 'orange', fontSize: '20px' }} />
        },
        {
            "name": "Products",
            "link": 'products',
            "icon": <AllInboxIcon sx={{ color: 'orange', fontSize: '20px' }} />
        },
        {
            "name": "Payments",
            "link": 'payments',
            "icon": <CurrencyRupeeIcon sx={{ color: 'orange', fontSize: '20px' }} />
        },
        {
            "name": "APIs",
            "link": 'apis',
            "icon": <SensorsIcon sx={{ color: 'orange', fontSize: '20px' }} />
        },
    ]
    return (
        <div className='admin-panel' style={{ padding: '20px' }}>
            <Typography sx={{ fontSize: '24px', color: 'orange', fontWeight: 'bold' }}>Admin Panel </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <div className='actions' style={{ display: 'flex' }}>

                    {
                        actions.map((ele, i) => (
                            <NavLink style={{ paddingBlock: '10px', marginRight: '10px', color: 'orange' }} key={i} to={ele.link}>
                                <Paper sx={{ height: '100px', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {ele.icon}
                                    <Typography sx={{ fontSize: '18px', color: 'orange', marginLeft: '5px' }} >{ele.name}</Typography>
                                </Paper>
                            </NavLink>
                        ))

                    }


                </div>
                <Typography sx={{ fontSize: '24px', color: 'orange', fontWeight: 'bold' }}>{useLocation().pathname}</Typography>
            </div>
            <Divider></Divider>
            <Outlet></Outlet>
        </div>
    )
}

export default Admin
