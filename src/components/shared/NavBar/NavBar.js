import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
//https://dribbble.com/shots/19614098-Shopcart-E-Commerce-Product-Page

import AppBar from '@mui/material/AppBar';
import { Card, Box, Button, CssBaseline, Dialog, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Tooltip, Typography, makeStyles, Badge, LinearProgress, ListItemAvatar, Avatar } from '@mui/material';
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
import HoverMenu from 'material-ui-popup-state/HoverMenu'

import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks'
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
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  })

  const popupStateAccount = usePopupState({
    variant: 'popover',
    popupId: 'demoMenuAccount',
  })
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

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    // setOpen(true);
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

                  <Button disableRipple disableElevation disableTouchRipple sx={{ color: 'black' }} {...bindHover(popupState)}>
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

                    {
                      cart === null || location === '/cart' || location === '/checkout' || !localStorage.getItem('jwt') || cart?.cartTotalItems === 0 ? <></> :
                        <HoverMenu
                          sx={{
                            display: {
                              xs: 'none',
                              sm: 'inherit',
                              md: 'inherit'
                            }
                          }}
                          {...bindMenu(popupState)}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                          <MenuItem
                            onClick={popupState.close}
                            disableRipple
                            disableGutters

                            sx={{
                              ":hover": {
                                background: 'white',
                              },
                              padding: '8px !important',
                              fontSize: '14px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'start',
                              alignItems: 'start'
                            }} >
                            <Card variant='outlined' sx={{
                              width: {
                                xs: '100% ',
                                sm: '100%',
                                md: '100%',
                              }, marginBottom: '20px'
                            }} >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '24px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>Shopping Bag</Typography>
                                <Typography sx={{ fontSize: '24px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`${cart?.cartTotalItems} Item${cart?.cartTotalItems > 1 ? 's' : ''}`}</Typography>
                              </Box>
                              <List sx={{
                                padding: '0px',
                                height: {
                                  xs: cart?.cartItems?.length > 3 ? ' 55vh' : 'fit-content !important',
                                  sm: cart?.cartItems?.length > 3 ? ' 55vh' : 'fit-content !important',
                                  md: cart?.cartItems?.length > 3 ? ' 55vh' : 'fit-content !important',
                                },
                                overflowY: 'auto',
                                overflowX: 'hidden',
                              }}>




                                {
                                  cart ? cart?.cartItems?.map((item, i) => {
                                    return <Box>
                                      {<Box sx={{
                                        alignItems: 'center',
                                        display: {
                                          xs: 'block',
                                          sm: 'block',
                                          md: 'flex'
                                        }
                                      }}>
                                        {<ListItem key={item?.productId} disablePadding >
                                          {/* <Box height={'50px'} width={5} sx={{ background: item?.productVariants[0]?.quantity > 0 ? "green" : 'red' }}></Box> */}
                                          <ListItemAvatar sx={{ padding: '10px', minWidth: '0px !important' }}>
                                            <NavLink style={{ textDecoration: 'none' }} to={`/pid=${item?.cartItemProduct?.productId}`}>
                                              <Avatar sx={{
                                                height: {
                                                  xs: '60px',
                                                  sm: '100px',
                                                  md: '120px'
                                                }, width: {
                                                  xs: '60px',
                                                  sm: '100px',
                                                  md: '120px'
                                                }
                                              }} alt="Remy Sharp" src={item?.cartItemProduct?.productImageUrl} />
                                              <Box sx={{
                                                display: {
                                                  xs: 'flex',
                                                  sm: 'flex',
                                                  md: 'none',
                                                  lg: 'none'
                                                }, alignItems: 'center'
                                              }}>
                                                <Box sx={{ marginInline: '15px', border: '0px solid #8080806e', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>

                                                  <Box sx={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                                                    <Typography sx={{ fontWeight: '', color: '#000000bf ', fontSize: '17px' }} >{`₹ ${item?.cartItemPrice}`}</Typography>

                                                    {/* <Typography sx={{ fontWeight: '', color: '#000000bf ', fontSize: '12px' }} >{`inlusive all taxes`}</Typography> */}
                                                  </Box>

                                                </Box>



                                              </Box>
                                            </NavLink>
                                          </ListItemAvatar>
                                          <ListItemText
                                            primaryTypographyProps={{
                                              style: {
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                color: '#000000d1'
                                              }
                                            }}
                                            secondaryTypographyProps={{
                                              style: {
                                                fontWeight: 'bold',
                                                // fontSize: '17px',
                                                color: '#000000d1'
                                              }
                                            }}
                                            sx={{}}
                                            primary={`${item?.cartItemProduct?.productName}`}
                                            secondary={<Box>
                                              <Typography sx={{
                                                marginBlock: '5px',
                                                fontWeight: 'bold',
                                                fontSize: '13px',
                                                color: '#000000d1'
                                              }}>{`${item?.cartItemVariant?.weight}   |   ${item?.cartItemQuantity < 10 ? `0${item?.cartItemQuantity}` : item?.cartItemQuantity} x ₹ ${item?.cartItemVariant?.sellingPrice}  `}</Typography>



                                            </Box>}

                                          />


                                        </ListItem>}

                                        <Box sx={{
                                          display: {
                                            xs: 'none',
                                            sm: 'none',
                                            md: 'flex',
                                            lg: 'block'
                                          }, alignItems: 'center'
                                        }}>
                                          <Box sx={{ marginInline: '15px', border: '0px solid #8080806e', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>

                                            <Box sx={{ minWidth: '100px', padding: '8px', display: 'flex', alignItems: 'center' }}>
                                              <Typography sx={{ fontWeight: 'bold', color: '#000000a3', fontSize: '17px' }} >{`₹ ${item?.cartItemPrice}`}</Typography>

                                            </Box>

                                          </Box>



                                        </Box>



                                      </Box>}
                                      {i === cart?.cartItems?.length - 1 ? <></> : <Divider></Divider>}
                                    </Box>
                                  }) : <LinearProgress></LinearProgress>
                                }
                              </List >


                            </Card>
                            <Box display={'flex'} justifyContent={'space-between'}>

                              <Box display={'flex'} alignItems={'center'}>
                                <Box display={'flex'} alignItems={'center'}>
                                  <Typography sx={{ fontSize: '17px', fontWeight: 'bold', marginInline: '10px', marginTop: '0px' }}>{`Total`}</Typography>
                                  <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '13px', marginInline: '0px', }} >(Excluding shipping charges) :</Typography>
                                </Box>
                                <Typography sx={{ color: 'orange', fontSize: '17px', fontWeight: 'bold', marginInline: '10px', marginTop: '0px' }}>{`₹ ${cart ? cart?.cartTotalPrice : 0}`}</Typography>
                              </Box>
                              <Box display={'flex'} marginLeft={'15px'}>
                                <Button
                                  onClick={() => {
                                    popupState.close();
                                    navigate('/cart');
                                    popupState.close();

                                  }}
                                  disableElevation
                                  variant='contained' sx={{
                                    fontWeight: 'bold',
                                    background: 'orange', color: 'white', paddingInline: '10px', paddingBlock: '5px', marginInline: '8px', ':hover': {
                                      background: 'orange',
                                    }
                                  }}>
                                  Edit Cart
                                </Button>
                                <Button
                                  onClick={() => {
                                    popupState.close();
                                    navigate('/checkout');
                                    popupState.close();

                                  }}
                                  disableElevation variant='contained' sx={{
                                    fontWeight: 'bold',
                                    background: 'orange', color: 'white', padding: '10px', marginInline: '8px', ':hover': {
                                      background: 'orange',
                                    }
                                  }}>
                                  Checkout
                                </Button>
                              </Box>

                            </Box>
                          </MenuItem>
                        </HoverMenu>
                    }
                  </Button>


                  {
                    localStorage.getItem('jwt') ?
                      <Box
                      >
                        <Button

                          disableRipple
                          disableElevation
                          disableTouchRipple
                          sx={{ color: 'black' }}
                          {...bindHover(popupStateAccount)}

                          style={{ color: 'black', textDecoration: "none", zIndex: '1301' }
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
                        <HoverMenu
                          sx={{
                            display: {
                              xs: 'inherit',
                              sm: 'inherit',
                              md: 'inherit'
                            }
                          }}
                          {...bindMenu(popupStateAccount)}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
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
                          <MenuItem onClick={() => {
                            popupStateAccount.close();
                            handleAccount();

                          }}>
                            {/* <AccountCircleOutlinedIcon /> */}
                            Account
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              popupStateAccount.close();
                              handleLogout();

                            }}>
                            {/* <LogoutOutlinedIcon /> */}
                            Logout
                          </MenuItem>
                        </HoverMenu>
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
