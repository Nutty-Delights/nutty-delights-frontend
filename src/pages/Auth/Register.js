import { LoadingButton } from '@mui/lab'
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, InputAdornment, TextField, Tooltip, Typography, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import Google from '../../assets/images/googleIcon.png'
import banner2 from '../../assets/images/banner 2.jpg'
import login from '../../assets/images/LogoV9 (1).gif'
import Image from 'mui-image';
import { NavLink, json, useNavigate } from 'react-router-dom';
import validator from 'validator'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Right from '@mui/icons-material/TaskAltOutlined';
import Error from '@mui/icons-material/ErrorOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserError, getUserLoading, getUserProfile, registerUser } from '../../redux/slices/user';
import { ToastContainer, toast } from 'react-toastify';



const Register = ({ setAuthForm }) => {




    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showTooltip, setToolTip] = useState(false);
    const [showPasswordTooltip, setPasswordToolTip] = useState(false);
    const [showNameError, setNameError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showMobileError, setMobileError] = useState(false);
    const [showPasswordError, setPasswordError] = useState(false);
    // const [isLoading, setLoading] = useState(false);
    const [isEmpty, setEmpty] = useState(true);
    const isLoading = useSelector(getUserLoading);
    const isError = useSelector(getUserError);
    const jwt = localStorage.getItem('jwt');
    const user = useSelector(getUser);
    console.log(jwt, user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            dispatch(getUserProfile(jwt))
            // navigate(-1)
        }

    }, [jwt])

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!validator.isEmail(e.target.value) && e.target.value.length > 0) {
            setEmailError(true);
        }

        else {
            setEmailError(false);
        }

        setToolTip(false)

    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordToolTip(false)
    }
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleToolTip = () => {
        setToolTip(!showTooltip)
    }
    const handlePasswordToolTip = () => {
        setPasswordToolTip(!showPasswordTooltip)
    }


    const handleSubmitRegister = (event) => {


        if (
            name === '' ||
            name === undefined ||
            email === '' ||
            email === undefined ||
            emailError ||
            mobile === "" ||
            mobile === undefined ||
            mobile.length !== 10 ||
            password === '' ||
            password === undefined ||
            password.length < 6
        ) {

            console.log("Error in one of the field");
            setNameError((name === '' || name === undefined));
            setShowEmailError((email === '' || email === undefined || emailError));
            setMobileError((mobile === "" || mobile === undefined || mobile.length !== 10))
            setPasswordError((password === undefined || password.length < 6))



        }


        else {

            setNameError((name === '' || name === undefined));
            setShowEmailError((email === '' || email === undefined || emailError));
            setMobileError((mobile === "" || mobile === undefined || mobile.length !== 10))
            setPasswordError((password === undefined || password.length < 6))

            const userName = name.trim().split(/\s+/);
            const userEmail = email.trim().split(/\s+/);
            const userMobile = mobile.trim().split(/\s+/);
            // const userPassword = name.trim().split(/\s+/);
            const userData = {
                firstName: userName[0],
                lastName: userName[1] === undefined || userName[1] === '' || userName[1] === null ? "" : userName[1],
                email: userEmail[0],
                mobileNumber: userMobile[0],
                password: password

            }

            const localCartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))?.cartItems : [];
            const data = {
                user: userData,
                localCartItems: localCartItems
            }


            console.log(data);
            dispatch(registerUser(data));


        }

    }
    return (
        <Box>
            {/* <Box sx={{ margin: '15px' }}>
                <NavLink replace={true} to='/'>
                    <Image
                        style={{
                            display: { sm: 'none', md: 'flex' },
                        }}
                        duration={0}
                        src={login}
                        fit='cover'
                        height='42px'
                        width='124px' />
                </NavLink>
            </Box> */}
            <Box sx={{
                display: "flex",
                // minHeight: {
                //     'xs': '90vh',
                //     'sm': '90vh',
                //     'md': '100vh',
                //     'lg': '100vh'
                // }
            }} className='login-panel'>
                {/* <Image style={{ display: { 'xs': 'none', 'sm': 'none', 'md': 'none' }, margin: '15px' }} src={login} /> */}

                <Card
                    elevation={2}
                    sx={{
                        // border: '1px solid rgb(0 0 0 / 18%)',
                        paddingInline: '15px', paddingBlock: '0px', width: {
                            // 'xs': "80vw",
                            // 'sm': "80vw",
                            'md': "30vw",

                        }
                    }} variant='elevation'>

                    <CardContent sx={{ paddingBottom: '0px !important' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <NavLink replace={true} to='/'>
                                <CardMedia
                                    sx={{
                                        height: {
                                            'xs': "80px",
                                            'sm': "80px",
                                            'md': "90px",

                                        }, width: {
                                            'xs': "120px",
                                            'sm': "120px",
                                            'md': "140px",

                                        }
                                    }}
                                    image={login}
                                    title="green iguana"
                                />
                            </NavLink>
                            <Typography sx={{
                                fontSize: {
                                    smx: '29px',
                                    md: '30px'
                                }
                            }} gutterBottom>
                                Create an account!
                            </Typography>
                        </Box>

                        <Box
                            onSubmit={handleSubmitRegister}
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ marginBottom: '15px', gap: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space- evenly' }}>
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
                                    value={name || ""}
                                    onChange={handleNameChange}
                                    required
                                    fullWidth
                                    margin='dense'
                                    error={showNameError}


                                    id="name" label="Full Name" variant="outlined" />
                                <TextField
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>

                                                {(emailError && email?.length > 0) && <IconButton>
                                                    {<Tooltip

                                                        onClick={handleToolTip}
                                                        open={showTooltip}
                                                        title={
                                                            <Typography sx={{ fontSize: '12px', }}>
                                                                Invalid Email Address
                                                            </Typography>
                                                        }
                                                        arrow
                                                        placement='bottom' >

                                                        <Error sx={{ color: 'orange' }} />

                                                    </Tooltip>}

                                                </IconButton>}
                                                {/* {(!emailError && email?.length > 0) && <IconButton>


                                                    <Right sx={{ color: 'orange' }} />



                                                </IconButton>} */}
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    required
                                    size="small"
                                    margin='dense'
                                    id="email"
                                    type='email'
                                    label="Email"
                                    variant="outlined"
                                    value={email || ""}
                                    error={showEmailError}
                                    onChange={handleEmailChange}

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
                                        },




                                    }}
                                    inputProps={{
                                        style: {
                                            // paddingBlock: '16.5px',
                                            paddingLeft: mobile ? '0px' : '14px'
                                        }
                                    }}
                                    InputProps={{
                                        sx: {
                                            flexDirection: 'row-reverse'
                                        },
                                        endAdornment: mobile?.length > 0 ?
                                            <InputAdornment sx={{ marginTop: '1px', ml: '12px', }} position='start'>

                                                {(mobile?.length > 0) && <Typography sx={{ mr: '0px', }}>
                                                    +91
                                                </Typography>}
                                            </InputAdornment> : <></>
                                    }}
                                    required
                                    size="small"
                                    margin='dense'
                                    id="mobileNumber"
                                    type={'tel'}
                                    label=" Mobile No."
                                    variant="outlined"
                                    value={mobile || ''}
                                    onChange={handleMobileChange}
                                    error={showMobileError}
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
                                                {(password?.length < 6 && password?.length > 0) && <IconButton>
                                                    {<Tooltip

                                                        onClick={handlePasswordToolTip}
                                                        open={showPasswordTooltip && password?.length > 0}
                                                        title={
                                                            <Typography sx={{ fontSize: '12px', }}>
                                                                Password should be 6 characters long
                                                            </Typography>
                                                        }
                                                        arrow
                                                        placement='bottom' >

                                                        <Error sx={{ color: 'orange' }} />

                                                    </Tooltip>}
                                                </IconButton>}
                                                {/* {(password.length > 5) && <IconButton>


                                                    <Right sx={{ color: 'orange' }} />


                                                </IconButton>} */}
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    size="small"
                                    margin='dense'
                                    id="password"
                                    type={showPassword ? 'name' : 'password'}
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    error={showPasswordError}
                                />


                            </Box>
                            {/* <Box sx={{ m: "15px", display: 'flex', justifyContent: 'center' }}>
                                <Typography sx={{ textDecoration: 'none', fontSize: '15px', color: "orange", fontWeight: 'normal' }} >
                                    {isError ? "Something went wrong" : ""}
                                </Typography>
                            </Box> */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <LoadingButton

                                    loading={isLoading}
                                    onClick={handleSubmitRegister}
                                    disableElevation
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
                                    }} variant='contained' fullWidth>Create Account</LoadingButton>

                                {/* <LoadingButton size='large' startIcon={<Image duration={0} height={25} width={25} src={Google}></Image>} sx={{ padding: '8px', color: 'black', border: '1px solid #8080806e', fontSize: '1rem' }} variant='outlined' fullWidth>Sign up with Google</LoadingButton> */}
                            </Box>


                        </Box>




                        <Box sx={{
                            gap: '10px',
                            display: {
                                'xs': 'block',
                                'sm': 'block',
                                'md': 'flex',
                                'lg': 'flex'
                            }, paddingBlock: '20px', justifyContent: 'space-around'
                        }}>
                            <Typography>
                                Already Have an account ?
                            </Typography>

                            <Box onClick={() => { setAuthForm((prev) => !prev) }}>
                                <Typography sx={{ textDecoration: 'underline', color: 'orange', cursor: 'pointer' }}>Sign in</Typography>
                            </Box>

                        </Box>
                        <Box sx={{
                            display: {
                                'xs': 'block',
                                'sm': 'block',
                                'md': 'flex',
                                'lg': 'flex'
                            }, paddingBlock: '10px', justifyContent: 'center'
                        }}>


                        </Box>
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


                    </CardContent>

                </Card>
            </Box >
        </Box >
    )
}

export default Register
