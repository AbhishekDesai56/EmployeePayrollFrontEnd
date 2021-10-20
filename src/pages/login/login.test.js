import React, { Component } from "react";
import Login from "./login";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { shallow } from "enzyme";
import sinon from "sinon";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

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

// it("simulates click events", () => {
//   const onButtonClick = sinon.spy();
//   const wrapper = shallow(<Login onButtonClick={onButtonClick} />);
//   wrapper.find("button").simulate("click");
//   expect(onButtonClick).to.have.property("callCount", 1);
// });
// describe("SignIn", () => {
//   describe("with valid input", () => {
//     test("calls the onSubmit function", async () => {
//       const mockOnSubmit = jest.fn();
//       const { getByLabelText, getByRole } = render(
//         <Login onSubmit={mockOnSubmit} />
//       );

//       await act(async () => {
//         fireEvent.change(getByLabelText("Email"), {
//           target: { value: "bellb@gmail.com" },
//         });
//         fireEvent.change(getByLabelText("Password"), {
//           target: { value: "123456789" },
//         });
//       });

//       await act(async () => {
//         fireEvent.click(getByRole("button"));
//       });

//       expect(mockOnSubmit).not.toHaveBeenCalled();
//     });
//   });
// });
describe("Test case for testing login", () => {
  // const state = { email: "bellb@gmail.com", password: "123456789" };

  // const props = {
  //   email: state.email,
  //   password: state.password,
  //   onChange: (e) => {
  //     state[e.target.name] = e.target.value;
  //   },
  // };
  const wrapper = shallow(<Login />);

  it("Get Test of the form", () => {
    expect(wrapper.text()).toEqual(
      "Sign In<Formik /> Do you have an account?Sign Up<ToastContainer />"
    );
  });
  it("checking Formik Tag is present or not", () => {
    expect(wrapper.find("Formik").text()).toEqual("<Formik />");
  });

  it("simulate email field", () => {
    const { getByTestId } = render(<Login />);
    const emailField = getByTestId("email");
    wrapper.find(emailField).simulate("change", {
      target: { name: "email", value: "bellb@gmail.com" },
    });
    expect(wrapper.state("Login.email")).toEqual("bellb@gmail.com");
  });
  //expect(wrapper.find("input").at(1).prop("value")).toEqual("123456789");
});
