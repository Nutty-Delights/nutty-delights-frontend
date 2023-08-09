import React, { useEffect } from 'react'
import { Box, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserProfile, logoutUser } from '../../redux/slices/user';

const UserAccount = () => {


    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt")

    useEffect(() => {
        if (token)
            dispatch(getUserProfile());
    }, [])
    return (
        <div>
            <Box
                // onSubmit={handleSubmitRegister}
                component="form"
                noValidate
                autoComplete="off"
            >
                <Box sx={{ margin: '20px', gap: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space- evenly' }}>
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
                        value={user?.firstName + " " + user?.lastName || ""}
                        // onChange={handleNameChange}
                        required
                        fullWidth
                        margin='dense'
                        // error={showNameError}


                        id="name" label="Name" variant="outlined" />
                    <TextField
                        // InputProps={{
                        //     endAdornment: (
                        //         <InputAdornment position='end'>

                        //             {(emailError && email?.length > 0) && <IconButton>
                        //                 {<Tooltip

                        //                     onClick={handleToolTip}
                        //                     open={showTooltip}
                        //                     title={
                        //                         <Typography sx={{ fontSize: '12px', }}>
                        //                             Invalid Email Address
                        //                         </Typography>
                        //                     }
                        //                     arrow
                        //                     placement='bottom' >

                        //                     <Error sx={{ color: 'orange' }} />

                        //                 </Tooltip>}

                        //             </IconButton>}
                        //             {/* {(!emailError && email?.length > 0) && <IconButton>


                        //                             <Right sx={{ color: 'orange' }} />



                        //                         </IconButton>} */}
                        //         </InputAdornment>
                        //     ),
                        // }}
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
                        value={user?.email || ""}

                    // error={showEmailError}
                    // onChange={handleEmailChange}

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
                        // inputProps={{
                        //     style: {
                        //         paddingBlock: '16.5px',
                        //         paddingLeft: mobile ? '0px' : '14px'
                        //     }
                        // }}
                        // InputProps={{
                        //     sx: {
                        //         flexDirection: 'row-reverse'
                        //     },
                        //     endAdornment: mobile?.length > 0 ?
                        //         <InputAdornment sx={{ marginTop: '1px', ml: '12px', }} position='start'>

                        //             {(mobile?.length > 0) && <Typography sx={{ mr: '0px', }}>
                        //                 +91
                        //             </Typography>}
                        //         </InputAdornment> : <></>
                        // }}
                        required
                        size="small"
                        margin='dense'
                        id="mobileNumber"
                        type={'tel'}
                        label=" Mobile No."
                        variant="outlined"
                        value={user?.mobileNumber || ''}
                    // onChange={handleMobileChange}
                    // error={showMobileError}
                    />



                </Box>
                {/* <Box sx={{ m: "15px", display: 'flex', justifyContent: 'center' }}>
                                <Typography sx={{ textDecoration: 'none', fontSize: '15px', color: "orange", fontWeight: 'normal' }} >
                                    {isError ? "Something went wrong" : ""}
                                </Typography>
                            </Box> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px' }}>
                    <LoadingButton

                        // loading={isLoading}
                        // onClick={handleSubmitRegister}
                        disableElevation
                        size='large'
                        sx={{
                            // padding: '12px',
                            // margin: '20px',
                            background: 'orange',
                            fontSize: '1rem',
                            ':hover': {
                                padding: '12px',
                                background: 'orange',
                                fontSize: '1rem'

                            }
                        }} variant='contained' fullWidth>Update Details</LoadingButton>

                    {/* <LoadingButton size='large' startIcon={<Image duration={0} height={25} width={25} src={Google}></Image>} sx={{ padding: '12px', color: 'black', border: '0.5px solid grey', fontSize: '1rem' }} variant='outlined' fullWidth>Sign up with Google</LoadingButton> */}
                </Box>


            </Box>

        </div>
    )
}

export default UserAccount
