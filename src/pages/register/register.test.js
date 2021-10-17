import React from "react";
import Register from "./register";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header render with correct text", () => {
  const { getByTestId } = render(<Register />);
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("Sign Up");
});

test("check if component is display properly", () => {
  const { getByTestId } = render(<Register />);
  const avatarEl = getByTestId("avatar");
  const formEl = getByTestId("form");
  expect(avatarEl).toBeInTheDocument();
  expect(formEl).toBeInTheDocument();
});

test("register input with correct text field", () => {
  const { getByTestId } = render(<Register />);
  const firstNameField = getByTestId("firstName");
  const lastNameField = getByTestId("lastName");
  const email = getByTestId("email");
  const password = getByTestId("password");
  const confirmPassword = getByTestId("confirmPassword");
  const submit = getByTestId("submit");
  expect(firstNameField).toBeInTheDocument();
  expect(lastNameField).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(confirmPassword).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});
