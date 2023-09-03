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
import { getOpenEmail, getUser, getUserProfile, logoutUser, setOpenEmail } from '../../../redux/slices/user';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Login from '../../../pages/Auth/Login';
import Register from '../../../pages/Auth/Register';
import { toast } from 'react-toastify';
import VerfiyEmail from '../../../pages/Auth/VerfiyEmail';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
// import { ShopOutlined, ShoppingBasketOutlined } from '@mui/icons-material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ShoppingBasketOutlined from '@mui/icons-material/ShoppingBasketOutlined';
import { clearCart, getCart, getUserCart } from '../../../redux/slices/cart';
import { CardGiftcardSharp, Person2Outlined, Person2Rounded, PersonOutline, PersonOutlineOutlined } from '@mui/icons-material';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

// import { Login } from '@mui/icons-material';



function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


const NavBar = (props) => {

  // const classes = navbarUseStyles();
  // console.log(classes);
  const location = useLocation().pathname;
  // const activeColor = '#ffa732';
  const navItems = [
    {
      name: "Account",
      link: '/user/account',
      icon: (color = 'black') => <PersonOutline sx={{ color: color }} />
    },
    {
      name: "Shop",
      link: '/',
      icon: (color = 'black') => <LocalMallOutlinedIcon sx={{ color: color }} />
    },
    {
      name: "Categories",
      link: '/categories',
      icon: (color = 'black') => <CategoryIcon sx={{ color: color }} />
    },
    {
      name: "Products",
      link: '/products',
      icon: (color = 'black') => <DealsIcons sx={{ color: color }} />
    },
    {
      name: "Gifts",
      link: '/gifts',
      icon: (color = 'black') => <CardGiftcardSharp sx={{ color: color }} />

    },
    {
      name: "Wholesale",
      link: '/bulk-orders',
      icon: (color = 'black') => <ReceiptLongOutlinedIcon sx={{ color: color }} />
    },


  ];



  const drawerWidth = 240;
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [invisible, setInvisible] = useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailOpen = useSelector(getOpenEmail);
  const [openDialog, setOpen] = useState(emailOpen);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);

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
    if (localStorage.getItem('jwt'))
      dispatch(getCart(localStorage.getItem('jwt')));

  }

  const handleEmailClose = () => {
    setAnchorEl(null);
    setOpenEmailDialog(true);
    dispatch(setOpenEmail({ open: true }));
    // setAuthForm(false);
  }





  const handleAccount = () => {
    setAnchorEl(null);
    dispatch(getUserProfile(localStorage.getItem('jwt')));
    navigate('/user/account');
  }
  const handleLogout = () => {

    setAnchorEl(null);
    dispatch(clearCart());
    dispatch(logoutUser());
    navigate('/')




  }

  const handleAuthForm = () => {
    setAuthForm(prev => !prev);
  }

  const handleDialog = () => {
    setOpen(false);
    setAuthForm(false);
    if (localStorage.getItem('jwt'))
      dispatch(getCart(localStorage.getItem('jwt')));

  }
  const handleEmailDialog = () => {
    setOpenEmailDialog(false);
    dispatch(setOpenEmail({ open: false }));


  }
  const handleOpenDialog = () => {
    setOpen(true);
  }




  const user = useSelector(getUser);
  const cart = useSelector(getUserCart);
  const success = useSelector((state) => state?.user?.success)
  const [cartState, setCartState] = useState(cart?.cartTotalItems);
  console.log("In the nav bar", cart)

  useEffect(() => {
    // if (cart?.cartTotalItems !== cartState) {

    console.log(localStorage.getItem('jwt'))


    if (localStorage.getItem('jwt'))
      dispatch(getCart(localStorage.getItem('jwt')));
    // setLength(cart?.cartItems.length)    
    // }
  }, [cartState])
  console.log("User", user);
  useEffect(() => {


    if (!user)
      dispatch(getUserProfile(localStorage.getItem('jwt')));

    if (user) {
      // dispatch(getUserProfile(localStorage.getItem('jwt')));
      handleDialog();

    }

    if (success === true) {
      handleEmailDialog();
    }

    // dispatch(getCart(localStorage.getItem('jwt')))




  }, [user, success])



  useEffect(() => {

    if (localStorage.getItem('cart')) {

    }
    if (!cart && localStorage.getItem('jwt'))
      dispatch(getCart(localStorage.getItem('jwt')))

    if (user) {
      setInvisible(user?.isEnabled);
    }


  }, [cart])
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{}}>
      {/* <Image style={{ padding: '10px' }} duration={0} src={logo} fit='cover' height='60px' width='130px' /> */}
      <Box display={'flex'} sx={{ padding: '20px', gap: '10px' }} alignItems={'center'} >
        {/* <Image style={{ padding: '10px' }} duration={0} src={logo} fit='cover' height='60px' width='110px' /> */}
        <PersonOutlineOutlined />
        <Box display={'flex'} gap={'5px'}>
          <Typography sx={{ fontWeight: 'bold', }}>{`Hello ${user?.firstName ? user?.firstName : "User "}!`}</Typography>
          {/* <NavLink sx={{ fontWeight: 'bold', color: 'orange !important' }}>{'Login'}</NavLink> */}
        </Box>
      </Box>
      {/* <Typography sx={{ fontWeight: 'bold', paddingInline: '20px' }}>{`My Account`}</Typography> */}

      <Divider />
      {/* <Box sx={{ display: { xs: 'flex', md: 'flex', sm: 'none' }, }}>
        <SearchBar margin={'10px'} />
      </Box> */}
      <List>
        {navItems.filter((item) => {
          if (localStorage.getItem('jwt')) {
            return true;
          }

          else {
            return item.name !== 'Account'
          }
        }).map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{}}>
              <NavLink to={item.link} style={{ display: 'flex', gap: '10px', color: location === item.link ? "#ffa732" : 'black', textDecoration: "none", marginRight: "1.5rem", marginLeft: '6px' }}>
                {item.icon(location === item.link ? "#ffa732" : 'black')}
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
        <HideOnScroll {...props}>
          <AppBar sx={{ paddingBlock: '10px', zIndex: '5', minHeight: '0 !important' }} className='app-bar' elevation={0} component="nav">
            <Toolbar sx={{ paddingBlock: '0px', paddingInline: '20px !important', minHeight: 'none !important' }}>
              <IconButton
                aria-label="open drawer"
                // edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ marginRight: "0px" }}>
                <NavLink replace={true} to='/'>
                  <Image style={{ display: { sm: 'none', md: 'flex' }, }} duration={0} src={logo} fit='cover' height='42px' width='120px' />
                </NavLink>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', marginLeft: '10px !important' }, flexGrow: 1, }}>
                {
                  navItems.filter(item => item.name !== 'Account').map((item, index) => (
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

                {<Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex' }, }}>
                  <SearchBar width={'fit-content'} marginRight={'3vh'} />
                </Box>}

                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                  <Badge

                    // variant='dot'
                    invisible={false}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    showZero={false}
                    badgeContent={cart?.cartTotalItems || 0}
                    sx={{ margin: cart?.cartTotalItems ? '2px' : '2px' }}
                    color='success'
                  >
                    <ShoppingCartIcon />
                  </Badge>

                  {localStorage.getItem('jwt') ? <NavLink to={'/cart'} style={{ color: 'black', textDecoration: "none", }}>

                    <Typography sx={{ fontWeight: 'bold', ml: '4px' }}>
                      {"Cart"}
                    </Typography>

                  </NavLink> :
                    <NavLink onClick={handleOpenDialog} to={''} style={{ color: 'black', textDecoration: "none", }}>

                      <Typography sx={{ fontWeight: 'bold', ml: '4px' }}>
                        {"Cart"}
                      </Typography>

                    </NavLink>
                  }
                  {/* <Box sx={{ display: "flex", flex: '1', marginRight: '20px' }}>

                  </Box> */}
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
                          {<Badge

                            // variant='dot'

                            badgeContent={1}
                            invisible={invisible}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            showZero={false}
                            // badgeContent={"0"}
                            color="error"
                          >
                            <AccountIcon />
                          </Badge>}

                          <Typography sx={{ fontWeight: 'bold', ml: user?.isEnabled ? "5px" : '8px', }}>
                            {localStorage.getItem('userFirstName') ? localStorage.getItem('userFirstName') : user ? `${user?.firstName}` : "User"}
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

                          {user?.isEnabled && localStorage.getItem('jwt') ? <></> : <MenuItem sx={{ color: 'red' }} onClick={handleEmailClose}>
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
                      <Box onClick={handleOpenDialog} sx={{
                        marginLeft: '10px',
                      }} style={{ color: 'black', textDecoration: "none", display: 'flex', cursor: 'pointer', }}>
                        <AccountIcon />

                        <Typography sx={{ fontWeight: 'bold', ml: '5px', }}>
                          {"Login"}
                        </Typography>



                      </Box>

                  }
                  <Dialog PaperProps={{
                    style: {
                      borderRadius: '12px',

                    },
                    elevation: 10
                  }} onClose={handleEmailDialog} open={emailOpen}>

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
        </HideOnScroll>
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
