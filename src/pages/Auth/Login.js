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
import { getUser, loginUser } from '../../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passWordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const token = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('jwt'))
        if (localStorage.getItem('jwt')) {
            navigate('/');
        }
    }, [localStorage.getItem('jwt')])

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!validator.isEmail(e.target.value) && e.target.value.length > 0) {
            setEmailError(true);
        }

        else {
            setEmailError(false);
        }

        // setToolTip(false)

    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // setPasswordToolTip(false)
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }



    const handleSubmitLogin = (event) => {


        if (
            email === '' ||
            email === undefined ||
            !validator.isEmail(email) ||
            password === '' ||
            password === undefined

        ) {

            console.log("Error in one of the field", email === "", password === '', emailError);
            // setShowEmailError((email === '' || email === undefined || emailError));
            setEmailError(email === '' ||
                !validator.isEmail(email) || email === undefined);
            setPasswordError((password === undefined || password === ''))



        }


        else {

            const userEmail = email.trim().split(/\s+/);
            // const userPassword = name.trim().split(/\s+/);
            const userData = {

                email: userEmail[0],
                password: password

            }


            console.log(userData);
            // setLoading(true);
            dispatch(loginUser(userData));


        }

    }



    return (
        <Box>
            {/* <Box sx={{ margin: '20px' }}>
                <NavLink replace={true} to='/'>
                    <Image style={{ display: { sm: 'none', md: 'flex' }, }} duration={0} src={login} fit='cover' height='42px' width='124px' />
                </NavLink>
            </Box> */}
            <Box sx={{
                display: {
                    'xs': 'flex',
                    'sm': 'flex',
                    'md': 'flex',
                    'lg': 'flex'
                }
            }} className='login-panel'>
                {/* <Image style={{ display: { 'xs': 'none', 'sm': 'none', 'md': 'none' }, margin: '15px' }} src={login} /> */}


                <Card
                    elevation={2}
                    sx={{
                        // border: '1px solid rgb(0 0 0 / 18%)',
                        paddingInline: '15px', paddingBlock: '0px', width: {
                            'xs': "80vw",
                            'sm': "80vw",
                            'md': "40vw",

                        }
                    }} variant='elevation'>
                    <CardContent sx={{ paddingBottom: '0px !important' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <NavLink replace={true} to='/'>
                                <CardMedia
                                    sx={{
                                        height: {
                                            'xs': "60px",
                                            'sm': "80px",
                                            'md': "80px",

                                        }, width: {
                                            'xs': "180px",
                                            'sm': "200px",
                                            'md': "220px",

                                        }
                                    }}
                                    image={login}
                                    title="green iguana"
                                />
                            </NavLink>
                            <Typography sx={{ fontSize: '30px' }} gutterBottom>
                                Hi, Welcome Back !
                            </Typography>

                        </Box>
                        <Box
                            // onSubmit={ }
                            component="form"
                            sx={{
                                // '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ marginBlock: '20px', gap: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space- evenly' }}>
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
                                    size="medium"
                                    required
                                    margin='dense'
                                    id="email"
                                    fullWidth label="Email"
                                    variant="outlined"
                                    value={email || ""}
                                    onChange={handleEmailChange}
                                    error={emailError}
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
                                    type={showPassword ? 'name' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={handlePasswordVisibility}
                                                >
                                                    {showPassword && password && <VisibilityOutlinedIcon sx={{ color: 'orange' }} />}
                                                    {!showPassword && password && <VisibilityOffOutlinedIcon sx={{ color: 'orange' }} />}

                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    size="medium"
                                    required
                                    margin='dense'
                                    id="password"
                                    fullWidth label="Password"
                                    variant="outlined"
                                    value={password || ""}
                                    onChange={handlePasswordChange}
                                    error={passWordError}

                                />
                                <Typography sx={{ textDecoration: 'underline', fontSize: '15px', color: "orange", fontWeight: 'normal' }} >
                                    Forgot Password ?
                                </Typography>

                            </Box>


                        </Box>
                        {/* <Box sx={{ m: "15px", display: 'flex', justifyContent: 'center' }}>
                            <Typography sx={{ textDecoration: 'none', fontSize: '15px', color: "orange", fontWeight: 'normal' }} >
                                {isLoading ? "Success" : ""}
                            </Typography>
                        </Box> */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <LoadingButton

                                loading={isLoading}
                                disableElevation
                                onClick={handleSubmitLogin}
                                size='large'
                                sx={{
                                    padding: '12px',
                                    background: 'orange',
                                    fontSize: '1rem',
                                    ':hover': {
                                        padding: '12px',
                                        background: 'orange',
                                        fontSize: '1rem'

                                    }
                                }} variant='contained' fullWidth>Sign In</LoadingButton>
                            <LoadingButton size='large' startIcon={<Image duration={0} height={25} width={25} src={Google}></Image>} sx={{ padding: '12px', color: 'black', border: '0.5px solid grey', fontSize: '1rem' }} variant='outlined' fullWidth>Sign in with Google</LoadingButton>
                        </Box>



                        <Box sx={{
                            display: {
                                'xs': 'block',
                                'sm': 'block',
                                'md': 'flex',
                                'lg': 'flex'
                            }, paddingBlock: '20px', justifyContent: 'space-between'
                        }}>
                            <Typography>
                                Dont Have an account ?
                            </Typography>
                            <NavLink replace={true} to={'/register'}>
                                <Typography sx={{ textDecoration: 'underline', color: 'orange' }}>Create an account</Typography>
                            </NavLink>
                        </Box>

                    </CardContent>
                    <ToastContainer />
                </Card>
            </Box >
        </Box>

    )
}

export default Login
