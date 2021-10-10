import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import FormikControl from "./formikControl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addEmployee.scss";
import { format } from "date-fns";
const AddEmployee = () => {
  const history = useHistory();

  const initialValues = {
    name: "",
    gender: "",
    department: [],
    salary: "",
    startDate: "",
    note: "",
  };

  const radioOptions = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];

  const checkboxOptions = [
    { key: "HR", value: "HR" },
    { key: "Sales", value: "Sales" },
    { key: "Marketing", value: "Marketing" },
    { key: "Finance", value: "Finance" },
  ];

  const onSumbit = (values, props) => {
    let data = {
      name: values.name,
      gender: values.gender,
      department: values.department,
      salary: values.salary,
      startDate: format(values.startDate, "dd MMM yyyy"),
      note: values.note,
    };
    EmployeeService.createEmployee(data)
      .then((response) => {
        if (response.data.success === true) {
          setTimeout(() => {
            history.push("/dashboard");
          }, 2000);
          toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        toast.error("Invalid data", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It too short").required("Enter full name"),
    gender: Yup.string().required("Select gender"),
    department: Yup.array().min(1).of(Yup.string().trim().required()),
    salary: Yup.string().required("Enter salary"),
    startDate: Yup.date().required("Enter StartDate").nullable(),
    note: Yup.string().required("Enter note"),
  });
  return (
    <Grid align="center">
      <Paper elevation={10} className="paperStyle">
        <Grid>
          <Avatar className="avatarStyle"></Avatar>
          <h2 className="headerStyle">Add Employee</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSumbit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Name"
                name="name"
                placeholder="Enter your Name"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={FormikControl}
                control="radio"
                label="Gender"
                name="gender"
                options={radioOptions}
              />
              <Field
                as={FormikControl}
                control="checkbox"
                label="Department"
                name="department"
                options={checkboxOptions}
              />
              <Field
                as={TextField}
                label="Salary"
                name="salary"
                placeholder="Enter your Salary"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="salary" />}
              />
              <FormikControl
                control="date"
                label="Start Date"
                name="startDate"
              />
              <Field
                as={TextField}
                label="Note"
                multiline
                name="note"
                placeholder="Enter your Note"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="note" />}
              />
              <Button
                type="submit"
                className="btnStyle"
                color="primary"
                variant="contained"
                fullWidth
              >
                Add Employee
              </Button>
            </Form>
          )}
        </Formik>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Paper>
    </Grid>
  );
};

export default AddEmployee;
