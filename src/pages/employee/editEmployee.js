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

const EditEmployee = () => {
  const [employee, setEmployee] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const { name, gender, department, salary, startDate, note } = employee;
  const { id } = useParams();
  const radioOptions = ["Male", "Female"];
  const history = useHistory();
  const [setDateValue, setValue] = React.useState(new Date());

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    EmployeeService.getEmployeeId(id)
      .then((response) => {
        console.log(response.data.data);
        setEmployee(response.data.data);
        setValue(new Date(response.data.data.startDate));
        setUsers(response.data.data.department);
        console.log(users);
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
    employee.department = users;
    let isValid = validateFunction();
    if (!isValid) return;

    employee.startDate = format(setDateValue, "dd MMM yyyy");
    EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        if (response.data.success === true) {
          console.log("Getting Response");
          console.log(response.data.message);
          toast.success(response.data.message, {
            position: "bottom-right",
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

  const handleChangeChecked = (event) => {
    const { name, checked } = event.target;
    let tempUser = users.map((user) =>
      user.name === name ? { ...user, isChecked: checked } : user
    );
    setUsers(tempUser);
  };

  return (
    <Grid align="center">
      <Paper elevation={10} className="paperStyle">
        <Grid>
          <Avatar className="avatarContainer"></Avatar>
          <h2 className="headerStyle">Edit Employee</h2>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                    />
                  ))}
                </RadioGroup>
              </Field>
              <Field as={FormControl} component="fieldset">
                <FormLabel component="legend">Department</FormLabel>
                <FormGroup row>
                  {users.map((result) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={result.name}
                          checked={result.isChecked ? true : false}
                          control={<Checkbox />}
                          onChange={handleChangeChecked}
                        />
                      }
                      label={result.name}
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

export default EditEmployee;
