import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, AvatarGroup, Badge, Box, Card, CardContent, Chip, Divider, FormControl, FormGroup, IconButton, InputAdornment, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserProfile, logoutUser } from '../../redux/slices/user';
import { getAllOrders, getOrderLoading, getUserOrders } from '../../redux/slices/order';
import { NavLink, useNavigate } from 'react-router-dom';
import { Add, ChevronRightRounded, Edit, EditOutlined, ExpandMoreOutlined, LocationCity, LocationCityOutlined, LocationOnOutlined } from '@mui/icons-material';
import axios from 'axios';
const UserAccount = () => {


    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");
    const orders = useSelector(getAllOrders);
    const ordersLoading = useSelector(getOrderLoading);
    const navigate = useNavigate();
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

    useEffect(() => {
        // window.scrollTo(0, 0);

        if (token) {
            dispatch(getUserProfile());


        }
        if (orders.length === 0)
            dispatch(getUserOrders())

    }, [])

    const handleNavigate = (orderId) => {
        navigate(`/user/orders/${orderId}`)
    }
    return (
        <Box>
            <Divider></Divider>
            <Box sx={{
                paddingInline: '12px',
                paddingBlock: '30px',
                gap: '20px',
                display: {
                    xs: 'block',
                    sm: 'block',
                    md: 'flex'
                },
                justifyContent: 'center'
            }}>
                <Card variant='outlined' sx={{
                    width: {
                        xs: 'fit-content',
                        sm: '100%',
                        md: '40vw'
                    }, mb: '10px'
                }}>
                    <CardContent>

                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            {/* <Avatar>
                            </Avatar> */}
                            <Typography
                                sx={{ fontWeight: 'bold' }}
                            >
                                User Profile
                            </Typography>
                            <IconButton>
                                <EditOutlined sx={{ color: 'orange' }} />
                            </IconButton>

                        </Box>
                        <Divider sx={{ marginBlock: '10px' }}></Divider>
                        <Box>
                            <TextField size="small"
                                disabled
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
                                value={user?.firstName + " " + user?.lastName || ""}
                                // onChange={handleNameChange}
                                required
                                fullWidth
                                margin='dense'
                                // error={showNameError}


                                id="name" label="Name" variant="outlined"
                            />
                            <TextField size="small"
                                disabled
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
                                value={user?.email || ""}
                                // onChange={handleNameChange}
                                required
                                fullWidth
                                margin='dense'
                                // error={showNameError}


                                id="email" label="email" variant="outlined"
                            />
                            <TextField size="small"
                                disabled
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
                                value={user?.mobileNumber || ""}
                                // onChange={handleNameChange}
                                required
                                fullWidth
                                margin='dense'
                                // error={showNameError}


                                id="mobNo" label="Mobile Number" variant="outlined"
                            />

                        </Box>

                        <Accordion elevation={0} sx={{
                            width: 'inherit', ':before': {
                                top: '0px !important'
                            }
                        }}>
                            <AccordionSummary

                                sx={{ fontWeight: 'bold', paddingInline: '0px', paddingBlock: '2px', fontSize: "14px", mt: '8px', minHeight: '10px !important' }}
                                expandIcon={<Add sx={{ color: 'orange' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Saved Address</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: '0px' }} >
                                <Box sx={{ padding: '0px' }}>
                                    <Typography sx={{ marginInline: '10px', mb: "5px", fontWeight: 'bold', color: 'orange' }}>{"Add address"}</Typography>

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
                                                        margin: '6px'
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
                                                        margin: '6px'

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
                                                        margin: '6px'

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
                                                        margin: '6px'
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
                                                        margin: '6px'
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
                                                        margin: '6px'
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
                                                        margin: '6px'
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
                                                        margin: '6px'
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


                                        </FormControl>
                                    </Box>

                                </Box>
                                <Box display={'flex'} justifyContent={'end'}>
                                    <LoadingButton sx={{ fontSize: '15px', color: 'orange', fontWeight: 'bold' }}>
                                        Save
                                    </LoadingButton>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ mt: '0px' }}></Divider>
                        <List sx={{
                            // minWidth: '30vw',
                            height: {
                                // md: '40vh'
                            },
                            overflow: 'auto'
                        }}>
                            {
                                user?.address?.slice(0, 3)?.map((item, i) => {
                                    return <Box>
                                        {<Box sx={{
                                            margin: '5px',
                                            mb: '10px',

                                            alignItems: 'center',
                                            display: {
                                                xs: 'block',
                                                sm: 'block',
                                                md: 'flex'
                                            }
                                        }}>
                                            {<ListItem key={item?.productId} disablePadding >

                                                <Typography sx={{ fontSize: '13px' }}>{`${i + 1}. ${item?.firstName} ${item?.lastName}, ${item?.houseNo}, ${item?.addressLine}, ${item?.pinCode}, ${item?.city}, ${item?.state}`}</Typography>



                                            </ListItem>}







                                        </Box>
                                        }
                                        {/* {i === user?.address?.length - 1 ? <></> : <Divider sx={{ marginBlock: '6px' }} ></Divider>} */}
                                    </Box>
                                })
                            }
                        </List>





                    </CardContent>
                </Card>
                <Card sx={{
                    width: {
                        xs: '100%',
                        sm: '100%',
                        md: '45vw'
                    },
                    height: {
                        md: '69vh',
                    },
                    maxheight: {
                        md: '69vh'
                    }
                }} variant='outlined'>
                    <CardContent>
                        <Typography
                            sx={{ fontWeight: 'bold' }}
                        >
                            Recent Orders
                        </Typography>
                        <Divider sx={{ marginTop: '10px', }}></Divider>
                        <List sx={{
                            minWidth: '30vw',
                            height: {
                                sm: '60vh',
                                md: '60vh'
                            },
                            overflow: 'auto'
                        }}>
                            {/* {orders?.reverse()} */}
                            {

                                !ordersLoading ?
                                    orders?.map((item, i) => {

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
                                                    {/* <ListItemAvatar sx={{ padding: '10px' }}>

                                                </ListItemAvatar> */}
                                                    <ListItemText
                                                        primaryTypographyProps={{
                                                            style: {
                                                                // textDecoration: 'underline',
                                                                fontWeight: 'bold',
                                                                fontSize: '15px',
                                                                color: 'orange'
                                                            }
                                                        }}
                                                        secondaryTypographyProps={{
                                                            style: {
                                                                fontWeight: 'bold',
                                                                // fontSize: '17px',
                                                                // color: '#000000d1',
                                                                color: 'orange'
                                                            }
                                                        }}
                                                        sx={{}}
                                                        //                         <IconButton>
                                                        //     <ChevronRightRounded />
                                                        // </IconButton>
                                                        primary={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center' }}>
                                                            <Typography>
                                                                {`Order Id : ${item?.orderId?.split("order_")[1]}`}
                                                            </Typography>
                                                            <IconButton
                                                                onClick={() => { handleNavigate(item?.orderId) }}
                                                                sx={{
                                                                    display: {
                                                                        xs: 'flex',
                                                                        sm: 'flex',
                                                                        md: 'none'
                                                                    }
                                                                }}>
                                                                <ChevronRightRounded />
                                                            </IconButton>
                                                        </Box>}
                                                        secondary={<Box>
                                                            <Typography sx={{
                                                                marginBlock: '5px',
                                                                fontWeight: 'normal',
                                                                fontSize: '14px',
                                                                color: '#000000d1'
                                                            }}>{`Summary : ₹${item?.totalPrice} | ${new Date(item?.createdAt).toISOString().split('T')[0]}   |   ${item?.paymentDetails?.status === 'COMPLETED' ? "Paid" : "Pay On Delivery"}   `}
                                                            </Typography>


                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                {/* <Typography>{item?.totalPrice}</Typography> */}
                                                                {/* <Chip sx={{ padding: '5px !important', borderColor: item?.orderStatus === "PLACED" ? 'green' : 'orange' }} variant='outlined' label={ */}
                                                                <Typography sx={{ color: item?.orderStatus === "PLACED" ? 'green' : 'orange', fontSize: '14px' }} >{`Status : ${item?.orderStatus?.charAt(0).toUpperCase() + item?.orderStatus?.substr(1).toLowerCase()}`}</Typography>

                                                                {/* }></Chip> */}

                                                            </Box>

                                                        </Box>}

                                                    />



                                                </ListItem>}



                                                <AvatarGroup variant='circular' max={4} sx={{ fontSize: '14px !important', justifyContent: 'start', padding: '8px' }}>
                                                    {
                                                        item?.orderItems?.map((av, ind) => (

                                                            <NavLink style={{ textDecoration: 'none' }} to={`/pid=${av?.product?.productId}`}>
                                                                <Avatar

                                                                    sx={{
                                                                        border: '1px solid #ffa5005c !important',
                                                                        height: {
                                                                            xs: '50px',
                                                                            sm: '50px',
                                                                            md: '50px'
                                                                        }, width: {
                                                                            xs: '50px',
                                                                            sm: '50px',
                                                                            md: '50px'
                                                                        }
                                                                    }} alt="abc" src={av?.product?.productImageUrl}
                                                                />
                                                            </NavLink>
                                                        ))
                                                    }

                                                </AvatarGroup>



                                                <IconButton
                                                    onClick={() => { handleNavigate(item?.orderId) }}
                                                    sx={{
                                                        display: {
                                                            xs: 'none',
                                                            sm: 'none',
                                                            md: 'flex',

                                                        }
                                                    }}>
                                                    <ChevronRightRounded />
                                                </IconButton>



                                            </Box>
                                            }
                                            {i === orders?.length - 1 ? <></> : <Divider sx={{ marginBlock: '6px' }} ></Divider>}
                                        </Box>
                                    }) : <LinearProgress></LinearProgress>
                            }
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box >
    )
}


export default UserAccount


