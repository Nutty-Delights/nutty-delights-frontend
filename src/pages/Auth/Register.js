import { LoadingButton } from '@mui/lab'
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import Google from '../../assets/images/googleIcon.png'
import banner2 from '../../assets/images/banner 2.jpg'
import login from '../../assets/images/logo.png'
import Image from 'mui-image';
import { NavLink } from 'react-router-dom';

const Register = () => {
    return (
        <Box>
            <Box sx={{ margin: '20px' }}>
                <NavLink replace={true} to='/'>
                    <Image style={{ display: { sm: 'none', md: 'flex' }, }} duration={0} src={login} fit='cover' height='42px' width='124px' />
                </NavLink>
            </Box>
            <Box sx={{
                display: {
                    'xs': 'flex',
                    'sm': 'flex',
                    'md': 'flex',
                    'lg': 'flex'
                }
            }} className='login-panel'>
                {/* <Image style={{ display: { 'xs': 'none', 'sm': 'none', 'md': 'none' }, margin: '15px' }} src={login} /> */}

                <Card sx={{ paddingInline: '15px', paddingBlock: '0px' }} variant='outlined'>
                    <CardContent>
                        <Box>
                            {/* <Image height={'12vh'} width={'70vw'} duration={0} src={login} /> */}
                        </Box>
                        <Typography sx={{ fontSize: '2.7rem' }} gutterBottom>
                            Create an Account !
                        </Typography>
                        {/* <Typography sx={{ textDecoration: 'none', fontSize: '14px', color: "orange", fontWeight: 'normal' }} >
                        Enter your details to create an account.
                    </Typography> */}
                        <Box
                            component="form"
                            sx={{
                                // '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ marginBlock: '15px', gap: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space- evenly' }}>
                                <Box>
                                    <TextField size="medium"
                                        required
                                        fullWidth
                                        margin='dense'
                                        id="outlined-basic" label="  Name" variant="outlined" />
                                    {/* <TextField size="medium"
                                    // fullWidth
                                    margin='dense'
                                    id="outlined-basic" label="Last Name" variant="outlined" /> */}
                                </Box>
                                <TextField required size="medium"
                                    margin='dense'
                                    id="outlined-basic" type='email' label="Email" variant="outlined" />
                                <TextField required size="medium"
                                    margin='dense'
                                    id="outlined-basic" type='tel' label=" Mobile No." variant="outlined" />
                                <TextField required size="medium"
                                    margin='dense'
                                    id="outlined-basic" type='password' fullWidth label="Password" variant="outlined" />


                            </Box>


                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <LoadingButton
                                disableElevation
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
                                }} variant='contained' fullWidth>Create Account</LoadingButton>
                            <LoadingButton size='large' startIcon={<Image duration={0} height={25} width={25} src={Google}></Image>} sx={{ padding: '12px', color: 'black', border: '0.5px solid grey', fontSize: '1rem' }} variant='outlined' fullWidth>Sign up with Google</LoadingButton>
                        </Box>



                        <Box sx={{
                            display: {
                                'xs': 'flex',
                                'sm': 'block',
                                'md': 'flex',
                                'lg': 'flex'
                            }, paddingBlock: '20px', justifyContent: 'space-between'
                        }}>
                            <Typography>
                                Already Have an account ?
                            </Typography>
                            <NavLink replace={true} to={'/login'}>
                                <Typography sx={{ textDecoration: 'underline', color: 'orange' }}>Sign In</Typography>
                            </NavLink>
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

                    </CardContent>

                </Card>
            </Box >
        </Box>
    )
}

export default Register
