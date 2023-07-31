import http from '../http-common';
import { URLs } from './base_urls/constant';
//reference
// https://www.bezkoder.com/redux-toolkit-example-crud/

class CategoryDataService {

    categoryUrl = URLs.categories;
    createCategory(data) {
        return http.post(`/${this.categoryUrl}/createCategory`, data);
    }

    updateCategory(id, data) {
        return http.put(`/${this.categoryUrl}/updateCategory/${id}`, data);
    }

    deleteCategory(id) {
        return http.delete(`/${this.categoryUrl}/deleteCategory/${id}`);
    }

    getAllCategories() {
        return http.get(`/${this.categoryUrl}/getAllCategories`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryDataService();