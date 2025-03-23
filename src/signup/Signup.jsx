import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phoneNumber: "",
  gender: "",
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
});

function Signup() {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: true, 
    validateOnBlur: true, 
    validateOnMount: true, 
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/1")
      .then((response) => setFormValues(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <form
        className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // value={formik.values.firstName}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur} => bejash az ziri estefade mikonim
            // behesh migan : Reducing Boilerplate
            {...formik.getFieldProps("firstName")}
            type="text"
            name="firstName"
            id="firstName"
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <p className="text-red-500 mt-2 text-xs">
              {formik.errors.firstName}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...formik.getFieldProps("lastName")}
            type="text"
            name="lastName"
            id="lastName"
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <p className="text-red-500 mt-2 text-xs">
              {formik.errors.lastName}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 mt-2 text-xs">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 mt-2 text-xs">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="passwordConfirm"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...formik.getFieldProps("passwordConfirm")}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <p className="text-red-500 mt-2 text-xs">
              {formik.errors.passwordConfirm}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...formik.getFieldProps("phoneNumber")}
            type="phoneNumber"
            name="phoneNumber"
            id="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p className="text-red-500 mt-2 text-xs">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="radio"
            name="gender"
            id="0"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0" className="ml-1 mr-4">
            Male
          </label>
          <input
            type="radio"
            name="gender"
            id="1"
            value="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1" className="ml-1 mr-2">
            Female
          </label>
          {formik.errors.gender && formik.touched.gender && (
            <p className="text-red-500 mt-2 text-xs">{formik.errors.gender}</p>
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
