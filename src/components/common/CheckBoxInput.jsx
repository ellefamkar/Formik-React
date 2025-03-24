import React from "react";

function CheckBoxInput({ checkBoxOptions, name, formik }) {
  return (
    <div className="mb-4">
      {checkBoxOptions.map((item) => {
        const isChecked = formik.values[name].includes(item.value);

        return (
          <React.Fragment key={item.value}>
            <input
              type="checkbox"
              className="cursor-pointer"
              id={item.value}
              name={name}
              value={item.value}
              checked={isChecked}
              onChange = {(e) => {
                let newValues = [...formik.values[name]];
                if (e.target.checked) {
                  newValues.push(item.value); 
                } else {
                  newValues = newValues.filter((val) => val !== item.value); // Remove unchecked value
                }
                formik.setFieldValue(name, newValues); 
                formik.setTouched({ ...formik.touched, [name]: true }, false); // Mark as touched
              }}
            />
            <label htmlFor={item.value} className="ml-1 mr-4 cursor-pointer">
              {item.label}
            </label>
          </React.Fragment>
        );
      })}
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-amber-600 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default CheckBoxInput;
