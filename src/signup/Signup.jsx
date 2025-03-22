import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  phoneNumber: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Name length is short.")
    .max(50, "Name is too long!")
    .required("Name is Required"),
  email: Yup.string()
    .email("Invalid email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
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
          <label htmlFor="userName">Name</label>
          <input
            {...formik.getFieldProps("userName")}
            type="text"
            name="userName"
            id="userName"
          />
          {formik.errors.userName && formik.touched.userName && (
            <p>{formik.errors.userName}</p>
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
