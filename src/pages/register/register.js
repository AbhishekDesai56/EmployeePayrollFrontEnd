import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const history = useHistory();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSumbit = (values, props) => {
    let data = {
      fName: values.firstName,
      lName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    EmployeeService.register(data)
      .then((response) => {
        if (response.data.success === true) {
          setTimeout(() => {
            history.push("/register");
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
    firstName: Yup.string().min(3, "It too short").required("Enter first name"),
    lastName: Yup.string().min(3, "It too short").required("Enter last name"),
    email: Yup.string().email("Enter a email").required(),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Enter a password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required(),
  });
  return (
    <Grid align="center">
      <Paper elevation={10} className="paperStyle">
        <Grid>
          <Avatar className="avatarStyle" data-testid="avatar">
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="headerStyle" data-testid="header">
            Sign Up
          </h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSumbit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form data-testid="form">
              <Field
                as={TextField}
                data-testid="firstName"
                label="First Name"
                name="firstName"
                placeholder="Enter your First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="firstName" />}
              />
              <Field
                as={TextField}
                data-testid="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Enter your Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="lastName" />}
              />
              <Field
                as={TextField}
                data-testid="email"
                label="Email"
                name="email"
                placeholder="Enter your Email Id"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                data-testid="password"
                label="Password"
                name="password"
                placeholder="Enter your Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                data-testid="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Enter your Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <Button
                data-testid="submit"
                type="submit"
                className="btnStyle"
                color="primary"
                variant="contained"
                fullWidth
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="/">Sign In Instead</Link>
        </Typography>
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

export default Register;
