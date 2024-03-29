import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import EmployeeService from "../../../services/employee.service";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import "../../employee/employee.scss";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  let dept = [];
  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    await EmployeeService.getAllEmployees()
      .then((response) => {
        if (response.data.success === true) {
          console.log(response.data.data[0].department);
          setEmployees(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleDelete = (id) => {
    EmployeeService.deleteEmployee(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Department</StyledTableCell>
            <StyledTableCell align="right">Salary</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">Note</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <StyledTableRow key={employee.name}>
              <StyledTableCell component="th" scope="row">
                {employee.name}
              </StyledTableCell>
              <StyledTableCell align="right">{employee.gender}</StyledTableCell>
              <StyledTableCell align="right">
                {employee.department.forEach((element) =>
                  element.isChecked
                    ? dept.length === 0
                      ? dept.push(element.name)
                      : dept.push(`, ${element.name}`)
                    : ""
                )}
                {dept}
                {dept.splice(0, dept.length)}
              </StyledTableCell>
              <StyledTableCell align="right">{employee.salary}</StyledTableCell>
              <StyledTableCell align="right">
                {employee.startDate}
              </StyledTableCell>
              <Tooltip title={employee.note}>
                <StyledTableCell align="right" className="descriptionCell">
                  {employee.note}
                </StyledTableCell>
              </Tooltip>
              <StyledTableCell align="right">
                <Button component={Link} to={`editemployee/${employee._id}`}>
                  <EditIcon />
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(employee._id);
                  }}
                >
                  <DeleteIcon color="secondary" />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
