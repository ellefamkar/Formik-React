import React from "react";

function SingleCheckboxInput({ formik, label, name }) {
  return (
    <div className="mb-4">
      <input
        className="cursor-pointer"
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
      <label htmlFor={name} className="ml-1 mr-4 cursor-pointer">
        {label}
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-amber-600 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default SingleCheckboxInput;
