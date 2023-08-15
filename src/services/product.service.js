import http from '../http-common';
import { URLs } from './base_urls/constant';
//reference
// https://www.bezkoder.com/redux-toolkit-example-crud/

class ProductDataService {

    productsUrl = URLs.products;
    createProduct(data) {
        return http.post(`/${this.productsUrl}/createProduct`, data);
    }

    updateProduct(id, data) {
        return http.put(`/${this.productsUrl}/updateProduct/${id}`, data);
    }

    deleteProduct(id) {
        return http.delete(`/${this.productsUrl}/deleteProduct/${id}`);
    }

    getProduct(productId) {
        return http.get(`/${this.productsUrl}/${productId}`);
    }

    getAllProductsByCategory(categoryId) {
        return http.get(`/${this.productsUrl}/getAllProducts/${categoryId}`);
    }

    getAllProducts() {
        return http.get(`/${this.productsUrl}/getAllProducts`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductDataService();