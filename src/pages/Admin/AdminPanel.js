import { Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Admin() {


    const actions = [
        {
            "name": "Categories",
            "link": 'categories'
        },
        {
            "name": "Products",
            "link": 'products'
        },
        {
            "name": "APIs",
            "link": 'apis'
        },
    ]
    return (
        <div className='admin-panel' style={{ padding: '20px' }}>
            <Typography sx={{ fontSize: '24px', color: 'orange', fontWeight: 'bold' }}>Admin Panel</Typography>
            <div className='actions' style={{ display: 'flex' }}>

                {
                    actions.map((ele, i) => (
                        <NavLink style={{ paddingBlock: '10px', marginRight: '10px', color: 'orange' }} key={i} to={ele.link}>
                            <Paper sx={{ height: '100px', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: '18px', color: 'orange' }} >{ele.name}</Typography>
                            </Paper>
                        </NavLink>
                    ))

                }



            </div>
            <Divider></Divider>
            <Outlet></Outlet>
        </div>
    )
}

export default Admin
