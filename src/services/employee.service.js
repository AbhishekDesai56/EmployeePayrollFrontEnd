import http from '../http-common.js';

class EmployeeService {
    login(data) {
        return http.post('/login',data);
    }

    register(data) {
        return http.post('/register',data);
    }
}

export default new EmployeeService();