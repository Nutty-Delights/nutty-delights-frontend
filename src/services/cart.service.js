import http from '../http-common';
import { URLs } from './base_urls/constant';
//reference
// https://www.bezkoder.com/redux-toolkit-example-crud/

class CartDataService {

    cartUrl = URLs.cart;
    getUserCart(token) {
        return http.get(`/${this.cartUrl}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    addToCart(token, data) {
        return http.put(`/${this.cartUrl}/add`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
    updateCartItem(token, data) {
        return http.put(`/${this.cartUrl}/add`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
    removeItem(token, data) {
        return http.delete(`/${this.cartUrl}/delete/${data}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }


}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CartDataService();