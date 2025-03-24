import React from "react";

function RadioInput({ formik, name, radioOptions }) {
  return (
    <div className="mb-4 text-left">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            className="   cursor-pointer peer relative appearance-none shrink-0 w-3.5 h-3.5 border-1 border-gray-300 rounded-full -m-0.5 mr-1 bg-white shadow
           focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
           checked:bg-amber-500 checked:border-amber-500"
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
