import React from "react";
import { useFormik } from "formik";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  let errors = {};
  if (!values.userName) errors.userName = "Name is required";
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) errors.password = "Password is required";

  return errors;
};

function Signup() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  console.log(formik.errors);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="userName">Name</label>
          <input
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
