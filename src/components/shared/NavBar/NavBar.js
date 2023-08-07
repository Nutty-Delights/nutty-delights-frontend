import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
//https://dribbble.com/shots/19614098-Shopcart-E-Commerce-Product-Page

import AppBar from '@mui/material/AppBar';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Tooltip, Typography, makeStyles } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo-png.png'
import Image from 'mui-image';
import AccountIcon from '@mui/icons-material/PermIdentityOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import './NavBar.css';
import SearchBar from './SearchBar';
import CategoryIcon from '@mui/icons-material/CategoryOutlined';
import DealsIcons from '@mui/icons-material/LocalOfferOutlined';
import BulkOrderIcon from '@mui/icons-material/CasesOutlined';
import CombosIcon from '@mui/icons-material/AcUnitOutlined';
import DeliveryIcon from '@mui/icons-material/LocalShippingOutlined';



const NavBar = (props) => {

  // const classes = navbarUseStyles();
  // console.log(classes);
  const location = useLocation().pathname;
  // const activeColor = '#ffa732';
  const navItems = [
    {
      name: "Categories",
      link: '/categories',
      icon: (color = 'black') => <CategoryIcon sx={{ color: color }} />
    },
    {
      name: "Explore",
      link: '/products',
      icon: (color = 'black') => <DealsIcons sx={{ color: color }} />
    },
    {
      name: "Bulk Order",
      link: '/bulk-orders',
      icon: (color = 'black') => <BulkOrderIcon sx={{ color: color }} />
    },
    {
      name: "Delivery",
      link: '/delivery',
      icon: (color = 'black') => <DeliveryIcon sx={{ color: color }} />

    },

  ];

  const navUserActionItems = [
    // {
    //   name: 'Account',
    //   link: '/account',
    //   icon: <AccountIcon />
    // },

    {
      name: 'Cart',
      link: '/cart',
      icon: <ShoppingCartIcon />
    },
  ];

  const drawerWidth = 240;
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{}}>
      <Image style={{ padding: '10px' }} duration={0} src={logo} fit='cover' height='60px' width='130px' />
      <Divider />
      {/* <Box sx={{ display: { xs: 'flex', md: 'flex', sm: 'none' }, }}>
        <SearchBar margin={'10px'} />
      </Box> */}
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{}}>
              <NavLink to={item.link} style={{ color: location === item.link ? "#ffa732" : 'black', textDecoration: "none", marginRight: "1.5rem", marginLeft: '6px' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {item.name}
                </Typography>
              </NavLink>

            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar sx={{ zIndex: '5', marginBlock: '10px', minHeight: '0 !important' }} position='relative' className='app-bar' elevation={0} component="nav">
          <Toolbar sx={{ paddingInline: '20px !important', minHeight: 'none !important' }}>
            <IconButton
              aria-label="open drawer"
              // edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ marginRight: "10px" }}>
              <NavLink replace={true} to='/'>
                <Image style={{ display: { sm: 'none', md: 'flex' }, }} duration={0} src={logo} fit='cover' height='42px' width='124px' />
              </NavLink>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, flexGrow: 1, }}>
              {
                navItems.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.icon(location === item.link ? "#ffa732" : "black")}
                    <NavLink to={item.link} style={{ color: location === item.link ? "#ffa732" : 'black', textDecoration: "none", marginRight: "1.5rem", marginLeft: '6px' }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {item.name}
                      </Typography>
                    </NavLink>
                  </Box>
                ))
              }
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'flex', marginRight: '30px' }, justifyContent: 'space-between' }}>

              {<Box sx={{ display: { xs: 'none', md: 'none', sm: 'flex' }, }}>
                <SearchBar width={'fit-content'} marginRight={'3vh'} />
              </Box>}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>

                <AccountIcon />
                <NavLink to={'/login'} style={{ color: 'black', textDecoration: "none", }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {"Login"}
                  </Typography>

                </NavLink>
                <Box sx={{ display: "flex", flex: '1', marginRight: '20px' }}>

                </Box>
                <ShoppingCartIcon />
                <NavLink to={'/cart'} style={{ color: 'black', textDecoration: "none", }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {"Cart"}
                  </Typography>

                </NavLink>
                {/* <Button sx={{
                  padding: '6px',
                  borderRadius: '14px',
                  borderColor: '#80808057'

                }} variant='outlined'>
                  <NavLink to={'/login'} style={{ color: 'black', textDecoration: "none", }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {"Login/Register"}
                    </Typography>

                  </NavLink>
                </Button> */}
              </Box>
              {/* {navUserActionItems.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>


                  <NavLink to={item.link} style={{ color: 'black', textDecoration: "none", marginRight: "1rem" }}>
                   
                    <Tooltip title={item.name}>
                      {item.icon}
                    </Tooltip>
                  </NavLink>
                </Box>
              ))} */}

            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </div >
  )
}

export default NavBar
