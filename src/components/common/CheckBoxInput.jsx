import React from "react";

function CheckBoxInput({ checkBoxOptions, name, formik }) {
  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:flex-wrap">
        {checkBoxOptions.map((item) => {
          const isChecked = formik.values[name].includes(item.value);

          return (
            <div key={item.value}>
              <input
                type="checkbox"
                className="   cursor-pointer peer relative appearance-none shrink-0 w-3.5 h-3.5 border-1 border-gray-300 rounded -m-0.5 mr-1 bg-white shadow
                focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
               checked:bg-amber-500 checked:border-amber-500"
                id={item.value}
                name={name}
                value={item.value}
                checked={isChecked}
                onChange={(e) => {
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
            </div>
          );
        })}
      </div>

      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-amber-600 mt-2 text-xs block">
            {formik.errors[name]}
          </p>
        )}
      </div>
    </div>
  );
}

export default CheckBoxInput;
