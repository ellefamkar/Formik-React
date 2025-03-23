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
        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        focus:shadow-gray-400 focus:-translate-0.2
        "
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
