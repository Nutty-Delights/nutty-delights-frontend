import http from '../http-common';
import { URLs } from './base_urls/constant';
//reference
// https://www.bezkoder.com/redux-toolkit-example-crud/

class PaymentDataService {

    paymentUrl = URLs.payment;
    updatePayment(paymentId, orderId) {
        return http.get(`/${this.paymentUrl}/payments?payment_id=${paymentId}&order_id=${orderId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }

    createPaymentLink(orderId) {
        return http.post(`/${this.paymentUrl}/payments/${orderId}`, orderId, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        });
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PaymentDataService();