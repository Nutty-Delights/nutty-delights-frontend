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

    // deleteCategory(id) {
    //     return http.delete(`/${this.cartUrl}/deleteCategory/${id}`);
    // }

    // getAllCategories() {
    //     return http.get(`/${this.cartUrl}/getAllCategories`);
    // }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CartDataService();