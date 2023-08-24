import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCreatedOrder, getOrder } from '../../redux/slices/order';
import { updatePayment } from '../../redux/slices/payment';
import { Box, Card, Divider, Typography } from '@mui/material';
import tick from '../../assets/images/tick.jpg'
import Image from 'mui-image';

const PaymentSuccess = () => {

  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();



  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const order = useSelector(getCreatedOrder);

  useEffect(() => {
    console.log("orderId", orderId)
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      console.log("payment data", data);
      dispatch(updatePayment(data));
      dispatch(getOrder(data.orderId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, paymentId]);

  return (
    <Box>
      <Divider></Divider>
      <Box
        sx={{
          display: {
            md: 'block'
          },
          justifyContent: 'center',
          padding: '40px'
        }}>
        <Box
          gap={'10px'}
          sx={{
            display: {
              md: 'flex'
            },
            // justifyContent: 'center',
            alignItems: 'center',
            paddingBlock: '0px'
          }}>
          <Image duration={0} height={50} width={50} src={tick} alt='tick'></Image>
          <Typography sx={{ fontSize: '26px', fontWeight: 'bold', color: 'orange' }}>Thank You, Your Order Has Been Placed !</Typography>
        </Box>
        <Box sx={{ paddingLeft: '60px' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'normal', color: 'grey' }}>Order updates will be sent on your email.</Typography>

        </Box>
      </Box>
      <Box
        sx={{
          display: {
            md: 'flex'
          },
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        {/* <Card
          sx={{
            width: {
              md: '50vw'
            }
          }}
          variant='outlined'
        >

        </Card> */}
      </Box>
    </Box >
  )
}

export default PaymentSuccess
