import React from "react";

function SingleCheckboxInput({ formik, label, name }) {
  return (
    <div className="mb-4">
      <input
        className="
           cursor-pointer peer relative appearance-none shrink-0 w-3.5 h-3.5 border-1 border-gray-300 rounded -m-0.5 mr-1 bg-white shadow
           focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
           checked:bg-amber-500 checked:border-amber-500
         "
        type="checkbox"
        id={name}
        name={name}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.checked);
        }}
        onBlur={() => {
          formik.setTouched({ ...formik.touched, [name]: true });
        }}
        checked={formik.values[name]}
      />
      <label htmlFor={name} className="ml-1 cursor-pointer">
        {label}
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-amber-600 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default SingleCheckboxInput;
