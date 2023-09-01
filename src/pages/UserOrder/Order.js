import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { clearCreatedOrder, getCreatedOrder, getOrder, getOrderLoading, getPlacedOrder, getUserOrder } from '../../redux/slices/order';
import payment, { getPaymentLoading, getPaymentStatus, updatePayment } from '../../redux/slices/payment';
import { Avatar, Box, Card, CardContent, Divider, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Step, StepLabel, Stepper, Typography } from '@mui/material';
import tick from '../../assets/images/tick.jpg'
import Image from 'mui-image';
import Track from '@mui/icons-material/GpsFixedOutlined';
import Ship from '@mui/icons-material/LocalShippingOutlined';
import Location from '@mui/icons-material/LocationOnOutlined';
import { getCart, getUserCart } from '../../redux/slices/cart';
import { ChevronRightRounded } from '@mui/icons-material';

const Order = () => {

    const [paymentId, setPaymentId] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const { orderId } = useParams();
    const isLoadingPayment = useSelector(getPaymentLoading);
    const isLoadingOrder = useSelector(getOrderLoading);
    const payment = useSelector(getPaymentStatus);
    const steps = [
        'Order placed',
        'Order shipped',
        'Order delivered',
    ];




    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const order = useSelector(getPlacedOrder);

    useEffect(() => {
        window.scrollTo(0, 0);

        // dispatch(getCart(localStorage.getItem('jwt')));
        // console.log("inside first useEffect");
        // console.log("orderId", orderId)
        // const urlParams = new URLSearchParams(window.location.search);
        // setPaymentId(urlParams.get("razorpay_payment_id"));
        // setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
        // setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
        // if (urlParams.get("razorpay_payment_id") && urlParams.get("razorpay_payment_link_status") === "paid") {
        //     const payId = urlParams.get("razorpay_payment_id");
        //     const data = { orderId, payId, jwt };
        //     console.log(data);
        //     console.log("payment data", data);
        //     dispatch(updatePayment(data));


        // }
    }, []);

    useEffect(() => {
        console.log("Payment ID and status", paymentId, paymentStatus);

        // if (orderId)
        dispatch(getUserOrder(orderId));
        dispatch(clearCreatedOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payment]);


    // console.log("created order", order)


    return (
        isLoadingOrder || isLoadingPayment ? <Box sx={{
            height: {
                xs: '80vh',
                sm: '80vh',
                md: '80vh'
            }
        }}>
            <LinearProgress />
        </Box> : <Box>
            <Divider></Divider>
            <Box
                sx={{
                    display: {
                        md: 'block'
                    },
                    justifyContent: 'center',
                    paddingBlock: '30px',
                    paddingInline: '20px'
                }}>
                <Box
                    gap={'10px'}
                    sx={{
                        display: {
                            xs: 'block',
                            md: 'block'
                        },
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBlock: '0px'
                    }}>
                    {/* <Typography sx={{ fontWeight: 'bold' }}>Order Tracking</Typography> */}
                    <Box sx={{ width: '100%', marginInline: '0px' }}>
                        <Stepper sx={{}} activeStep={order?.orderStatus === "PLACED" ? 1 : order?.orderStatus === "SHIPPED" ? 2 : 3} alternativeLabel>
                            {steps.map((label) => (
                                <Step sx={{
                                    '& .MuiStepIcon-root.Mui-active': {
                                        color: 'orange !important'
                                    },
                                    '& .MuiStepIcon-root.Mui-completed': {
                                        color: 'orange !important'
                                    }
                                }} key={label}>
                                    <StepLabel sx={{ marginInline: '10px' }}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    {/* <Image duration={0} height={40} width={40} src={tick} alt='tick'></Image> */}
                    {/* <Typography sx={{ fontSize: '22px', fontWeight: 'bold', color: 'orange' }}>Thank You, Your Order Has Been Placed !</Typography> */}
                </Box>
                <Box sx={{
                    display: {
                        xs: 'block',
                        md: 'flex'
                    },
                    justifyContent: 'center'
                }}>
                    {/* <Typography sx={{ fontSize: '15px', fontWeight: 'normal', color: 'grey' }}>Order updates will be sent on your email.</Typography> */}

                </Box>
            </Box>
            <Box
                sx={{
                    display: {
                        md: 'flex'
                    },
                    justifyContent: 'center',
                    paddingInline: '10px'
                }}
            >
                <Card
                    sx={{
                        width: {
                            xs: 'fit-content',
                            sm: '100%',
                            md: 'fit-content'
                        },
                        height: {
                            md: 'fit-content'
                        },
                        display: {
                            xs: 'block',
                            sm: 'block',
                            md: 'flex'
                        }
                    }}
                    variant='outlined'
                >
                    {/* {console.log(order)} */}

                    <CardContent>
                        {
                            !order ? <></> : <Box sx={{
                                paddingBlock: '10px',
                                display: {
                                    xs: 'flex',
                                    md: 'flex'
                                },
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{`Order Id : ${order ? order?.orderId?.split("_")[1] : ""}`}</Typography>


                            </Box>}

                        <Box sx={{
                            paddingBlock: '5px',
                            display: {

                                md: 'flex'
                            },
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            {!order ? <></> :
                                <Box
                                    gap={'10px'}
                                    sx={{
                                        display: {
                                            xs: 'block',
                                            md: 'flex',
                                        },
                                        alignItems: 'center'
                                    }}>
                                    <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{`Order date :  ${order ? new Date(order?.createdAt).toLocaleDateString() : ""}, ${order ? new Date(order?.createdAt).toLocaleTimeString() : ""} |`}</Typography>
                                    <Box display={'flex'} sx={{ alignItems: 'center' }}>
                                        {/* <IconButton>
                      <Ship sx={{ color: 'green' }} />
                    </IconButton> */}
                                        <Typography sx={{ fontWeight: 'normal', color: 'green', fontSize: '14px' }}>{`Expected delivery date : ${order?.deliveryDate ? new Date(order?.deliveryDate).toLocaleDateString() : 'to be updated'} `}</Typography>
                                    </Box>
                                </Box>
                            }


                        </Box>

                        <Divider sx={{ marginBlock: '5px' }} ></Divider>

                        <Box>
                            <List>
                                {
                                    order?.orderItems?.map((item, i) => {
                                        return <Box>
                                            {<Box sx={{
                                                alignItems: 'center',
                                                display: {
                                                    xs: 'block',
                                                    sm: 'block',
                                                    md: 'flex'
                                                }
                                            }}>
                                                {<ListItem key={item?.id} disablePadding >
                                                    {/* <Box height={'50px'} width={5} sx={{ background: item?.productVariants[0]?.quantity > 0 ? "green" : 'red' }}></Box> */}
                                                    <ListItemAvatar sx={{ padding: '10px' }}>
                                                        <NavLink style={{ textDecoration: 'none' }} to={`/pid=${item?.product?.productId}`}>
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
                                                            }} alt="Remy Sharp" src={item?.product?.productImageUrl} />
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
                                                                        <Typography sx={{ fontWeight: '', color: '#000000bf ', fontSize: '13px' }} >{`₹ ${item?.price}`}</Typography>

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
                                                        primary={`${item?.product?.productName}`}
                                                        secondary={<Box>
                                                            <Typography sx={{
                                                                marginBlock: '5px',
                                                                fontWeight: 'bold',
                                                                fontSize: '12px',
                                                                color: '#000000d1'
                                                            }}>{`${item?.variant?.weight}   |   ${item?.quantity < 10 ? `0${item?.quantity}` : item?.quantity} x ₹ ${item?.price}  `}</Typography>




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
                                                            <Typography sx={{ fontWeight: 'bold', color: '#000000a3', fontSize: '13px' }} >{`₹ ${item?.price}`}</Typography>

                                                        </Box>

                                                    </Box>



                                                </Box>



                                            </Box>}
                                            {i === order?.orderItems?.length - 1 ? <></> : <Divider></Divider>}
                                        </Box>
                                    })
                                }
                            </List>
                        </Box>

                    </CardContent>

                    <Divider sx={{ borderColor: 'rgb(0  0 0 / 6%) ', borderWidth: '0.01px', margin: '10px' }}></Divider>

                    <CardContent>
                        {
                            !order ? <></> : <Box sx={{
                                display: {
                                    xs: 'flex',
                                    md: 'flex'
                                },
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{`Delivery Address`}</Typography>
                                <IconButton>
                                    <Location />
                                </IconButton>

                            </Box>}

                        <Box sx={{
                            display: {
                                md: 'flex'
                            },
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            {!order ? <></> :
                                <Box>
                                    <Box
                                        gap={'10px'}
                                        sx={{
                                            display: {
                                                md: 'flex',
                                            },
                                            alignItems: 'center'
                                        }}>
                                        <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{order?.shippingAddress?.firstName + " " + order?.shippingAddress?.lastName}</Typography>
                                        <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{order?.shippingAddress?.houseNo + ", " + order?.shippingAddress?.addressLine}</Typography>

                                    </Box>
                                    <Box
                                        gap={'5px'}
                                        sx={{
                                            display: {
                                                md: 'flex',
                                            },
                                            alignItems: 'center'
                                        }}>
                                        <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{order?.shippingAddress?.pinCode + ", " + order?.shippingAddress?.city + ", "}</Typography>
                                        <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{order?.shippingAddress?.state}</Typography>
                                        <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{order?.shippingAddress?.mobileNumber}</Typography>

                                    </Box>
                                </Box>

                            }


                        </Box>

                        <Divider sx={{ marginBlock: '10px' }} ></Divider>
                        <Typography sx={{ fontWeight: 'bold' }}>{`Payment Summary`}</Typography>


                        <Box sx={{ marginBlock: "10px" }}>
                            <Box
                                gap={'5px'}
                                sx={{
                                    display: {
                                        md: 'block',
                                    },
                                    alignItems: 'center'
                                }}>
                                <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{`Payment Id : ${order?.paymentDetails?.paymentId}`}</Typography>

                                <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{`Payment Status : ${order?.paymentDetails?.status === 'COMPLETED' ? "Paid" : "Pending"}`}</Typography>
                                <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{`Payment Mode : ${order?.paymentDetails?.paymentMethod ? order?.paymentDetails?.paymentMethod?.toLowerCase() : "Pay on delivery"}`}</Typography>
                                <Typography sx={{ fontWeight: 'normal', color: 'grey', fontSize: '14px' }}>{`Order Status : ${order?.orderStatus === 'PENDING' ? "Pending" : "Confirmed"}`}</Typography>

                            </Box>
                        </Box>

                        <Divider sx={{ marginBlock: '10px' }}></Divider>

                        <Typography sx={{ fontWeight: 'bold' }}>{`Order Summary`}</Typography>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBlock: '10px' }}>
                            <Box>
                                <Typography sx={{ fontSize: '14px', fontWeight: '', marginInline: '0px', marginTop: '0px', color: 'grey' }}>{`Subtotal (${order?.totalItems} items)`}</Typography>
                                <Typography sx={{ fontSize: '14px', fontWeight: '', marginInline: '0px', marginTop: '0px', color: 'grey' }}>{`Taxes (GST)`}</Typography>
                                <Typography sx={{ fontSize: '14px', fontWeight: '', marginInline: '0px', marginTop: '0px', color: 'grey' }}>{`Discounts & Offers (-)`}</Typography>
                                {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Total (incl. all taxes )`}</Typography> */}
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '14px', fontWeight: '', marginInline: '0px', marginTop: '0px', color: 'grey' }}>{` ₹ ${Math.round(order ? order?.totalPrice * 100 / 105 : 0)}`}</Typography>
                                <Typography sx={{ fontSize: '15px', fontWeight: '', marginInline: '0px', marginTop: '0px', color: 'grey' }}>{` ₹ ${Math.round(order ? order?.totalPrice * 5 / 105 : 0)}`}</Typography>
                                <Typography sx={{ textDecoration: 'none', color: 'green', fontSize: '14px', fontWeight: '', color: 'grey', marginInline: '0px', marginTop: '0px' }}>{`₹ ${0}`}</Typography>
                            </Box>


                        </Box>
                        <Box>
                            <Divider sx={{ marginBlock: '5px' }}></Divider>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    {/* <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Subtotal (${cart?.cartTotalItems} items)`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '', marginInline: '20px', marginTop: '10px' }}>{`Taxes ( GST )`}</Typography> */}
                                    <Typography sx={{ color: 'grey', fontSize: '16px', fontWeight: '', marginInline: '0px', marginTop: '0px' }}>{`Total`}</Typography>
                                    {/* <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >{`Including shipping charges : ${shippingMethod === "cod" ? `₹50` : `free`}`}</Typography> */}
                                    {/* <Typography sx={{ fontWeight: '', color: 'grey', fontSize: '11px', marginInline: '10px', }} >{`${shippingMethod === 'cod' ? 'Pay On Delivery' : 'Prepaid Delivery'}`}</Typography> */}

                                </Box>
                                <Box>
                                    {/* <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 100 / 105)}`}</Typography>
                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginInline: '20px', marginTop: '10px' }}>{`₹ ${Math.round(cart?.cartTotalPrice * 5 / 105)}`}</Typography> */}
                                    <Typography sx={{ color: 'orange', fontSize: '16px', fontWeight: 'bold', marginInline: '0px', marginTop: '0px' }}>{`₹ ${order ? order?.totalPrice : 0}`}</Typography>
                                </Box>
                            </Box>


                        </Box>



                    </CardContent>

                </Card>
            </Box>
        </Box >
    )
}

export default Order
