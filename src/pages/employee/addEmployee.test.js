import React from "react";
import AddEmployee from "./addEmployee";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header render with correct text", () => {
  const { getByTestId } = render(<AddEmployee />);
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("Add Employee");
});

test("check if component is display properly", () => {
  const { getByTestId } = render(<AddEmployee />);
  const avatarEl = getByTestId("avatar");
  const formEl = getByTestId("form");
  expect(avatarEl).toBeInTheDocument();
  expect(formEl).toBeInTheDocument();
});

test("add employee input with correct text field", () => {
  const { getByTestId } = render(<AddEmployee />);
  const nameField = getByTestId("name");
  const genderField = getByTestId("gender");
  const department = getByTestId("department");
  const salary = getByTestId("salary");
  const startDate = getByTestId("startDate");
  const note = getByTestId("note");
  const submit = getByTestId("submit");
  expect(nameField).toBeInTheDocument();
  expect(genderField).toBeInTheDocument();
  expect(department).toBeInTheDocument();
  expect(salary).toBeInTheDocument();
  expect(startDate).toBeInTheDocument();
  expect(note).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});
