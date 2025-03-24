import React from "react";

function CheckBoxInput({ checkBoxOptions, name, formik }) {
  return (
    <div className="mb-4">
      {checkBoxOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="checkbox"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          />
          <label htmlFor={item.value} className="ml-1 mr-4">
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

export default CheckBoxInput;
