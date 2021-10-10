import http from "../http-common.js";
let token = sessionStorage.getItem("token");

const header = {
  headers: { token: token },
};

class EmployeeService {
  login(data) {
    return http.post("/login", data);
  }

  register(data) {
    return http.post("/register", data);
  }

  getAllEmployees = () => {
    return http.get("/getEmployees", header);
  };

  createEmployee = (data) => {
    return http.post("/createEmployee", data, header);
  };
}

export default new EmployeeService();
