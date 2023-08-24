import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCreatedOrder, getOrder } from '../../redux/slices/order';
import { updatePayment } from '../../redux/slices/payment';

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
      dispatch(updatePayment(data));
      dispatch(getOrder(orderId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, paymentId]);

  return (
    <div>

    </div>
  )
}

export default PaymentSuccess
