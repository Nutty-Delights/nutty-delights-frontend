import { Autocomplete, Avatar, Box, Breadcrumbs, Button, Card, CardContent, Checkbox, CircularProgress, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Tooltip, Typography, tooltipClasses, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getCartLoading, getUserCart } from '../../redux/slices/cart';
import { getUser, getUserProfile, setOpenEmail } from '../../redux/slices/user';
import Contact from '@mui/icons-material/PersonOutlineOutlined';
import Address from '@mui/icons-material/AddHomeOutlined';
// import http from '../../http-common'
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { createOrder, getCreatedOrder, getOrderError, getOrderLoading } from '../../redux/slices/order';
import { LoadingButton } from '@mui/lab';
import { createPaymentLink, getPaymentError, getPaymentLoading } from '../../redux/slices/payment';
import Image from 'mui-image';
import Razorpay from '../../assets/images/razorpay.svg';
import UPI from '../../assets/images/UPI.png';
import Visa from '../../assets/images/VisaAndMasterCard.png';
import PayMethods from '../../assets/images/pay_methods_branding.png';
import Simpl from '../../assets/images/Simpl.png';
import { ErrorOutline, FlashOffOutlined, LocalDining, LockOutlined, WarningOutlined, WarningRounded } from '@mui/icons-material';
import { styled } from '@mui/material/styles';




