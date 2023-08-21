import { Avatar, Box, Breadcrumbs, Button, Card, CardContent, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, InputAdornment, InputLabel, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, TextField, Typography, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getCartLoading, getUserCart } from '../../redux/slices/cart';
import { getUser, getUserProfile } from '../../redux/slices/user';
import Contact from '@mui/icons-material/PersonOutlineOutlined';
import Address from '@mui/icons-material/AddHomeOutlined';
// import http from '../../http-common'
import axios from 'axios';





const Checkout = () => {
    const [step, setStep] = useState(0);

    const cart = useSelector(getUserCart);
    const dispatch = useDispatch();
    const isLoading = useSelector(getCartLoading);
    const user = useSelector(getUser);
    const token = localStorage.getItem("jwt")

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [mobNo, setMobNo] = useState("");


    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleHouseNo = (e) => {
        setHouseNo(e.target.value);
    }
    const handlePincode = (e) => {
        setPinCode(e.target.value);
    }
    const handleCountry = (e) => {
        setCountry(e.target.value);
    }
    const handleCity = (e) => {
        setCity(e.target.value);
    }
    const handleState = (e) => {
        setState(e.target.value);
    }
    const handleMob = (e) => {
        setMobNo(e.target.value);
    }









    const getPincode = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "1800",
                "Access-Control-Allow-Headers": "content-type"
                // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        // const res = await axios.get (`http://www.postalpincode.in/api/pincode/474001`, config);
        axios.get("https://api.postalpincode.in/pincode/" + 474001).then(res => {
            var data = res.data;

            console.log("data_1: ", data[0].PostOffice[0].District + " " + data[0].PostOffice[0].State, data[0].PostOffice[0].Country)


        });



    }

    // useEffect(() => {

    // }, [])
    // const navigate = useNavigate();



    useEffect(() => {
        if (token)
            dispatch(getUserProfile());
        // if (cartState) {
        // dispatch(getCart(localStorage.getItem('jwt')));
        // setLength(cart?.cartItems.length)    
        // }

        // setCartState(cart);
        setFirstName(user?.firstName);
        setLastName(user?.lastName);
        setMobNo(user?.mobileNumber);
    }, [])



    const breadcrumbs = [
        // <NavLink style={{ textDecoration: 'none', color: 'grey' }} >
        //     Cart
        // </NavLink>,
        <NavLink style={{ textDecoration: 'none', color: step === 0 ? 'orange' : 'grey', fontWeight: step === 0 ? 'bold' : 'normal' }} >
            Shipping and addresses
        </NavLink>,

        // <NavLink style={{ textDecoration: 'none', color: step === 1 ? 'orange' : 'grey', fontWeight: step === 1 ? 'bold' : 'normal' }} >
        //     Shipping
        // </NavLink>,
        <NavLink style={{ textDecoration: 'none', color: step === 1 ? 'orange' : 'grey', fontWeight: step === 1 ? 'bold' : 'normal' }} >
            Payments
        </NavLink>,

    ];

    const steps = ['Shipping and addresses', 'Payments options',];


    return (
        <Box sx={{ padding: '20px' }}>

            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                {/* <Breadcrumbs
                    sx={{ marginBlock: '20px', }}
                    separator={<NavigateNextIcon sx={{ color: 'grey' }} fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs> */}
            </Box>
            <Box sx={{
                display: {
                    xs: 'block',
                    sm: 'block',
                    md: 'flex',
                    lg: 'flex'
                },
                justifyContent: 'center'
            }}>

                <Box

                    sx={{
                        width: {
                            xs: 'fit-content',
                            sm: 'fit-content',
                            md: '50vw'
                        },
                        margin: '10px'
                    }}>

                    <Card variant='outlined'>
                        <Breadcrumbs
                            sx={{ marginInline: '30px', marginBottom: '0px', marginTop: '20px' }}
                            separator={<NavigateNextIcon sx={{ color: 'grey' }} fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>

                        <CardContent>
                            <Divider></Divider>
                            <Box

                                justifyContent="space-between"

                                sx={{
                                    marginInline: '10px',
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'flex'
                                    },
                                    alignItems: 'center'
                                }}>
                                <Box display='flex' sx={{ gap: '10px', }} >
                                    <Contact sx={{
                                        marginBlock: {
                                            xs: '10px',
                                            sm: '10px',
                                            md: 's0px'
                                        }
                                    }} />
                                    <Typography sx={{
                                        fontWeight: 'bold', marginBlock: {
                                            xs: '10px',
                                            sm: '10px',
                                            md: '10px'
                                        }
                                    }}>Contact</Typography>
                                </Box>

                                {
                                    user ? <Box sx={{
                                        gap: '10px',
                                        display: {
                                            xs: 'block',
                                            sm: 'block',
                                            md: 'flex'
                                        }
                                    }}>
                                        <Typography sx={{ color: 'orange' }}>{user?.firstName + " " + user?.lastName + " "}</Typography>
                                        <Typography>{"(" + user?.email + ")"}</Typography>
                                    </Box> :

                                        <Typography>Already have an account? <Typography sx={{ color: 'orange' }}>Log In</Typography></Typography>

                                }
                            </Box>
                            {/* <Divider sx={{ mt: '10px' }}></Divider> */}
                            <Box

                                justifyContent="space-between"
                                sx={{
                                    marginInline: '10px',
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'flex'
                                    }
                                }}>
                                <Box display='flex' sx={{ gap: "10px" }}>
                                    <Address sx={{
                                        marginBlock: {
                                            xs: '10px',
                                            sm: '10px',
                                            md: '10px'
                                        }
                                    }} />
                                    <Typography sx={{
                                        fontWeight: 'bold', marginBlock: {
                                            xs: '10px',
                                            sm: '10px',
                                            md: '10px'
                                        }
                                    }}>Shipping Address</Typography>
                                </Box>
                            </Box>
                            {/* <Divider></Divider> */}
                            <Box sx={{ padding: '5px' }}>
                                {/* <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{"Update Product"}</Typography> */}
                                <Box sx={{ gap: '10px', }}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <FormGroup row sx={{ width: 'inherit', flexWrap: 'nowrap' }}>
                                            <TextField
                                                onChange={handleFirstName}
                                                value={firstName || ""}
                                                fullWidth
                                                size='small'
                                                // onChange={handleUpdatedNameChange}
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'
                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="First Name"
                                            />
                                            <TextField
                                                onChange={handleLastName}
                                                value={"" || lastName}
                                                fullWidth
                                                size='small'
                                                // onChange={handleUpdatedNameChange}
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'

                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="Last Name"

                                            />

                                        </FormGroup>
                                        <FormGroup row sx={{ width: 'inherit', flexWrap: 'nowrap' }}>
                                            <TextField
                                                onChange={handleAddress}
                                                value={"" || address}
                                                size='small'
                                                // onChange={handleUpdatedImageChange}
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'

                                                }}
                                                fullWidth
                                                required
                                                // value={selectedProduct?.productImageUrl || ""}
                                                id="outlined-required"
                                                label="Address"

                                            />
                                        </FormGroup>


                                        <FormGroup row sx={{ width: 'inherit', flexWrap: 'nowrap' }}>

                                            <TextField
                                                onChange={handleHouseNo}
                                                value={"" || houseNo}
                                                fullWidth
                                                size='small'
                                                // onChange={handleUpdatedNameChange}
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        fontSize: '14px',
                                                        color: "black",
                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'
                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="House/Flat no. "

                                            />
                                            <TextField
                                                onChange={handlePincode}
                                                value={pinCode || ""}
                                                fullWidth
                                                size='small'
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'
                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="Pin Code"

                                            />

                                        </FormGroup>






                                        <FormGroup row sx={{ width: 'inherit', flexWrap: 'nowrap' }}>
                                            <TextField
                                                onChange={handleCountry}
                                                value={country || ""}
                                                fullWidth
                                                size='small'
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'
                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="Country"

                                            />
                                            <TextField
                                                onChange={handleState}
                                                value={"" || state}
                                                fullWidth
                                                size='small'
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'
                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="State"

                                            />

                                        </FormGroup>

                                        <FormGroup row sx={{ width: 'inherit', flexWrap: 'nowrap' }}>
                                            <TextField
                                                onChange={handleCity}
                                                value={"" || city}
                                                fullWidth
                                                size='small'
                                                // onChange={handleUpdatedNameChange}
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'
                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="City"

                                            />
                                            <TextField
                                                onChange={handleMob}
                                                InputProps={{
                                                    sx: {
                                                        flexDirection: 'row-reverse'
                                                    },
                                                    endAdornment:
                                                        mobNo?.length > 0 ? <InputAdornment sx={{ marginTop: '1px', ml: '12px', }} position='start'>

                                                            {<Typography sx={{ mr: '-15px', }}>
                                                                +91
                                                            </Typography>}
                                                        </InputAdornment> : <></>
                                                }}
                                                value={"" || mobNo}
                                                fullWidth
                                                size='small'
                                                // onChange={handleUpdatedNameChange}
                                                sx={{


                                                    "& .MuiInputLabel-outlined": {
                                                        color: "black",
                                                        fontSize: '14px',

                                                        "&.MuiInputLabel-shrink": {
                                                            color: "orange"
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            "borderColor": "orange"
                                                        }
                                                    },
                                                    margin: '10px'
                                                }}
                                                // fullWidth
                                                required
                                                id="outlined-required"
                                                label="Mobile No."

                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControlLabel sx={{ marginInline: '0px' }} control={<Checkbox color='success' sx={{}} defaultChecked />} label="Save address for future use" />
                                        </FormGroup>

                                    </FormControl>
                                </Box>

                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{
                    width: {
                        xs: 'fit-content',
                        sm: 'fit-content',
                        md: '30vw'
                    },
                    margin: '10px'
                }}>
                    {
                        // isLoading ?
                        //     <LinearProgress /> :
                        <Card variant='outlined'>
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <List sx={{
                                    padding: '0px',
                                    height: {
                                        xs: cart?.cartItems?.length > 2 ? ' 30vh' : 'fit-content !important',
                                        sm: cart?.cartItems?.length > 2 ? ' 30vh' : 'fit-content !important',
                                        md: cart?.cartItems?.length > 4 ? ' 35vh' : 'fit-content !important',
                                    },
                                    overflow: 'auto'
                                }}>




                                    {
                                        cart ?
                                            cart?.cartItems?.map((item, i) => {
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
                                                                            xs: '50px',
                                                                            sm: '50px',
                                                                            md: '50px'
                                                                        }, width: {
                                                                            xs: '50px',
                                                                            sm: '50px',
                                                                            md: '50px'
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
                                                                        <Box sx={{ marginInline: '8px', border: '0px solid #8080806e', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>

                                                                            <Box sx={{ minWidth: '80px', padding: '0px', display: 'flex', alignItems: 'center' }}>
                                                                                <Typography sx={{ fontWeight: '', color: '#000000bf ', fontSize: '13px' }} >{`₹ ${item?.cartItemPrice}`}</Typography>

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
                                                                        fontSize: '13px',
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
                                                                        fontSize: '12px',
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
                                                                    <Typography sx={{ fontWeight: 'bold', color: '#000000a3', fontSize: '13px' }} >{`₹ ${item?.cartItemPrice}`}</Typography>

                                                                </Box>

                                                            </Box>



                                                        </Box>



                                                    </Box>}
                                                    {i === cart?.cartItems?.length - 1 ? <></> : <Divider></Divider>}
                                                </Box>
                                            })
                                            : <Box height={"30vh"}></Box>
                                    }
                                </List >
                            </Collapse>

                            <Box>
                                <Card variant='' sx={{ width: 'inherit', marginBottom: '0px' }}>
                                    <CardContent>

                                        <Divider sx={{ marginBlock: '0px' }}></Divider>

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


                                <Button
                                    // onClick={handleProceedToCheckout}
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
                                            fontSize: '22px',
                                        }
                                    }}>
                                    Proceed to Payment
                                </Button>

                                {/* <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '14px' }} >Shipping charges will calculated at checkout</Typography> */}
                            </Box>
                        </Card>
                    }
                </Box>

            </Box>

        </Box >
    )
}

export default Checkout
