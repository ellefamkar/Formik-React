import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  successMsg: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name length is short.")
    .max(50, "First name is too long!")
    .required("First name is Required"),
  lastName: Yup.string()
    .min(2, "Family name length is short.")
    .max(50, "Family name is too long!")
    .required("Family name is Required"),
  email: Yup.string()
    .email("Invalid email Format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must be matched!"
  ),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .nullable(),
});

function Signup() {

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            {...formik.getFieldProps("firstName")}
            type="text"
            name="firstName"
            id="firstName"
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <p>{formik.errors.firstName}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            {...formik.getFieldProps("lastName")}
            type="text"
            name="lastName"
            id="lastName"
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <p>{formik.errors.lastName}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...formik.getFieldProps("confirmPassword")}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p>{formik.errors.confirmPassword}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            {...formik.getFieldProps("phoneNumber")}
            type="phoneNumber"
            name="phoneNumber"
            id="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p>{formik.errors.phoneNumber}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
