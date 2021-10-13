import React, { useEffect, useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory, useParams } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addEmployee.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";

let initialValues = {
  name: "",
  gender: "",
  department: [],
  salary: "",
  startDate: "",
  note: "",
};

const AddEmployee = () => {
  const [employee, setEmployee] = useState(initialValues);
  const { name, gender, department, salary, startDate, note } = employee;
  const { id } = useParams();
  const radioOptions = ["Male", "Female"];
  const checkboxOptions = ["HR", "Sales", "Marketing", "Finance"];
  const history = useHistory();
  const [setDateValue, setValue] = React.useState(new Date("30 Oct 2021"));

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    EmployeeService.getEmployeeId(id)
      .then((response) => {
        setEmployee(response.data.data);
        setValue(response.data.data.startDate);
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
  }, [id]);

  const validateFunction = () => {
    if (d.length === 0) {
      toast.error("Select Department", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (employee.name === "") {
      toast.error("Enter Name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (employee.salary === "") {
      toast.error("Enter Salary", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    return true;
  };

  const onSubmit = (values, props) => {
    let isValid = validateFunction();
    if (!isValid) return;
    employee.department = d;
    employee.startDate = setDateValue;
    EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        if (response.data.success === true) {
          toast.success(response.data.message, {
            position: "bottoma-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            history.push("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        toast.error("Invalid data" + error, {
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

  const onValueChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  let d = [];
  const handleChangeChecked = (event) => {
    const index = d.indexOf(event.target.value);
    if (event.target.checked) {
      d.push(event.target.value);
    } else {
      d.splice(index, 1);
    }
  };

  return (
    <Grid align="center">
      <Paper elevation={10} className="paperStyle">
        <Grid>
          <Avatar className="avatarStyle"></Avatar>
          <h2 className="headerStyle">Edit Employee</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          // validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Name"
                placeholder="Enter your Name"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => onValueChange(e)}
                name="name"
                value={name}
                // helperText={<ErrorMessage name="name" />}
              />
              <Field as={FormControl} component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row name="gender">
                  {radioOptions.map((result) => (
                    <FormControlLabel
                      value={result}
                      control={<Radio />}
                      label={result}
                      onChange={(e) => onValueChange(e)}
                      checked={result === gender}
                      // helperText={<ErrorMessage name="gender" />}
                    />
                  ))}
                </RadioGroup>
              </Field>
              <Field as={FormControl} component="fieldset">
                <FormLabel component="legend">Department</FormLabel>
                <FormGroup row>
                  {checkboxOptions.map((result) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={result}
                          name="department"
                          defaultChecked={
                            department.includes(result) ? true : false
                          }
                          //control={<Checkbox />}
                          //onChange={(e) => onValueChange(e)}
                          onChange={(e) => handleChangeChecked(e)}
                          //checked={result.includes(department)}
                          // helperText={<ErrorMessage name="department" />}
                        />
                      }
                      label={result}
                    />
                  ))}
                </FormGroup>
              </Field>
              <Field
                as={TextField}
                label="Salary"
                name="salary"
                type="number"
                placeholder="Enter your Salary"
                variant="outlined"
                margin="normal"
                onChange={(e) => onValueChange(e)}
                value={salary}
                fullWidth
                // helperText={<ErrorMessage name="salary" />}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/dd/yyyy"
                    value={setDateValue}
                    onChange={handleChangeDate}
                    defaultDate={startDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <Field
                as={TextField}
                label="Note"
                multiline
                name="note"
                placeholder="Enter your Note"
                variant="outlined"
                margin="normal"
                onChange={(e) => onValueChange(e)}
                value={note}
                fullWidth
                // helperText={<ErrorMessage name="note" />}
              />
              <Button
                type="submit"
                className="btnStyle"
                color="primary"
                variant="contained"
                fullWidth
              >
                Update Employee
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
