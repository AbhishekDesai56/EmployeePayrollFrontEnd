import React, { Component } from "react";
import Login from "./login";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

const findByDataAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};

const wait = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const updateFormikField = async (nativeFieldWrapper, targetName, value) => {
  // simulate focus event
  await act(async () => {
    nativeFieldWrapper.simulate("focus");
  });
  // updates values and errors
  await act(async () => {
    nativeFieldWrapper.simulate("change", {
      persist: () => {},
      target: { name: targetName, value },
    });
  });
  // updates touched
  await act(async () => {
    nativeFieldWrapper.simulate("blur", {
      persist: () => {},
      target: { name: targetName },
    });
  });

  await wait(0);
};

const submitFormikForm = async (nativeFormWrapper, elements = {}) => {
  await act(async () => {
    nativeFormWrapper.simulate("submit", {
      preventDefault: () => {},
      ...elements,
    });
  });
  await wait(0);
};

describe("LoginIn Component", () => {
  let component;

  beforeEach(() => {
    component = mount(<Login />);
  });
  it("should have email input field", () => {
    const emailCheck = findByDataAttr(component, "emailInput"); //toBe just checks that a value is what you expect. It uses === to check strict equality.
    // console.log(emailCheck.debug());
    expect(emailCheck.length).toBe(6);
  });

  it("should have password input field", () => {
    const passwordCheck = findByDataAttr(component, "passwordInput");
    expect(passwordCheck.length).toBe(6);
  });

  it("should have submit button", () => {
    const submitCheck = findByDataAttr(component, "submitButton");
    expect(submitCheck.length).toBe(6);
  });
});

describe("Components Test", () => {
  let component;

  beforeEach(() => {
    component = mount(<Login />);
  });

  it("should error if filled invaild value in email input", async () => {
    const emailInput = component.find(`input[name="email"]`).first();
    await updateFormikField(emailInput, "email", "invalidEmail");
    emailInput.update();
    const formikEmailInput = findByDataAttr(component, "emailInput").first();
    //console.log(formikEmailInput.debug());
    expect(formikEmailInput.props().helperText).toEqual("Enter a mail");
  });

  it("should error if empty value in email input", async () => {
    const emailInput = component.find(`input[name="email"]`).first();
    await updateFormikField(emailInput, "email", "");
    emailInput.update();
    const formikEmailInput = findByDataAttr(component, "emailInput").first();
    // console.log(formikEmailInput.debug());
    expect(formikEmailInput.props().helperText).toEqual(
      "email is a required field"
    );
  });

  it("should not have error if valid email value", async () => {
    const emailInput = component.find(`input[name="email"]`).first();
    await updateFormikField(emailInput, "email", "bellb@gmail.com");
    emailInput.update();
    const formikEmailInput = findByDataAttr(component, "emailInput").first();
    //console.log(formikEmailInput.debug());
    expect(formikEmailInput.props().error).toBeUndefined();
  });

  describe("Form Submit tests", () => {
    let component;
    const onLogin = jest.fn();
    beforeEach(() => {
      component = mount(<Login onSubmit={onLogin} />);
    });

    it("should not submit form if email and password are invalid", async () => {
      const form = component.find(`form`).first();
      const emailInput = component.find(`input[name="email"]`).first();
      const passInput = component.find(`input[name="password"]`).first();
      await updateFormikField(emailInput, "email", "");
      await updateFormikField(passInput, "password", "");
      emailInput.update();
      passInput.update();
      await submitFormikForm(form);
      expect(onLogin).toHaveBeenCalledTimes(1); //Use .toHaveBeenCalledTimes to ensure that a mock function got called exact number of times.
    });

    it("should submit form if email and password are valid", async () => {
      const form = component.find(`form`).first();
      await submitFormikForm(form, {
        elements: { email: "bellb@gmail.com", password: "123456789" },
      });
      expect(onLogin).toHaveBeenCalledTimes(1);
    });
  });
  it("should error if password input is empty", async () => {
    const passInput = component.find(`input[name="password"]`).first();
    await updateFormikField(passInput, "password", "");
    passInput.update();
    const formikPassInput = findByDataAttr(component, "passwordInput").first();
    //console.log(formikPassInput.debug());
    expect(formikPassInput.props().helperText).toContain("Please a password");
  });
});
