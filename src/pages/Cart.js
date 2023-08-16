import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { getCart, getCartLoading, getUserCart } from '../redux/slices/cart'
import { Add, AddCircle, AddCircleOutline, AddCircleOutlineOutlined, RemoveCircleOutline, Remove, RemoveCircle } from '@mui/icons-material'
import EastRoundedIcon from '@mui/icons-material/EastRounded';
const Cart = () => {


    const cart = useSelector(getUserCart);
    const dispatch = useDispatch();
    const isLoading = useSelector(getCartLoading);
    useEffect(() => {
        dispatch(getCart(localStorage.getItem('jwt')));
    }, [])
    return (

        isLoading ? <Box sx={{ height: '80vh', alignItems: 'center', justifyContent: 'center', display: 'flex', }}><Typography sx={{ fontSize: '24px' }}>{"Dried Fruits, Healthy Food !...."}</Typography></Box> :
            <Box sx={{
                display: {
                    xs: 'block',
                    sm: 'block',
                    md: 'flex'

                },

                marginInline: '20px',
                marginBlock: '40px',
                justifyContent: 'space-evenly'


            }}>
                {/* <Toolbar /> */}
                <Outlet />

                {/* <Divider sx={{
                    display: {
                        'xs': 'flex',
                        'sm': 'flex',
                        'md': 'flex '
                    }, borderWidth: '1px', marginBlock: '20px', marginInline: '20px'
                }}></Divider> */}


                <Card variant='outlined' sx={{ marginBottom: '20px' }} >
                    {/* <CardHeader> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>Shopping Bag</Typography>
                        <Typography sx={{ fontSize: '24px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`${cart?.cartTotalItems} Items`}</Typography>
                    </Box>
                    {/* </CardHeader> */}


                    <CardContent>
                        <Divider></Divider>
                        <List sx={{
                            height: {
                                sm: '60vh',
                                md: cart?.cartItems?.length > 3 ? ' 55vh' : 'fit-content !important',
                            },
                            overflow: 'auto'
                        }}>

                            {
                                cart?.cartItems?.map((item, i) => {
                                    return <Box>
                                        <Box sx={{
                                            alignItems: 'center',
                                            display: {
                                                xs: 'block',
                                                sm: 'block',
                                                md: 'flex'
                                            }
                                        }}>
                                            <ListItem key={item?.productId} disablePadding >
                                                {/* <Box height={'50px'} width={5} sx={{ background: item?.productVariants[0]?.quantity > 0 ? "green" : 'red' }}></Box> */}
                                                <ListItemAvatar sx={{ padding: '10px' }}>
                                                    <NavLink to={`/pid=${item?.cartItemProduct?.productId}`}>
                                                        <Avatar sx={{ height: '120px', width: '120px' }} alt="Remy Sharp" src={item?.cartItemProduct?.productImageUrl} />
                                                    </NavLink>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primaryTypographyProps={{
                                                        style: {
                                                            fontWeight: 'bold',
                                                            fontSize: '17px',
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
                                                    secondary={`${item?.cartItemVariant?.weight} | ₹ ${item?.cartItemVariant?.sellingPrice} ( incl. all taxes ) `} />

                                            </ListItem>

                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box sx={{ maxWidth: 'fit-content', marginBlock: '15px', marginInline: "20px", height: '35px !important', border: '0.5px solid #8080806e', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                                                    <IconButton>
                                                        <Remove sx={{ color: '#808080b3' }} />
                                                    </IconButton>
                                                    <Box sx={{ minWidth: '20px', borderRadius: '10px', border: '0px solid #8080806e', padding: '0px' }}>
                                                        {/* <Typography sx={{ fontWeight: 'bold', color: 'orange', fontSize: '17px' }} >{`${item?.cartItemQuantity}`}</Typography> */}
                                                        <Typography sx={{ fontWeight: 'bold', color: 'orange', fontSize: '17px' }} >{`${item?.cartItemQuantity / 10 >= 1 ? item?.cartItemQuantity : `0${item?.cartItemQuantity}`}`}</Typography>
                                                    </Box>
                                                    <IconButton>
                                                        <Add sx={{ color: '#808080b3' }} />
                                                    </IconButton>
                                                </Box>
                                                <Box sx={{ margin: '15px', border: '0px solid #8080806e', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>

                                                    <Box sx={{ padding: '8px', display: 'flex' }}>
                                                        <Typography sx={{ fontWeight: '', color: '#000000bf ', fontSize: '17px' }} >{`₹${item?.cartItemPrice}`}</Typography>
                                                        {/* <Typography sx={{ fontWeight: '', color: '#000000bf ', fontSize: '12px' }} >{`inlusive all taxes`}</Typography> */}
                                                    </Box>

                                                </Box>
                                            </Box>

                                        </Box>
                                        {i === cart?.cartItems?.length - 1 ? <></> : <Divider></Divider>}
                                    </Box>
                                })
                            }
                        </List >
                    </CardContent>
                </Card>
                <Box>
                    <Card variant='outlined' sx={{ width: 'inherit', marginBottom: '30px' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: '22px', fontWeight: '', marginInline: '10px', marginTop: '0px' }}>Cart Summary</Typography>
                            <Divider sx={{ marginBlock: '10px' }}></Divider>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography>
                                    <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`Taxes (GST)`}</Typography>
                                    <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`Discounts & Offers (-)`}</Typography>
                                    {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Total (incl. all taxes )`}</Typography> */}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{` ₹ ${Math.round(cart?.cartTotalPrice * 100 / 105)}`}</Typography>
                                    <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{` ₹ ${Math.round(cart?.cartTotalPrice * 5 / 105)}`}</Typography>
                                    <Typography sx={{ textDecoration: 'none', color: 'green', fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`₹ ${0}`}</Typography>
                                </Box>


                            </Box>
                            <Box>
                                <Divider sx={{ marginBlock: '10px' }}></Divider>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Taxes ( GST )`}</Typography> */}
                                        <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '0px' }}>{`Total`}</Typography>
                                        <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >(Excluding shipping charges)</Typography>

                                    </Box>
                                    <Box>
                                        {/* <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 100 / 105)}`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 5 / 105)}`}</Typography> */}
                                        <Typography sx={{ color: 'orange', fontSize: '17px', fontWeight: 'bold', marginInline: '10px', marginTop: '10px' }}>{`₹ ${cart?.cartTotalPrice}`}</Typography>
                                    </Box>
                                </Box>


                            </Box>
                        </CardContent>
                    </Card>
                    <Card variant='outlined' sx={{ width: 'inherit', marginBottom: '30px' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: '22px', fontWeight: '', marginInline: '10px', marginTop: '0px' }}>Have a coupon code ?</Typography>
                            <Divider sx={{ marginBlock: '10px' }}></Divider>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ marginInline: '10px' }}>
                                    <TextField size="small"
                                        sx={{


                                            "& .MuiInputLabel-outlined": {
                                                color: "#909090",
                                                "&.MuiInputLabel-shrink": {
                                                    color: "orange"
                                                },
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "&.Mui-focused fieldset": {
                                                    "borderColor": "orange"
                                                }
                                            }
                                        }}
                                        // value={""}
                                        // onChange={handleNameChange}
                                        // required
                                        fullWidth
                                        margin='dense'
                                        // error={showNameError}


                                        id="name" label="Discount Code" variant="outlined" />
                                    {/* <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography> */}

                                    {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Total (incl. all taxes )`}</Typography> */}
                                </Box>
                                <Box sx={{ marginInline: '5px', marginBlock: '8px' }}>

                                    <Button endIcon={<EastRoundedIcon />} variant='outlined' sx={{ fontSize: '1rem', color: 'orange', borderColor: 'orange' }} >Apply</Button>
                                </Box>


                            </Box>
                            <Box>
                                {/* <Divider sx={{ marginBlock: '10px' }}></Divider> */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Taxes ( GST )`}</Typography> */}
                                        {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Total (incl. all taxes )`}</Typography> */}
                                    </Box>
                                    <Box>
                                        {/* <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 100 / 105)}`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 5 / 105)}`}</Typography> */}
                                        {/* <Typography sx={{ color: 'orange', fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${cart?.cartTotalPrice}`}</Typography> */}
                                    </Box>
                                </Box>


                            </Box>
                        </CardContent>
                    </Card>

                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            fontWeight: 'bold',
                            background: 'orange',
                            color: 'white',
                            fontSize: '22px',
                            ':hover': {
                                background: 'orange',
                                color: 'white',
                                fontSize: '24px',
                            }
                        }}>
                        Proceed to checkout
                    </Button>

                    {/* <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '14px' }} >Shipping charges will calculated at checkout</Typography> */}
                </Box>
            </Box >
    )
}

export default Cart
