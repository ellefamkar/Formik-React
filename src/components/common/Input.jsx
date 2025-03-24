function Input({ label, name, type = "text", formik }) {
  return (
    <div className="mb-4 text-left">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
        htmlFor={name}
      >
        {label} {name !== "phoneNumber" ? (<span className="text-amber-500"> * </span>) : ""}
      </label>
      <input
        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight transition delay-100 focus:outline-none focus:shadow-outline
        focus:shadow-amber-950 focus:-translate-0.2
        hover:shadow-amber-950"
        {...formik.getFieldProps({ name })}
        type={type}
        name={name}
        id={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-amber-600 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default Input;
