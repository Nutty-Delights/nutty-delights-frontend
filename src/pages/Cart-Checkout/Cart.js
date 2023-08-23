import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getCart, getCartError, getCartLoading, getRemoveLoading, getUpdateItemLoading, getUserCart, removeItemFromCart, updateCartItem } from '../../redux/slices/cart'
import { Add, AddCircle, AddCircleOutline, AddCircleOutlineOutlined, RemoveCircleOutline, Remove, RemoveCircle, Delete, DeleteOutlineOutlined, DeleteTwoTone } from '@mui/icons-material'
import EastRoundedIcon from '@mui/icons-material/EastRounded';
const Cart = () => {


    const cart = useSelector(getUserCart);
    const removeLoading = useSelector(getRemoveLoading);
    const updateItemLoading = useSelector(getUpdateItemLoading);
    const dispatch = useDispatch();
    const isLoading = useSelector(getCartLoading);
    const isError = useSelector(getCartError);
    const [isRemoved, setIsRemoved] = useState(-1);
    const [length, setLength] = useState(0);
    const [cartState, setCartState] = useState(cart);
    const [isChanged, setChanged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // if (cartState) {
        dispatch(getCart(localStorage.getItem('jwt')));
        // setLength(cart?.cartItems.length)    
        // }

        setCartState(cart);
    }, [])




    const handleRemoveItem = (cartItemId, i) => {
        // setIsRemoved(i);
        const token = localStorage.getItem('jwt');
        // var variant = product?.productVariants?.[selectedVariant];
        // const productId = product?.productId;

        const data = {
            cartItemId: cartItemId
        }

        dispatch(removeItemFromCart({ token, data }));
        // dispatch(getCart(localStorage.getItem('jwt')));
    }


    const handleUpdateItem = (item, variable) => {
        const token = localStorage.getItem('jwt');
        console.log(item)
        // var variant = product?.productVariants?.[selectedVariant];
        // const productId = product?.productId;

        const data = {
            productId: item?.cartItemProduct?.productId,
            quantity: variable,
            variant: item?.cartItemVariant

        }

        dispatch(updateCartItem({ token, data }));
        // dispatch(getCart()); 
        // setItemCount(1);


    }

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    }
    return (

        isLoading ? <Box sx={{ color: 'orange', height: '80vh', }}>
            <LinearProgress />
        </Box>
            : cart?.cartTotalItems === 0 ?
                <Box sx={{ color: 'orange', height: '80vh', alignItems: 'center', justifyContent: 'center', display: 'flex', }}>
                    <Typography sx={{ fontSize: '26px', fontWeight: 'bold', }}>{"Nothing In The Cart ! Explore Now"}
                    </Typography>
                </Box> :
                isError ? <Box sx={{ display: "flex", justifyContent: 'center', padding: '100px' }}>
                    <Typography>Network error or backend error</Typography>
                </Box> :
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

                        <Box sx={{ marginBlock: '10px' }}>
                            <Button
                                disableElevation
                                onClick={handleProceedToCheckout}
                                fullWidth
                                variant='contained'
                                sx={{
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'none'
                                    },
                                    fontWeight: 'bold',
                                    background: 'orange',
                                    color: 'white',
                                    fontSize: '20px',
                                    ':hover': {
                                        background: 'orange',
                                        color: 'white',
                                        fontSize: '20px',
                                    }
                                }}>
                                Proceed to checkout
                            </Button>
                        </Box>

                        <Card variant='outlined' sx={{
                            width: {
                                xs: 'fit-content',
                                sm: '100%',
                                md: '50%',
                            }, marginBottom: '20px'
                        }} >
                            {/* <CardHeader> */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '24px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>Shopping Bag</Typography>
                                <Typography sx={{ fontSize: '24px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`${cart?.cartTotalItems} Items`}</Typography>
                            </Box>
                            {/* </CardHeader> */}


                            <CardContent>
                                <Divider></Divider>

                                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '20px', fontWeight: '', marginInline: '30px', marginTop: '0px' }}>Item</Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: '', marginInline: '30px', marginTop: '0px' }}>{`Amount`}</Typography>
                        </Box>
                        <Divider></Divider> */}
                                {
                                    updateItemLoading ?
                                        <LinearProgress
                                            content='removing'
                                            color='success'
                                        /> : <Box height={removeLoading ? "0px" : '4px'}></Box>
                                }
                                {
                                    removeLoading ?
                                        <LinearProgress
                                            content='removing'
                                            color='success'
                                        /> : <Box height={"0px"}></Box>
                                }
                                <List sx={{
                                    padding: '0px',
                                    height: {
                                        xs: '50vh',
                                        sm: '60vh',
                                        md: cart?.cartItems?.length > 3 ? ' 55vh' : 'fit-content !important',
                                    },
                                    overflow: 'auto'
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
                                                        <ListItemAvatar sx={{ padding: '10px' }}>
                                                            <NavLink style={{ textDecoration: 'none' }} to={`/pid=${item?.cartItemProduct?.productId}`}>
                                                                <Avatar sx={{
                                                                    height: {
                                                                        xs: '100px',
                                                                        sm: '100px',
                                                                        md: '120px'
                                                                    }, width: {
                                                                        xs: '100px',
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

                                                                        <Box sx={{ minWidth: '100px', padding: '8px', display: 'flex', alignItems: 'center' }}>
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

                                                                <Box sx={{ maxWidth: 'fit-content', marginBlock: '8px', marginInline: "0px", height: '28px', border: '0.5px solid #8080806e', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                                                                    <IconButton
                                                                        onClick={() => { if (item?.cartItemQuantity > 1) handleUpdateItem(item, -1) }}
                                                                    >
                                                                        <Remove sx={{ color: '#808080b3', fontSize: '15px' }} />
                                                                    </IconButton>
                                                                    <Box sx={{ minWidth: '20px', borderRadius: '10px', border: '0px solid #8080806e', padding: '0px' }}>
                                                                        {/* <Typography sx={{ fontWeight: 'bold', color: 'orange', fontSize: '17px' }} >{`${item?.cartItemQuantity}`}</Typography> */}
                                                                        <Typography sx={{ fontWeight: 'bold', color: 'orange', fontSize: '15px' }} >{`${item?.cartItemQuantity / 10 >= 1 ? item?.cartItemQuantity : `0${item?.cartItemQuantity}`}`}</Typography>
                                                                    </Box>
                                                                    <IconButton onClick={() => { handleUpdateItem(item, 1) }}

                                                                    >
                                                                        <Add sx={{ color: '#808080b3', fontSize: '15px' }} />
                                                                    </IconButton>
                                                                </Box>
                                                                <Button
                                                                    onClick={() => { handleRemoveItem(item?.cartItemId, i) }}
                                                                    sx={{
                                                                        color: 'orange',
                                                                        paddingLeft: '5px !important   ',
                                                                        padding: '0px',
                                                                        fontSize: '11px'
                                                                    }} >Remove item</Button>

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
                                {/* {isChanged ? <Button variant='contained'>Update Cart</Button> : <></>} */}
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
                                            <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{` ₹ ${Math.round(cart ? cart?.cartTotalPrice * 100 / 105 : 0)}`}</Typography>
                                            <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{` ₹ ${Math.round(cart ? cart?.cartTotalPrice * 5 / 105 : 0)}`}</Typography>
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
                                                <Typography sx={{ color: 'orange', fontSize: '17px', fontWeight: 'bold', marginInline: '10px', marginTop: '10px' }}>{`₹ ${cart ? cart?.cartTotalPrice : 0}`}</Typography>
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
                                onClick={handleProceedToCheckout}
                                fullWidth
                                variant='contained'
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'none',
                                        md: 'block'
                                    },
                                    fontWeight: 'bold',
                                    background: 'orange',
                                    color: 'white',
                                    fontSize: '20px',
                                    ':hover': {
                                        background: 'orange',
                                        color: 'white',
                                        fontSize: '20px',
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
