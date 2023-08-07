import http from '../http-common';
import { URLs } from './base_urls/constant';
//reference
// https://www.bezkoder.com/redux-toolkit-example-crud/

class UserService {

    userUrl = URLs.users;
    userLogin(token) {
        return http.post(`${this.userUrl}/login`, token);
    }
    userLogout(token) {
        return http.post(`${this.userUrl}/logout`, token);
    }
    userRegisteration(data) {
        return http.post(`${this.userUrl}/register`, data);
    }

    deleteUser(token) {
        return http.delete(`${this.userUrl}/user/delete/${token}`);
    }

    getUserAccountDetails(token) {
        return http.get(`${this.userUrl}/user/${token}`);
    }


}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();