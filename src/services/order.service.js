import http from '../http-common';
import { URLs } from './base_urls/constant';
//reference
// https://www.bezkoder.com/redux-toolkit-example-crud/

class OrderDataService {

    orderUrl = URLs.order;
    getOrder(orderId) {
        return http.get(`/${this.orderUrl}/${orderId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }

    createOrder(data) {
        return http.post(`/${this.orderUrl}/`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        });
    }
    getUserOrders() {
        return http.get(`/${this.orderUrl}/user`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        });
    }


}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderDataService();