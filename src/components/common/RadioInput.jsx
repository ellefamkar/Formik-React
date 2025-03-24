import React from "react";

function RadioInput({ formik, name, radioOptions }) {
  return (
    <div className="mb-4">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            className="cursor-pointer"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
          />
          <label htmlFor={item.value} className="ml-1 mr-4 cursor-pointer">
            {item.label}
          </label>
        </React.Fragment>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-amber-600 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default RadioInput;
