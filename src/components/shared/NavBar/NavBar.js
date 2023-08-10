import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
//https://dribbble.com/shots/19614098-Shopcart-E-Commerce-Product-Page

import AppBar from '@mui/material/AppBar';
import { Card, Box, Button, CssBaseline, Dialog, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Tooltip, Typography, makeStyles, Badge } from '@mui/material';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserProfile, logoutUser } from '../../../redux/slices/user';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Login from '../../../pages/Auth/Login';
import Register from '../../../pages/Auth/Register';
import { toast } from 'react-toastify';
import VerfiyEmail from '../../../pages/Auth/VerfiyEmail';
// import { Login } from '@mui/icons-material';



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



  const drawerWidth = 240;
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpen] = useState(false);
  const [openEmailDialog, setOpenEmail] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [anchorElEmail, setAnchorElEmail] = React.useState(null);
  const open = Boolean(anchorEl);
  // const openEmail = Boolean(anchorElEmail);


  const [toggleAuthForm, setAuthForm] = useState(false);
  // const [emailVerifyDialog, shetEmailVerifyDialog] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAuthForm(false);
  }

  const handleEmailClose = () => {
    setAnchorEl(null);
    setOpenEmail(true);
    // setAuthForm(false);
  }





  const handleAccount = () => {
    setAnchorEl(null);
    dispatch(getUserProfile(localStorage.getItem('jwt')));
    navigate('/user/account');
  }
  const handleLogout = () => {

    setAnchorEl(null);
    dispatch(logoutUser());
    navigate('/')




  }

  const handleAuthForm = () => {
    setAuthForm(prev => !prev);
  }

  const handleDialog = () => {
    setOpen(false);
    setAuthForm(false);

  }
  const handleEmailDialog = () => {
    setOpenEmail(false);


  }
  const handleOpenDialog = () => {
    setOpen(true);
  }




  const user = useSelector(getUser);
  const success = useSelector((state) => state?.user?.success)
  console.log("User", user);
  useEffect(() => {
    if (!user)
      dispatch(getUserProfile(localStorage.getItem('jwt')));

    if (user || success) {
      // dispatch(getUserProfile(localStorage.getItem('jwt')));
      handleDialog();
      handleEmailDialog();
    }



  }, [user, success])
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

                <ShoppingCartIcon />
                <NavLink to={'/cart'} style={{ color: 'black', textDecoration: "none", }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {"Cart"}
                  </Typography>

                </NavLink>
                <Box sx={{ display: "flex", flex: '1', marginRight: '20px' }}>

                </Box>
                {
                  localStorage.getItem('jwt') ?
                    <Box>
                      <Button
                        disableRipple
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{ color: 'black', textDecoration: "none", }
                        }>
                        <Badge

                          // variant='dot'
                          invisible={true && user?.isEnabled}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          badgeContent={"1"}
                          color="error"
                        >
                          <AccountIcon />
                        </Badge>

                        <Typography sx={{ fontWeight: 'bold', ml: user?.isEnabled ? "2px" : '10px' }}>
                          {user ? `${user?.firstName}` : ""}
                        </Typography>


                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >

                        {user?.isEnabled ? <></> : <MenuItem sx={{ color: 'red' }} onClick={handleEmailClose}>
                          <Badge

                            variant='dot'
                            invisible={true && user?.isEnabled}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            badgeContent={"1"}
                            color="error"
                          >
                            Verify email
                          </Badge>

                        </MenuItem>}
                        <MenuItem onClick={handleAccount}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </Box> :
                    <Box onClick={handleOpenDialog} style={{ color: 'black', textDecoration: "none", display: 'flex', cursor: 'pointer' }}>
                      <AccountIcon />

                      <Typography sx={{ fontWeight: 'bold' }}>
                        {"Login"}
                      </Typography>



                    </Box>

                }
                <Dialog PaperProps={{
                  style: {
                    borderRadius: '12px',

                  },
                  elevation: 10
                }} onClose={handleEmailDialog} open={openEmailDialog}>

                  <VerfiyEmail />

                </Dialog>
                <Dialog PaperProps={{
                  style: {
                    borderRadius: '12px',

                  },
                  elevation: 10
                }} onClose={handleDialog} open={openDialog}>

                  {
                    !toggleAuthForm ? <Login setAuthForm={setAuthForm} /> : <Register setAuthForm={setAuthForm} />
                  }

                </Dialog>



              </Box>


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
