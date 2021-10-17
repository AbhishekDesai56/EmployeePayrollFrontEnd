import React from "react";
import EditEmployee from "./editEmployee";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("edit header render with correct text", () => {
  const { getByTestId } = render(<EditEmployee />);
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("Edit Employee");
});

test("check if edit component is display properly", () => {
  const { getByTestId } = render(<EditEmployee />);
  const avatarEl = getByTestId("avatar");
  const formEl = getByTestId("form");
  expect(avatarEl).toBeInTheDocument();
  expect(formEl).toBeInTheDocument();
});

test("edit employee input with correct text field", () => {
  const { getByTestId } = render(<EditEmployee />);
  const nameField = getByTestId("name");
  const department = getByTestId("department");
  const salary = getByTestId("salary");
  const startDate = getByTestId("startDate");
  const note = getByTestId("note");
  const submit = getByTestId("submit");
  expect(nameField).toBeInTheDocument();
  expect(department).toBeInTheDocument();
  expect(salary).toBeInTheDocument();
  expect(startDate).toBeInTheDocument();
  expect(note).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});
