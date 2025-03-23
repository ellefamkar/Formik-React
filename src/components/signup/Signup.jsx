// import React, { useEffect, useState } from "react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import Input from "../common/Input";
import RadioInput from "../common/RadioInput";
import SelectOptionInput from "../common/SelectOptionInput";
import CheckBoxInput from "../common/CheckBoxInput";
import axios from "axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phoneNumber: "",
  gender: "",
  nationality: "",
  courses: [],
  terms: false,
};

const onSubmit = (values) => {
  alert(values);
  axios
    .post("http://localhost:3000/users/", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name length is short.")
    .max(50, "First name is too long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Family name length is short.")
    .max(50, "Family name is too long!")
    .required("Family name is required"),
  email: Yup.string()
    .email("Invalid email Format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirm: Yup.string()
    .required("Confirm Password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .nullable(),
  gender: Yup.string().required("Choose your gender."),
  nationality: Yup.string().required("Nationality is required"),
  courses: Yup.array()
    .min(1, "At Least one course should be chosen.")
    .required("At Least one course should be chosen."),
  terms: Yup.boolean().oneOf(
    [true],
    "The terms and conditions must be accepted."
  ),
});

const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];

const selectOptions = [
  { label: "Select Nationality", value: "" },
  { label: "Australia", value: "AUS" },
  { label: "Canada", value: "CA" },
  { label: "New Zeland", value: "NZ" },
  { label: "Iran", value: "IR" },
];

const checkBoxOptions = [
  { label: "ReactJS", value: "ReactJS" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "NextJS", value: "NextJS" },
];

function Signup() {

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: true, 
    validateOnBlur: true, 
    validateOnMount: true, 

  });
  console.log(formik.values);

  return (
    <div>
      <form
        className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <Input
          formik={formik}
          type="text"
          name="firstName"
          label="First Name"
        />
        <Input formik={formik} type="text" name="lastName" label="Last Name" />
        <Input formik={formik} type="email" name="email" label="Email" />
        <Input
          formik={formik}
          type="password"
          name="password"
          label="Password"
        />
        <Input
          formik={formik}
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
        />
        <Input
          formik={formik}
          type="text"
          name="phoneNumber"
          label="Phone Number"
        />
        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
        <SelectOptionInput
          formik={formik}
          selectOptions={selectOptions}
          name="nationality"
        />
        <CheckBoxInput
          name="courses"
          formik={formik}
          checkBoxOptions={checkBoxOptions}
          onChange={formik.handleChange}
        />
        <div className="mb-4">
          <input
            className="cursor-pointer"
            type="checkbox"
            id="terms"
            name="terms"
            onChange={(e) => {
              formik.setFieldValue("terms", e.target.checked);
              !e.target.checked && formik.setTouched({ ...formik.touched, terms: true }, false);
              
            }}
            checked={formik.values.terms}
          />
          <label htmlFor="terms" className="ml-1 mr-4 cursor-pointer">
            I agree to the terms and conditions.
          </label>
          {formik.errors.terms && formik.touched.terms && (
            <p className="text-red-500 mt-2 text-xs">{formik.errors.terms}</p>
          )}
        </div>
        <button
          className={`font-bold py-2 px-4 rounded outline-none border-none hover:border-none focus:shadow-outline
            ${
              !formik.isValid
                ? "bg-blue-200 hover:bg-blue-300 text-gray-100 cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
            }
            `}
          type="submit"
          disabled={!formik.isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
