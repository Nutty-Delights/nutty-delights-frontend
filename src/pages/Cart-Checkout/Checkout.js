import { Autocomplete, Avatar, Box, Breadcrumbs, Button, Card, CardContent, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputAdornment, InputLabel, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography, } from '@mui/material'
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
import { Country, State, City } from 'country-state-city';
import { createOrder, getCreatedOrder, getOrderError, getOrderLoading } from '../../redux/slices/order';
import { LoadingButton } from '@mui/lab';
import { createPaymentLink, getPaymentError, getPaymentLoading } from '../../redux/slices/payment';





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
    const [shippingMethod, setShippingMethod] = React.useState('prepaid');
    const [shippingCharge, setShippingCharge] = useState(0);
    const [shippingAddress, setShippingAddress] = useState("");
    const [data, setData] = useState();
    const createdOrderLoading = useSelector(getOrderLoading);
    const paymentLoading = useSelector(getPaymentLoading);
    const createdOrderError = useSelector(getOrderError);
    const paymentError = useSelector(getPaymentError);
    const order = useSelector(getCreatedOrder);


    // useEffect(() => {
    //     setStep(0);
    // }, [])

    useEffect(() => {
        if (order?.orderId === null)
            setStep(2)
    }, [order])
    const handleShippingMethod = (event) => {
        setShippingMethod(event.target.value);

        if (event.target.value === 'cod')
            setShippingCharge(50)

        else {
            setShippingCharge(0)
        }
        // setHelperText(' ');
        // setError(false);
    };



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
        if (e.target.value?.length > 5) {
            getPincode(e.target.value);
        }
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



    const handleShipping = () => {
        const data = {
            userId: localStorage.getItem("jwt"),
            firstName: firstName,
            lastName: lastName,
            addressLine: address,
            houseNo: houseNo,
            pinCode: pinCode,
            country: country,
            state: state,
            city: city,
            mobileNumber: mobNo
        }

        let houseNumber = houseNo ? houseNo + ", " : "";
        let deliveryAddress = houseNumber + address + ", " + pinCode + ", " + city + ", " + state + ", " + country;
        console.log(deliveryAddress);
        setData(data);
        setShippingAddress(deliveryAddress)
        // console.log("Shipping Details", data);
        setStep(1);
        window.scrollTo(0, 0);
    }

    console.log("Order", order);


    const handleCreateOrder = () => {
        dispatch(createOrder(data));

        // if (createdOrderLoading === false)
        //     setStep(2);
    }

    const handleProceedToPayment = () => {
        //creating the order
        // handleCreateOrder();

        dispatch(createPaymentLink(order?.id));

        if (paymentLoading)
            setStep(0);


    }




    const getPincode = async (pincode) => {
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
        axios.get("https://api.postalpincode.in/pincode/" + pincode).then(res => {
            var data = res.data;
            setCountry(data?.[0]?.PostOffice?.[0]?.Country || "");
            setCity(data?.[0]?.PostOffice?.[0]?.District || "");
            setState(data?.[0]?.PostOffice?.[0]?.State || "");
            // console.log("data_1: ", data[0].PostOffice[0].District + " " + data[0].PostOffice[0].State, data[0].PostOffice[0].Country)


        }).catch();



    }


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
        console.log('country', Country.getAllCountries("india"))
    }, [])



    const breadcrumbs = [
        // <NavLink style={{ textDecoration: 'none', color: 'grey' }} >
        //     Cart
        // </NavLink>,
        <NavLink onClick={() => { setStep(0) }} style={{ textDecoration: 'none', color: step === 0 ? 'orange' : 'grey', fontWeight: step === 0 ? 'bold' : 'normal' }} >
            Shipping and addresses
        </NavLink>,

        // <NavLink style={{ textDecoration: 'none', color: step === 1 ? 'orange' : 'grey', fontWeight: step === 1 ? 'bold' : 'normal' }} >
        //     Shipping
        // </NavLink>,
        <NavLink onClick={() => { setStep(1) }} style={{ textDecoration: 'none', color: step === 1 ? 'orange' : 'grey', fontWeight: step === 1 ? 'bold' : 'normal' }} >
            Order Review
        </NavLink>,
        <NavLink onClick={() => { setStep(2) }} style={{ textDecoration: 'none', color: step === 2 ? 'orange' : 'grey', fontWeight: step === 2 ? 'bold' : 'normal' }} >
            Payments
        </NavLink>,

    ];

    const steps = ['Shipping and addresses', 'Payments options',];


    return (
        <Box sx={{ padding: '8px' }}>


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
                        gap: '10px',
                        width: {
                            xs: 'fit-content',
                            sm: 'fit-content',
                            md: '50vw'
                        },
                        margin: '10px'
                    }}>
                    <Card sx={{
                        marginBottom: '10px', display: {
                            xs: 'block',
                            sm: 'block',
                            md: 'none'
                        }
                    }} variant='outlined'>
                        <CardContent>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Taxes ( GST )`}</Typography> */}
                                        <Typography sx={{ fontSize: '17px', fontWeight: '', marginInline: '10px', marginTop: '0px' }}>{`Total (${cart?.cartTotalItems} items)`}</Typography>
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
                    <Card variant='outlined'>
                        <Breadcrumbs
                            sx={{ marginInline: '30px', marginBottom: '0px', marginTop: '20px' }}
                            separator={<NavigateNextIcon sx={{ color: 'grey' }} fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>

                        {step === 0 ?
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
                                        <Address sx={{
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
                                        }}>Shipping Details</Typography>
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
                                                    // required
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
                                                {/* <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={Country.getAllCountries("IN").name}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Country" />}
                                            /> */}
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
                            </CardContent> :
                            step === 1 ?
                                <CardContent sx={{ padding: '24px' }}>
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <Box gap={"25px"} display={"flex"}>
                                                <Typography sx={{ fontWeight: 'bold', minWidth: '55px' }} >Contact</Typography>
                                                <Typography sx={{ fontSize: "14px" }}>{`${user?.firstName} ${user?.lastName}, ${user?.email}, ${user?.mobileNumber}`}</Typography>
                                            </Box>
                                            <Divider sx={{ marginBlock: '10px' }}></Divider>
                                            <Box gap={"25px"} display={"flex"}>
                                                <Typography sx={{ fontWeight: 'bold', minWidth: '55px' }}>Ship to</Typography>
                                                <Typography sx={{ fontSize: "14px" }}>{shippingAddress}</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>

                                </CardContent> :

                                <CardContent>
                                    <Box sx={{ margin: '10px' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Shipping Method</Typography>

                                    </Box>
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <form >
                                                <FormControl sx={{ m: 1 }} variant="standard">
                                                    {/* <FormLabel id="demo-error-radios">Pop quiz: MUI is...</FormLabel> */}
                                                    <RadioGroup
                                                        sx={{
                                                            '&, &.Mui-checked': {
                                                                // color: 'magenta',
                                                                fontSize: '14px'
                                                            },
                                                        }}
                                                        aria-labelledby="demo-error-radios"
                                                        name="quiz"
                                                        value={shippingMethod}
                                                        onChange={handleShippingMethod}
                                                    >
                                                        <FormControlLabel value="prepaid" control={
                                                            <Radio
                                                                size='small'

                                                                sx={{
                                                                    '&, &.Mui-checked': {
                                                                        color: 'orange',
                                                                    },
                                                                }} />
                                                        } label={<Typography sx={{ fontSize: '15px' }}>{"Prepaid - Net banking, UPI, Debit/Credit Card"}</Typography>} />

                                                        <FormControlLabel value="cod" control={
                                                            <Radio
                                                                size='small'
                                                                sx={{
                                                                    '&, &.Mui-checked': {
                                                                        color: 'orange',
                                                                        fontSize: '14px'
                                                                    },
                                                                }} />
                                                        } label={<Box
                                                            gap={"20px"}
                                                            sx={{
                                                                width: '100%',
                                                                display: 'flex',
                                                                justifyContent: 'space-between'
                                                            }}>
                                                            <Typography sx={{ fontSize: '15px' }}>{"Pay on delivery"}</Typography>
                                                            <Typography sx={{ fontSize: '15px' }}>{"( Shipping charge : ₹ 50 )"}</Typography>
                                                        </Box>} />
                                                    </RadioGroup>
                                                    {/* <FormHelperText>{"45"}</FormHelperText> */}

                                                </FormControl>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                        }
                    </Card>
                </Box>
                <Box sx={{ padding: '10px' }}>
                    {
                        step === 0 ?
                            <LoadingButton
                                // loading={createdOrderLoading}
                                disableElevation
                                onClick={handleShipping}
                                fullWidth
                                variant='contained'
                                sx={{
                                    margin: '0px',
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'none',
                                    },
                                    fontWeight: 'bold',
                                    background: 'orange',
                                    color: 'white',
                                    fontSize: '18px',
                                    ':hover': {
                                        background: 'orange',
                                        color: 'white',
                                        fontSize: '18',
                                    }
                                }}>
                                Proceed
                            </LoadingButton>
                            : step === 1 ?
                                <LoadingButton
                                    disableElevation
                                    loading={createdOrderLoading}
                                    onClick={handleCreateOrder}
                                    fullWidth
                                    variant='contained'
                                    sx={{
                                        margin: '0px',
                                        display: {
                                            xs: 'block',
                                            sm: 'block',
                                            md: 'none',
                                        },
                                        fontWeight: 'bold',
                                        background: 'orange',
                                        color: 'white',
                                        fontSize: '18px',
                                        ':hover': {
                                            background: 'orange',
                                            color: 'white',
                                            fontSize: '18',
                                        }
                                    }}>
                                    Proceed
                                </LoadingButton>
                                : <LoadingButton
                                    disableElevation
                                    loading={paymentLoading}
                                    onClick={handleProceedToPayment}
                                    fullWidth
                                    variant='contained'
                                    sx={{
                                        margin: '0px',
                                        display: {
                                            xs: 'block',
                                            sm: 'block',
                                            md: 'none',
                                        },
                                        fontWeight: 'bold',
                                        background: 'orange',
                                        color: 'white',
                                        fontSize: '18px',
                                        ':hover': {
                                            background: 'orange',
                                            color: 'white',
                                            fontSize: '18',
                                        }
                                    }}>
                                    Proceed to Payment
                                </LoadingButton>
                    }

                </Box>
                <Box

                    sx={{

                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'block'
                        },
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
                        <Card sx={{ marginBottom: "10px" }} variant='outlined'>
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
                                                <Typography sx={{ fontSize: '15px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography>
                                                <Typography sx={{ fontSize: '15px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`Taxes (GST)`}</Typography>
                                                <Typography sx={{ fontSize: '15px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`Discounts & Offers (-)`}</Typography>
                                                {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Total (incl. all taxes )`}</Typography> */}
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: '15px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{` ₹ ${Math.round(cart ? cart?.cartTotalPrice * 100 / 105 : 0)}`}</Typography>
                                                <Typography sx={{ fontSize: '15px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{` ₹ ${Math.round(cart ? cart?.cartTotalPrice * 5 / 105 : 0)}`}</Typography>
                                                <Typography sx={{ textDecoration: 'none', color: 'green', fontSize: '15px', fontWeight: '', marginInline: '10px', marginTop: '10px' }}>{`₹ ${0}`}</Typography>
                                            </Box>


                                        </Box>
                                        <Box>
                                            <Divider sx={{ marginBlock: '10px' }}></Divider>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box>
                                                    {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Taxes ( GST )`}</Typography> */}
                                                    <Typography sx={{ fontSize: '16px', fontWeight: '', marginInline: '10px', marginTop: '0px' }}>{`Total`}</Typography>
                                                    <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >{`Including shipping charges : ${shippingMethod === "cod" ? `₹50` : `free`}`}</Typography>
                                                    <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >{`${shippingMethod === 'cod' ? 'Pay On Delivery' : 'Prepaid Delivery'}`}</Typography>

                                                </Box>
                                                <Box>
                                                    {/* <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 100 / 105)}`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 5 / 105)}`}</Typography> */}
                                                    <Typography sx={{ color: 'orange', fontSize: '16px', fontWeight: 'bold', marginInline: '10px', marginTop: '10px' }}>{`₹ ${cart ? cart?.cartTotalPrice + shippingCharge : 0}`}</Typography>
                                                </Box>
                                            </Box>


                                        </Box>
                                    </CardContent>
                                </Card>



                                {/* <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '14px' }} >Shipping charges will calculated at checkout</Typography> */}
                            </Box>
                        </Card>

                    }

                    {
                        step === 0 ?
                            <LoadingButton
                                // loading={isLoading}
                                onClick={handleShipping}
                                fullWidth
                                variant='contained'
                                sx={{
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
                                {"Proceed"}
                            </LoadingButton> :

                            step === 1 ?
                                <LoadingButton
                                    loading={createdOrderLoading}
                                    // loading={isLoading}
                                    onClick={handleCreateOrder}
                                    fullWidth
                                    variant='contained'
                                    sx={{
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
                                    {"Proceed"}
                                </LoadingButton> :
                                <LoadingButton
                                    onClick={handleProceedToPayment}
                                    loading={paymentLoading}
                                    fullWidth
                                    variant='contained'
                                    sx={{
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
                                    {"Proceed to Payment"}
                                </LoadingButton>

                    }
                </Box>

            </Box>

        </Box >
    )
}

export default Checkout
