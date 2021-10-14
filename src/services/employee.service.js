import http from "../http-common.js";
let token = sessionStorage.getItem("token");

let header = {
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
    token = sessionStorage.getItem("token");
    header = {
      headers: { token: token },
    };
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

  deleteEmployee = (id) => {
    return http.delete(`/deleteEmployeeById/${id}`, header);
  };
}

export default new EmployeeService();
