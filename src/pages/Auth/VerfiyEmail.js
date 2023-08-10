import { LoadingButton } from '@mui/lab'
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import Google from '../../assets/images/googleIcon.png'
import banner2 from '../../assets/images/banner 2.jpg'
import login from '../../assets/images/logo.png'
import Image from 'mui-image';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css'
import NavBar from '../../components/shared/NavBar/NavBar';
import validator from 'validator';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { generateEmailCode, getAuthOtp, getUser, getUserLoading, getUserProfile, loginUser, verifyEmailCode } from '../../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const VerifyEmail = ({ setAuthForm }) => {


    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const jwt = localStorage.getItem('jwt');
    const user = useSelector(getUser);
    const isLoading = useSelector(getUserLoading);
    const otp = useSelector(getAuthOtp);
    const token = useSelector((state) => state?.user?.token)
    console.log(jwt, user);
    const success = useSelector((state) => state?.user?.success)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (success) {
            dispatch(getUserProfile(localStorage.getItem('jwt')));
        }

    }, [success])


    const handleCodeChange = (e) => {
        setCode(e.target.value);
        // setPasswordToolTip(false)
    }

    const generateCode = () => {
        const data = {
            jwt: localStorage.getItem('jwt'),
            email: user?.email
        }

        dispatch(generateEmailCode(data));
    }
    const verifyCode = () => {
        const data = {
            jwt: localStorage.getItem('jwt'),
            email: user?.email,
            otp: code
        }

        dispatch(verifyEmailCode(data));
    }







    return (
        <Box>

            <Box sx={{
                display: {
                    'xs': 'flex',
                    'sm': 'flex',
                    'md': 'flex',
                    'lg': 'flex'
                }

            }} className='login-panel'>


                <Card
                    elevation={2}
                    sx={{
                        // border: '1px solid rgb(0 0 0 / 18%)',
                        paddingInline: '10px', width: {
                            'xs': "100vw",
                            // 'sm': "90vw",
                            'md': "30vw",

                        }
                    }} variant='elevation'>
                    <CardContent sx={{}}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 'normal', marginTop: '5px' }} >
                            Verfiy your email address
                        </Typography>
                        <Box

                            component="form"

                            noValidate
                            autoComplete="on"
                        >
                            <Box sx={{
                                marginBottom: '10px',
                                marginTop: '10px',
                                gap: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space- evenly'
                            }}>
                                <TextField
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
                                    size="small"
                                    required
                                    margin='dense'
                                    id="email"
                                    type='email'
                                    disabled
                                    fullWidth label="Email"
                                    variant="outlined"
                                    value={"" || user.email}
                                />
                                <TextField
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
                                    type={'name'}
                                    size="small"
                                    required
                                    margin='dense'
                                    id="code"
                                    fullWidth label="Verfication Code"
                                    variant="outlined"
                                    value={"" || code}
                                    onChange={handleCodeChange}
                                // error={passWordError}

                                />


                            </Box>
                            {otp ? <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '15px' }}>
                                <Button onClick={generateCode} >
                                    <Typography sx={{ textDecoration: 'none', fontSize: '15px', color: "orange", fontWeight: 'normal' }} >
                                        Resend code
                                    </Typography>
                                </Button>
                            </Box> : <></>}

                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                            {
                                otp ? <LoadingButton

                                    loading={isLoading}
                                    disableElevation
                                    onClick={verifyCode}
                                    size='large'
                                    sx={{
                                        padding: '8px',
                                        background: 'orange',
                                        fontSize: '1rem',
                                        ':hover': {
                                            padding: '8px',
                                            background: 'orange',
                                            fontSize: '1rem'

                                        }
                                    }} variant='contained' fullWidth> Verify Code</LoadingButton> :

                                    <LoadingButton

                                        loading={isLoading}
                                        disableElevation
                                        onClick={generateCode}
                                        size='large'
                                        sx={{
                                            padding: '8px',
                                            background: 'orange',
                                            fontSize: '1rem',
                                            ':hover': {
                                                padding: '8px',
                                                background: 'orange',
                                                fontSize: '1rem'

                                            }
                                        }} variant='contained' fullWidth>Generate Code</LoadingButton>
                            }

                        </Box>





                    </CardContent>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="light"
                    />
                </Card>
            </Box >
        </Box>

    )
}

export default VerifyEmail
