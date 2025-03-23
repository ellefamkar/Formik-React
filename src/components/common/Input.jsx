function Input({ label, name, type = "text", formik }) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        // value={formik.values.firstName}
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur} => bejash az ziri estefade mikonim
        // behesh migan : Reducing Boilerplate
        {...formik.getFieldProps({ name })}
        type={type}
        name={name}
        id={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-red-500 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default Input;