const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "grey",
        color: 'white',
        boxShadow: theme.shadows[3],
        fontSize: 12,
    },
}));

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
    const [isFetching, setFetching] = useState(false);
    const [showFirstNameError, setFirstNameError] = useState(false);
    const [showLastNameError, setLastNameError] = useState(false);
    const [showMobileError, setMobileError] = useState(false);
    const [showAddressError, setAddressError] = useState(false);
    const [showPinCodeError, setPinCodeError] = useState(false);
    const [showCityError, setCityError] = useState(false);
    const [showStateError, setStateError] = useState(false);
    const [showCountryError, setCountryError] = useState(false);
    const [globalError, setGlobalError] = useState(false);


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
            setShippingCharge(50)
        }
        // setHelperText(' ');
        // setError(false);
    };



    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        if (e.target.value !== '') {
            setFirstNameError(false);
        }
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
        if (e.target.value !== '') {
            setLastNameError(false);
        }
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
        if (e.target.value !== '') {
            setAddressError(false);
        }
    }
    const handleHouseNo = (e) => {
        setHouseNo(e.target.value);
    }
    console.log(isFetching)
    const handlePincode = (e) => {

        if (e.target.value.length <= 6) {
            setPinCode(e.target.value);
            if (e.target.value?.length > 5) {

                getPincode(e.target.value);
                if (e.target.value?.length === 6) {
                    setPinCodeError(false);
                }
                // setFetching(false);
            }

            else {
                setCountry('');
                setCity('')
                setState('')
            }
        }
    }
    const handleCountry = (e) => {
        setCountry(e.target.value);
        if (e.target.value !== '') {
            setCountryError(false);
        }
    }
    const handleCity = (e) => {
        setCity(e.target.value);
        if (e.target.value !== '') {
            setCityError(false);
        }
    }
    const handleState = (e) => {
        setState(e.target.value);
        if (e.target.value !== '') {
            setStateError(false);
        }
    }
    const handleMob = (e) => {
        let c = e.target.value?.[0]
        if (c === '+' || c === '0') {

            if (c === '+') {
                c = '+91';
                setMobNo(e.target.value?.split(c)[1]);
                if (e.target.value?.length === 13) {
                    setMobileError(false);
                }
            }

            else {
                if (c === '0') {
                    setMobNo(e.target.value?.substring(1, e.target.value?.length));
                    if (e.target.value?.length === 11) {
                        setMobileError(false);
                    }

                }
            }






        }

        else {
            setMobNo(e.target.value);
            if (e.target.value?.length === 10) {
                setMobileError(false);
            }

        }


    }



    const handleShipping = () => {

        if (
            firstName === '' ||
            firstName === undefined ||
            state === '' ||
            state === undefined ||
            city === '' ||
            city === undefined ||
            country === '' ||
            country === undefined ||
            lastName === '' ||
            lastName === undefined ||
            address === '' ||
            address === undefined ||
            mobNo === "" ||
            mobNo === undefined ||
            mobNo.length !== 10 ||
            pinCode === '' ||
            pinCode === undefined ||
            pinCode.length !== 6
        ) {

            console.log("Error in one of the field");
            setFirstNameError((firstName === '' || firstName === undefined));
            setLastNameError((lastName === '' || lastName === undefined));
            setAddressError((address === '' || address === undefined));
            setCityError((city === '' || city === undefined));
            setStateError((state === '' || state === undefined));
            setCountryError((country === '' || country === undefined));
            setMobileError((mobNo === "" || mobNo === undefined || mobNo.length !== 10))
            setPinCodeError((pinCode === undefined || pinCode.length !== 6))
            setGlobalError(true);



        }

        else {
            if (firstName !== '' && lastName !== "" && mobNo.length === 10 && address !== "" && pinCode.length === 6 && city !== "" && state !== "" && country !== "") {
                if (user?.isEnabled) {
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
                    setGlobalError(false);

                    window.scrollTo(0, 0);
                }

                else {
                    dispatch(setOpenEmail({ open: true }));
                }
            }

            else {
                console.log("not working")
            }
        }


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
        setFetching(true);
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
            setFetching(false);
            console.log("PinCode Data", res.data?.[0])
            if (res.data?.[0].Status === "Error") {
                console.log("Inside here")
                setPinCodeError(true)
                setCityError(true);
                setCountryError(true);
                setStateError(true);
            }
            else {
                setPinCodeError(false)
                setCityError(false);
                setCountryError(false);
                setStateError(false);
            }
            // console.log("data_1: ", data[0].PostOffice[0].District + " " + data[0].PostOffice[0].State, data[0].PostOffice[0].Country)


        }).catch(e => {
            console.log(e);
            setFetching(false);
            setPinCodeError(true)
            setCityError(true);
            setCountryError(true);
            setStateError(true);
        });



    }


    useEffect(() => {


        if (token)
            dispatch(getUserProfile());
        // if (shippingAddress === '') {
        //     setStep(0);
        // }
        setStep(0);
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
        <NavLink onClick={() => {
            if (step === 2) {
                setStep(1)
            }
        }} style={{ textDecoration: 'none', color: step === 1 ? 'orange' : 'grey', fontWeight: step === 1 ? 'bold' : 'normal' }} >
            Order Review
        </NavLink>,
        <NavLink onClick={() => { }} style={{ textDecoration: 'none', color: step === 2 ? 'orange' : 'grey', fontWeight: step === 2 ? 'bold' : 'normal' }} >
            Payments
        </NavLink>,

    ];

    const steps = ['Shipping and addresses', 'Payments options',];


    return (
        <Box>
            <Divider sx={{ margin: '5px' }}></Divider>
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
                                sm: '98%',
                                md: '50vw'
                            },
                            margin: '10px'
                        }}>
                        <Card sx={{
                            height: '100%',
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
                        <Card sx={{}} variant='outlined'>
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
                                                margin: '10px',
                                                gap: '10px',
                                                display: {
                                                    xs: 'block',
                                                    sm: 'block',
                                                    md: 'flex'
                                                }
                                            }}>
                                                <Typography sx={{ color: 'orange', fontWeight: 'bold' }}>{user?.firstName + " " + user?.lastName + " "}</Typography>
                                                {/* <Typography sx={{ color: 'orange' }}>
                                                {user?.firstName + " " + user?.lastName + " "}
                                            </Typography> */}
                                                {
                                                    user?.isEnabled ? <Typography>{"(" + user?.email + ")"}</Typography> :

                                                        <Typography onClick={
                                                            () => {
                                                                console.log("on lick")
                                                                dispatch(setOpenEmail({
                                                                    open: true
                                                                }))
                                                            }
                                                        } sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'orange', fontSize: '15px' }}>{" Verify Your Email "}</Typography>

                                                }

                                            </Box> :

                                                <Typography>Already have an account? <Typography sx={{ color: 'orange' }}>Log In</Typography></Typography>

                                        }
                                    </Box>
                                    <Box marginLeft={'15px'}>
                                        {
                                            globalError ? <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{"Fill all the *required fields"}</Typography> :
                                                <></>
                                        }
                                    </Box>
                                    <Box sx={{ padding: '5px' }}>
                                        {/* <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{"Update Product"}</Typography> */}
                                        <Box sx={{ gap: '10px', }}>
                                            <FormControl sx={{ width: '100%' }}>
                                                <FormGroup row sx={{
                                                    width: 'inherit', flexWrap: {
                                                        xs: 'wrap',
                                                        sm: 'nowrap',
                                                        md: 'nowrap'
                                                    }
                                                }}>
                                                    <TextField
                                                        error={showFirstNameError}
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
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="first-name"
                                                        label="First Name"
                                                    />
                                                    <TextField
                                                        error={showLastNameError}
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
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="last-name"
                                                        label="Last Name"

                                                    />
                                                    <TextField
                                                        // helperText={mobNo.length !== 10 && mobNo.length > 0 ? "Incorrect entry." : ""}
                                                        // error={mobNo.length !== 10 && mobNo.length > 0 ? true : false}
                                                        error={showMobileError}
                                                        onChange={handleMob}
                                                        InputProps={{
                                                            sx: {
                                                                flexDirection: 'row-reverse'
                                                            },
                                                            // startAdornment: mobNo?.length !== 10 && mobNo?.length > 0 ? <InputAdornment sx={{ marginTop: '1px', }} position='end'>

                                                            //     {<LightTooltip title={"Mobile number should be of 10 digits"}>
                                                            //         <ErrorOutline sx={{ cursor: 'pointer', mr: '-8px', fontSize: '20px', color: 'red' }} />
                                                            //     </LightTooltip>}
                                                            // </InputAdornment> : <></>,
                                                            endAdornment:
                                                                mobNo?.length > 0 ? <InputAdornment sx={{ marginTop: '1px', ml: '12px', }} position='start'>

                                                                    {<Typography sx={{ mr: '-8px', }}>
                                                                        +91
                                                                    </Typography>}
                                                                </InputAdornment> : <></>
                                                        }}
                                                        value={mobNo || ""}
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
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="mobile-number"
                                                        label="Mobile No."
                                                    // error={mobNo?.length !== 10}

                                                    />


                                                </FormGroup>
                                                <FormGroup row sx={{
                                                    width: 'inherit', flexWrap: {
                                                        xs: 'wrap',
                                                        sm: 'nowrap',
                                                        md: 'nowrap'
                                                    }
                                                }}>
                                                    {/* <TextField

                                                    onChange={handleHouseNo}
                                                    value={"" || houseNo}
                                                    fullWidth
                                                    size='small'
                                                    // onChange={handleUpdatedNameChange}
                                                    sx={{

                                                        width: '30%',
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

                                                /> */}
                                                    <TextField
                                                        error={showAddressError}
                                                        onChange={handleAddress}
                                                        value={address || ""}
                                                        size='small'
                                                        // onChange={handleUpdatedImageChange}
                                                        sx={{

                                                            width: {
                                                                xs: '100%',
                                                                md: '85%'
                                                            },
                                                            "& .MuiInputLabel-outlined": {
                                                                color: "black",
                                                                fontSize: '14px',

                                                                "&.MuiInputLabel-shrink": {
                                                                    color: "orange"
                                                                },
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="address"
                                                        label="Address"

                                                    />
                                                    <TextField
                                                        error={showPinCodeError}
                                                        InputProps={{
                                                            sx: {
                                                                // flexDirection: 'row-reverse'
                                                            },
                                                            endAdornment:
                                                                isFetching ? <InputAdornment sx={{ marginTop: '1px', ml: '12px', }} position='start'>

                                                                    {<CircularProgress sx={{ color: 'orange', padding: '10px' }}></CircularProgress>}
                                                                </InputAdornment> : pinCode.length !== 6 && pinCode.length > 0 ?
                                                                    <InputAdornment sx={{ marginTop: '1px', ml: '12px', }} position='start'>

                                                                        {<LightTooltip title={"Pin code should be of 6 digits"}>
                                                                            <ErrorOutline sx={{ cursor: 'pointer', mr: '-8px', fontSize: '20px', color: 'red' }} />
                                                                        </LightTooltip>}
                                                                    </InputAdornment> : <></>
                                                        }}
                                                        onChange={handlePincode}
                                                        value={pinCode || ""}
                                                        fullWidth
                                                        size='small'
                                                        sx={{

                                                            display: {
                                                                xs: 'none',
                                                                sm: 'flex',
                                                                md: 'flex'
                                                            },
                                                            width: {
                                                                xs: '100%',
                                                                md: '40%'
                                                            },
                                                            "& .MuiInputLabel-outlined": {
                                                                color: "black",
                                                                fontSize: '14px',

                                                                "&.MuiInputLabel-shrink": {
                                                                    color: "orange"
                                                                },
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="pincode"
                                                        label="Pin Code"

                                                    />
                                                </FormGroup>








                                                <FormGroup row sx={{
                                                    width: 'inherit', flexWrap: {
                                                        xs: 'wrap',
                                                        sm: 'nowrap',
                                                        md: 'nowrap'
                                                    }
                                                }}>
                                                    <TextField
                                                        error={showPinCodeError}
                                                        onChange={handlePincode}
                                                        value={pinCode || ""}
                                                        fullWidth
                                                        size='small'
                                                        sx={{

                                                            display: {
                                                                xs: 'flex',
                                                                sm: 'none',
                                                                md: 'none'
                                                            },
                                                            width: {
                                                                xs: '43%',
                                                                md: '40%'
                                                            },
                                                            "& .MuiInputLabel-outlined": {
                                                                color: "black",
                                                                fontSize: '14px',

                                                                "&.MuiInputLabel-shrink": {
                                                                    color: "orange"
                                                                },
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="pincode"
                                                        label="Pin Code"

                                                    />
                                                    <TextField
                                                        // disabled
                                                        error={showCountryError}
                                                        onChange={handleCountry}
                                                        value={country || ""}
                                                        fullWidth
                                                        size='small'
                                                        sx={{
                                                            width: {
                                                                xs: '43%',
                                                                md: '40%'
                                                            },

                                                            "& .MuiInputLabel-outlined": {
                                                                color: "black",
                                                                fontSize: '14px',

                                                                "&.MuiInputLabel-shrink": {
                                                                    color: "orange"
                                                                },
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="country"
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
                                                        // disabled
                                                        error={showStateError}
                                                        onChange={handleState}
                                                        value={state || ""}
                                                        fullWidth
                                                        size='small'
                                                        sx={{
                                                            width: {
                                                                xs: '43%',
                                                                md: '40%'
                                                            },

                                                            "& .MuiInputLabel-outlined": {
                                                                color: "black",
                                                                fontSize: '14px',

                                                                "&.MuiInputLabel-shrink": {
                                                                    color: "orange"
                                                                },
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="state"
                                                        label="State"

                                                    />
                                                    <TextField
                                                        // disabled={pinCode}
                                                        error={showCityError}
                                                        onChange={handleCity}
                                                        value={city || ""}
                                                        fullWidth
                                                        size='small'
                                                        // onChange={handleUpdatedNameChange}
                                                        sx={{

                                                            width: {
                                                                xs: '43%',
                                                                md: '40%'
                                                            },
                                                            "& .MuiInputLabel-outlined": {
                                                                color: "black",
                                                                fontSize: '14px',

                                                                "&.MuiInputLabel-shrink": {
                                                                    color: "orange"
                                                                },
                                                                "&.MuiInputLabel-root.Mui-error": {
                                                                    color: "#d32f2f !important"
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
                                                        id="city"
                                                        label="City"

                                                    />

                                                </FormGroup>

                                                <FormGroup row sx={{ width: 'inherit', flexWrap: 'nowrap' }}>


                                                </FormGroup>
                                                <FormGroup sx={{ width: 'fit-content' }}>
                                                    <FormControlLabel sx={{ marginInline: '0px' }} control={<Checkbox color='success' sx={{}} defaultChecked />} label="Save address for future use" />
                                                </FormGroup>

                                            </FormControl>
                                        </Box>

                                    </Box>
                                    {

                                        <LoadingButton
                                            // loading={isLoading}
                                            onClick={handleShipping}
                                            fullWidth
                                            variant='contained'
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontWeight: 'bold',
                                                background: 'orange',
                                                color: 'white',
                                                fontSize: '18px',
                                                ':hover': {
                                                    background: 'orange',
                                                    color: 'white',
                                                    fontSize: '18px',
                                                }
                                            }}>
                                            {"Proceed"}
                                            {/* {
                                    user?.isEnabled ? <></> :
                                        <Typography sx={{ marginBlock: '5px', fontWeight: 'bold', color: 'white', fontSize: '12px', marginInline: '10px', }} >{`(Verify Your email to proceed)`}</Typography>

                                } */}
                                        </LoadingButton>


                                    }

                                </CardContent> :
                                step === 1 ?
                                    <CardContent sx={{ padding: '24px' }}>
                                        <Card variant='outlined' sx={{ marginBottom: '20px' }}>
                                            <CardContent>
                                                <Box gap={"25px"} display={"flex"}>
                                                    <Typography sx={{ fontWeight: 'bold', minWidth: '55px' }} >Contact</Typography>
                                                    <Typography sx={{ fontSize: "14px" }}>{`${firstName} ${lastName}, ${user?.email}, ${mobNo}`}</Typography>
                                                </Box>
                                                <Divider sx={{ marginBlock: '10px' }}></Divider>
                                                <Box gap={"25px"} display={"flex"}>
                                                    <Typography sx={{ fontWeight: 'bold', minWidth: '55px' }}>Ship to</Typography>
                                                    <Typography sx={{ fontSize: "14px" }}>{shippingAddress}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                        {

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
                                                    fontSize: '18px',
                                                    ':hover': {
                                                        background: 'orange',
                                                        color: 'white',
                                                        fontSize: '18px',
                                                    }
                                                }}>
                                                {"Proceed"}
                                            </LoadingButton>


                                        }
                                    </CardContent> :

                                    <CardContent>
                                        <Card variant='outlined' sx={{ marginBottom: '20px' }}>
                                            <CardContent>
                                                <Box gap={"25px"} display={"flex"}>
                                                    <Typography sx={{ fontWeight: 'bold', minWidth: '60px' }} >Contact</Typography>
                                                    <Typography sx={{ fontSize: "14px" }}>{`${firstName} ${lastName}, ${user?.email}, ${mobNo}`}</Typography>
                                                </Box>
                                                <Divider sx={{ marginBlock: '10px' }}></Divider>
                                                <Box gap={"25px"} display={"flex"}>
                                                    <Typography sx={{ fontWeight: 'bold', minWidth: '60px' }}>Ship to</Typography>
                                                    <Typography sx={{ fontSize: "14px" }}>{shippingAddress}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                        <Divider sx={{ marginBottom: '10px' }}></Divider>
                                        <Box display={{
                                            xs: 'flex',
                                            md: 'flex'
                                        }} sx={{ margin: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography sx={{ fontSize: '17px', fontWeight: 'bold', marginBottom: { xs: '10px', md: '0px' } }}>Payment Method</Typography>
                                            <Box gap={'0px'} display={{
                                                md: 'flex',
                                            }} alignItems={{
                                                md: 'center'
                                            }} >
                                                <LockOutlined sx={{ color: 'grey', fontSize: '18px' }} />
                                                <Typography sx={{ marginRight: '10px', marginLeft: '5px', fontSize: '14px', fontWeight: 'bold', color: 'grey', marginBottom: { xs: '10px', md: '0px' } }}>Secured By</Typography>

                                                <img referrerpolicy="origin" src={Razorpay} style={{ height: '23px', width: '118px' }} alt="Razorpay | Payment Gateway | Neobank"></img>
                                            </Box>


                                        </Box>
                                        <Card variant=''>
                                            <CardContent sx={{
                                                marginBlock: '10px',
                                                paddingBlock: '0px', paddingInline: {
                                                    // xs: '0px',

                                                }
                                            }}>

                                                <form >
                                                    <FormControl sx={{ m: 0 }} variant="standard">
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
                                                            <FormControlLabel sx={{ alignItems: 'start' }} value="prepaid" control={
                                                                <Radio
                                                                    size='small'

                                                                    sx={{
                                                                        marginBottom: '10px',
                                                                        '&, &.Mui-checked': {
                                                                            color: 'orange',
                                                                        },
                                                                    }} />
                                                            } label={<Box marginBottom={'10px'} display={
                                                                {
                                                                    xs: 'block',
                                                                    md: 'block'
                                                                }
                                                            }>
                                                                <Typography sx={{ fontSize: '16px', marginBlock: '8px', fontWeight: shippingMethod === "cod" ? 'normal' : 'bold' }}>{"Prepaid - UPI, Debit/Credit Card, Net-Banking, Paylater"}</Typography>
                                                                {/* <Image width={110} src={Razorpay} duration={0} shiftDuration={0} alt='razorpay' ></Image> */}
                                                                {/* <img referrerpolicy="origin" src="https://badges.razorpay.com/badge-light.png " style={{ height: '45px', width: '113px' }} alt="Razorpay | Payment Gateway | Neobank"></img> */}
                                                                <Box display={{
                                                                    xs: 'flex',
                                                                    md: 'flex'
                                                                }} sx={{ flexWrap: 'wrap', marginBlock: '15px' }}>
                                                                    <Box sx={{ padding: '2px', marginRight: '15px' }}>
                                                                        {/* <Image height={21} width={78} src={UPI} duration={0} shiftDuration={0} alt='upi' ></Image> */}
                                                                        <Image src={PayMethods} duration={0} shiftDuration={0} alt='upi' ></Image>
                                                                    </Box>
                                                                    {/* <Box sx={{ padding: '2px', marginRight: '15px' }}>
                                                                    <Image height={28} width={85} src={Simpl} duration={0} shiftDuration={0} alt='visa' ></Image>

                                                                </Box> */}

                                                                    {/* <Image height={29} width={145} src={Visa} duration={0} shiftDuration={0} alt='visa' ></Image> */}
                                                                </Box>
                                                                {/* <Image width={110} src={Visa} duration={0} shiftDuration={0} alt='Visa' ></Image> */}
                                                                {/* <Image width={110} src={Mastercard} duration={0} shiftDuration={0} alt='mastercard' ></Image> */}

                                                            </Box>} />

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
                                                                <Typography sx={{ fontSize: '16px', fontWeight: shippingMethod !== "cod" ? 'normal' : 'bold' }}>{"Pay on delivery"}</Typography>
                                                                {/* <Typography sx={{ fontSize: '15px' }}>{"( Shipping charge : ₹ 50 )"}</Typography> */}
                                                            </Box>} />
                                                        </RadioGroup>
                                                        {/* <FormHelperText>{"45"}</FormHelperText> */}

                                                    </FormControl>
                                                </form>
                                            </CardContent>
                                            {



                                            }
                                        </Card>
                                        <LoadingButton
                                            disableElevation={false}
                                            onClick={handleProceedToPayment}
                                            loading={paymentLoading}
                                            fullWidth
                                            variant='contained'
                                            sx={{
                                                fontWeight: 'bold',
                                                background: 'orange',
                                                color: 'white',
                                                fontSize: '18px',
                                                ':hover': {
                                                    background: 'orange',
                                                    color: 'white',
                                                    fontSize: '18px',
                                                }
                                            }}>
                                            {paymentLoading ? 'Redirecting...' : "Proceed to Payment"}

                                        </LoadingButton>
                                    </CardContent>
                            }
                        </Card>
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
                            <Card sx={{ marginBottom: "10px", height: '100%' }} variant='outlined'>
                                <Typography sx={{ fontSize: '22px', fontWeight: '', margin: '15px', }}>Cart Summary</Typography>
                                <Divider sx={{ marginBlock: '10px' }}></Divider>
                                <Collapse in={true} timeout="auto" unmountOnExit>
                                    {
                                        cart ? <List sx={{
                                            padding: '0px',
                                            height: {
                                                xs: cart?.cartItems?.length > 2 ? ' 30vh' : 'fit-content !important',
                                                sm: cart?.cartItems?.length > 2 ? ' 30vh' : 'fit-content !important',
                                                md: cart?.cartItems?.length > 3 ? ' 35vh' : 'fit-content !important',
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
                                        </List > : <></>
                                    }
                                </Collapse>

                                <Box>
                                    <Card variant='' sx={{ width: 'inherit', marginBottom: '0px' }}>
                                        {
                                            cart ? <CardContent>

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
                                                            {/* <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >(Excluding shipping charges)</Typography> */}

                                                            <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >{`${step === 1 ? " (Shipping charges to be calculated on next step)" : step === 0 ? '(Excluding shipping charges)' : "Including shipping charges : ₹50"}`}</Typography>
                                                            <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >{`  ${step === 2 ? shippingMethod === 'cod' ? 'Pay On Delivery' : 'Prepaid Delivery' : ""}`}</Typography>

                                                        </Box>
                                                        <Box>
                                                            {/* <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 100 / 105)}`}</Typography>
                                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 5 / 105)}`}</Typography> */}
                                                            <Typography sx={{ color: 'orange', fontSize: '16px', fontWeight: 'bold', marginInline: '10px', marginTop: '10px' }}>{`₹ ${cart?.cartTotalPrice + shippingCharge}`}</Typography>
                                                        </Box>
                                                    </Box>


                                                </Box>
                                            </CardContent> : <></>
                                        }
                                    </Card>



                                    {/* <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '14px' }} >Shipping charges will calculated at checkout</Typography> */}
                                </Box>
                            </Card>

                        }



                    </Box>

                </Box >

            </Box >
        </Box>

    )
}

export default Checkout
