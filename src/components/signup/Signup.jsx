import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "../common/Input";
import RadioInput from "../common/RadioInput";
import SelectOptionInput from "../common/SelectOptionInput";
import CheckBoxInput from "../common/CheckBoxInput";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import SingleCheckboxInput from "../common/SingleCheckboxInput";

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

const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];

const selectOptions = [
  { label: "Select Your Nationality", value: "" },
  { label: "Australia", value: "AUS" },
  { label: "Canada", value: "CA" },
  { label: "New Zeland", value: "NZ" },
  { label: "Iran", value: "IR" },
  { label: "England", value: "EN" },
];

const checkBoxOptions = [
  { label: "ReactJS", value: "ReactJS" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "NextJS", value: "NextJS" },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short!")
    .max(50, "First name is too long!")
    .required("First name is required."),
  lastName: Yup.string()
    .min(2, "Family name is too short!")
    .max(50, "Family name is too long!")
    .required("Family name is required."),
  email: Yup.string()
    .email("Invalid email Format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passRegExp,
      "Must Contain 8 Characters, one Uppercase, one Lowercase, one Number and one Special Case Character"
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

const onSubmit = (values) => {
  axios
    .post("http://localhost:3000/users/", values)
    .then((res) => {
      console.log(res.data);
      toast.success("Signup successfully submitted!", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    .catch((err) => {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
};

function Signup() {

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: true, 
    validateOnBlur: true,
    validateOnMount: true, 
  });

  return (
    <div className="w-full md:w-lg md:max-w-lg mx-auto relative my-6">
      <img
        className="absolute -top-10 right-6 md:right-52 rounded-full mb-3 w-20 h-20 object-cover mx-auto drop-shadow-md"
        src="/signup-logo.PNG"
        alt="Signup Logo"
      />
      <form
        className="text-left bg-white shadow-md inset-shadow-amber-950 rounded-2xl px-6 sm:px-8 pt-10 pb-8 mb-4"
        onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="firstName" label="First Name" />
        <Input formik={formik} name="lastName" label="Last Name" />
        <Input formik={formik} type="email" name="email" label="Email" />
        <Input formik={formik} type="password" name="password" label="Password" />
        <Input formik={formik} type="password" name="passwordConfirm" label="Confirm Password" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
        <SelectOptionInput formik={formik} selectOptions={selectOptions} name="nationality" />
        <CheckBoxInput  name="courses" formik={formik} checkBoxOptions={checkBoxOptions} onChange={formik.handleChange} />
        <SingleCheckboxInput name="terms" formik={formik} label="I agree to the terms and conditions." />
        <button
          className={`font-bold py-2 px-4 rounded outline-none border-none hover:border-none focus:shadow-outline
            ${
              !formik.isValid
                ? "bg-gray-300 hover:bg-gray-300 text-gray-100 cursor-not-allowed"
                : "bg-amber-950 text-white cursor-pointer"
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
