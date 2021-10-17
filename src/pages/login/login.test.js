import React from "react";
import Login from "./login";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

test("header render with correct text", () => {
  const { getByTestId } = render(<Login />);
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("Sign In");
});

test("check if component is display properly", () => {
  const { getByTestId } = render(<Login />);
  const avatarEl = getByTestId("avatar");
  const formEl = getByTestId("form");
  expect(avatarEl).toBeInTheDocument();
  expect(formEl).toBeInTheDocument();
});

test("login input with correct text field", () => {
  const { getByTestId } = render(<Login />);
  const emailField = getByTestId("email");
  const passwordField = getByTestId("password");

  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
});

describe("SignIn", () => {
  describe("with valid input", () => {
    test("calls the onSubmit function", async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByRole } = render(
        <Login onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        fireEvent.change(getByLabelText("Email"), {
          target: { value: "bellb@gmail.com" },
        });
        fireEvent.change(getByLabelText("Password"), {
          target: { value: "123456789" },
        });
      });

      await act(async () => {
        fireEvent.click(getByRole("button"));
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
