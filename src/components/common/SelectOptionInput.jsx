function SelectOptionInput({ formik, selectOptions, name }) {
  return (
    <div className="mb-4 text-left">
      <select
        className="w-full px-2 py-1 border outline-0 outline-offset-0 border-gray-100 hover:shadow-amber-950 transition shadow rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
        {...formik.getFieldProps(name)}
        name={name}
      >
        {selectOptions.map((item) => (
          <option
            key={item.value}
            value={item.value}
            className={`cursor-pointer ${
              item.value === ""
                ? "bg-gray-300 text-gray-100 hover:bg-gray-300 cursor-none"
                : "bg-white cursor-pointer"
            }`}
          >
            {item.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-amber-600 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default SelectOptionInput;
