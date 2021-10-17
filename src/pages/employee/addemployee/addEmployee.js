import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import EmployeeService from "../../../services/employee.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../employee/employee.scss";
import { format } from "date-fns";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";

const AddEmployee = () => {
  const history = useHistory();
  const [setDateValue, setValue] = React.useState(new Date());
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
  const userData = [
    { name: "HR", isChecked: false },
    { name: "Sales", isChecked: false },
    { name: "Marketing", isChecked: false },
    { name: "Finance", isChecked: false },
  ];

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  const onSumbit = (values, props) => {
    values.department = users;
    values.startDate = setDateValue;
    let data = {
      name: values.name,
      gender: values.gender,
      department: values.department,
      salary: String(values.salary),
      startDate: format(values.startDate, "dd MMM yyyy"),
      note: values.note,
    };
    console.log(data);
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
        console.log(error);
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
    salary: Yup.number().required("Enter salary"),
    note: Yup.string().required("Enter note"),
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempUser = users.map((user) =>
      user.name === name ? { ...user, isChecked: checked } : user
    );
    setUsers(tempUser);
  };

  return (
    <Grid align="center">
      <Paper elevation={10} className="paperStyle">
        <Grid>
          <Avatar className="avatarContainer" data-testid="avatar"></Avatar>
          <h2 className="headerStyle" data-testid="header">
            Add Employee
          </h2>
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
                data-testid="name"
                label="Name"
                name="name"
                placeholder="Enter your Name"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="name" />}
              />
              <Field as={FormControl} component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup name="gender" row>
                  {radioOptions.map((result) => (
                    <FormControlLabel
                      value={result.key}
                      control={<Radio name="gender" />}
                      label={result.key}
                      helperText={<ErrorMessage name="gender" />}
                    />
                  ))}
                </RadioGroup>
              </Field>
              <Field as={FormControl} component="fieldset">
                <FormLabel component="legend">Department</FormLabel>
                <FormGroup row data-testid="department">
                  {users.map((result) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={result.name}
                          checked={result.isChecked ? true : false}
                          control={<Checkbox />}
                          onChange={handleChange}
                          helperText={<ErrorMessage name="department" />}
                        />
                      }
                      label={result.name}
                    />
                  ))}
                </FormGroup>
              </Field>
              <Field
                as={TextField}
                data-testid="salary"
                label="Salary"
                name="salary"
                type="number"
                placeholder="Enter your Salary"
                variant="outlined"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="salary" />}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    name="startDate"
                    label="Start Date"
                    inputFormat="MM/dd/yyyy"
                    value={setDateValue}
                    onChange={handleChangeDate}
                    defaultDate={setDateValue}
                    renderInput={(params) => (
                      <TextField {...params} data-testid="startDate" />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
              <Field
                as={TextField}
                data-testid="note"
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
                data-testid="submit"
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
