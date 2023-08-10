import http from '../http-common';
import { URLs } from './base_urls/constant';
//reference
// https://www.bezkoder.com/redux-toolkit-example-crud/

class UserService {

    userUrl = URLs.users;

    userRegisteration(data) {
        return http.post(`/${this.userUrl}/register`, data);
    }
    userLogin(data) {
        console.log("Login here", data);
        return http.post(`/${this.userUrl}/login`, data);
    }

    getUser(token) {
        return http.get(`/users/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    generateCode(data) {
        return http.post(`/${this.userUrl}/generateCode`, data, {
            headers: {
                "Authorization": `Bearer ${data.jwt}`
            }
        });
    }
    verfiyCode(data) {
        return http.post(`/${this.userUrl}/verifyCode`, data, {
            headers: {
                "Authorization": `Bearer ${data.jwt}`
            }
        });
    }


    // userLogout(token) {
    //     return http.post(`/${this.userUrl}/logout`, token);
    // }


    // deleteUser(token) {
    //     return http.delete(`${this.userUrl}/user/delete/${token}`);
    // }

    // getUserAccountDetails(token) {
    //     return http.get(`${this.userUrl}/user/${token}`);
    // }


}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();