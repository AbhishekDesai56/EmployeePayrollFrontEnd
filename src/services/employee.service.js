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

  getEmployeeId = (id) => {
    id = id || "";
    return http.get(`/getEmployeeById/${id}`, header);
  };

  createEmployee = (data) => {
    return http.post("/createEmployee", data, header);
  };

  updateEmployee = (id, data) => {
    return http.put(`/updateEmployeeDetail/${id}`, data, header);
  };
}

export default new EmployeeService();
