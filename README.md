# Welcome to my React Sign Up Form Application validated with Formik and Yup 👋

## Available Scripts

In the project directory, you can run:
### `npm start`

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

Thanks for checking out my Sign Up form app project.
Remember that "Every day is a learning day" and try to learn from everyone! 

 ### Screenshot 

<!-- ![](./src/images/Screenshot-1.png)

![](./src/images/Screenshot-2.png) -->

### Links

- Live Site URL: [React Sign Up Form Application](https://react-form-formik.netlify.app/)

## My process

### Where to find resources

The first think to do is to look for your perfect design! So let's checkout [dribble](https://dribbble.com/) for our favourite design to begin!

### Built with

- Reactjs
- Formik
- Yup Validation
- Tailwind CSS
- Flexbox/CSS Grid
- Mobile-first workflow
- Axios
- React Toastify
- Json Server

You can use any tools you like to help you complete the project. So if you got something you'd like to practice, feel free to give it a try. However, i made it responsive for all the devices, since my users should be able to: View the optimal layout depending on their device's screen size

### What I learned

This projects helped me being more familiar with the details of Formik and Yup, how to validate sign up and login forms and handle errors together with giving dynamic styles using Tailwindcss, validate form with Yup and Formik, toastify and use my css knowledge as well to create a responsive project with small details on colors,sizes and so on.

To see parts of my codes and see how you can add code snippets, see below:

``` JSX

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short!")
    .max(50, "First name is too long!")
    .required("First name is required."),
  lastName: Yup.string()
    .min(2, "Family name is too short!")
    .max(50, "Family name is too long!")
    .required("Family name is required."),
  email: Yup.string()
    .email("Invalid email Format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passRegExp,
      "Must Contain 8 Characters, one Uppercase, one Lowercase, one Number and one Special Case Character"
    ),
  passwordConfirm: Yup.string()
    .required("Confirm Password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .nullable(),
  gender: Yup.string().required("Choose your gender."),
  nationality: Yup.string().required("Nationality is required"),
  courses: Yup.array()
    .min(1, "At Least one course should be chosen.")
    .required("At Least one course should be chosen."),
  terms: Yup.boolean().oneOf(
    [true],
    "The terms and conditions must be accepted."
  ),
});

const onSubmit = (values) => {
  axios
    .post("http://localhost:3000/users/", values)
    .then((res) => {
      console.log(res.data);
      toast.success("Signup successfully submitted!", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    .catch((err) => {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
};

function Signup() {

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: true, 
    validateOnBlur: true, 
    validateOnMount: true, 
  });
  return (
    <div className="w-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-zinc-800 mb-3">Sign up</h2>
      <form
        className="text-left bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <Input formik={formik} name="firstName" label="First Name" />
        <Input formik={formik} name="lastName" label="Last Name" />
        <Input formik={formik} type="email" name="email" label="Email" />
        <Input
          formik={formik}
          type="password"
          name="password"
          label="Password"
        />
        <Input
          formik={formik}
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
        />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
        <SelectOptionInput
          formik={formik}
          selectOptions={selectOptions}
          name="nationality"
        />
        <CheckBoxInput
          name="courses"
          formik={formik}
          checkBoxOptions={checkBoxOptions}
          onChange={formik.handleChange}
        />
        <div className="mb-4">
          <input
            className="cursor-pointer"
            type="checkbox"
            id="terms"
            name="terms"
            onChange={(e) => {
              formik.setFieldValue("terms", e.target.checked);
              !e.target.checked &&
                formik.setTouched({ ...formik.touched, terms: true }, false);
            }}
            checked={formik.values.terms}
          />
          <label htmlFor="terms" className="ml-1 mr-4 cursor-pointer">
            I agree to the terms and conditions.
          </label>
          {formik.errors.terms && formik.touched.terms && (
            <p className="text-red-500 mt-2 text-xs">{formik.errors.terms}</p>
          )}
        </div>
        <button
          className={` font-bold py-2 px-4 rounded outline-none border-none hover:border-none focus:shadow-outline
            ${
              !formik.isValid
                ? "bg-blue-200 hover:bg-blue-300 text-gray-100 cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
            }
            `}
          type="submit"
          disabled={!formik.isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function RadioInput({ formik, name, radioOptions }) {
  return (
    <div className="mb-4">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
          />
          <label htmlFor={item.value} className="ml-1 mr-4">
            {item.label}
          </label>
        </React.Fragment>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-red-500 mt-2 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );
}

```
```Tailwind CSS

    <button
        className={` font-bold py-2 px-4 rounded outline-none border-none hover:border-none focus:shadow-outline
            ${
              !formik.isValid
                ? "bg-blue-200 hover:bg-blue-300 text-gray-100 cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
            }
            `}
        type="submit"
        disabled={!formik.isValid}>
        Submit
    </button>

    <input
        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        focus:shadow-gray-400 focus:-translate-0.2
        "
        {...formik.getFieldProps({ name })}
        type={type}
        name={name}
        id={name}
    />

```

### Useful resources

In order to do this project in a correct way you need to have a good knowledge of html and css, js and reactjs so let's master at them with these fruitful resources.

- [w3schools](https://www.w3schools.com/) - This helps you a lot with both your css and html which is easy to read and has numerous examples.
- [MDN](https://developer.mozilla.org/en-US/) - Remember that no matter how many tutorial videos you have watched, you always need to learn details and features from codes documentations
- [codeacademy](https://www.codecademy.com/)
- [udemy](https://www.udemy.com/) - Here you can find a number of tutorials in different languages
- [coursera](https://www.coursera.org/)

## Author

- Website - [Elle Famkar](https://ellefamkar.com/)
- Twitter - [@Ellefamkar](https://www.twitter.com/ellefamkar)

Feel free to ask any questions come to your mind  and send me message via my current temporary website in the link above!

## Acknowledgments

I am thankful to each and every person in this area who teaches me a single piece of code! I learn every single day from amazing people! so I need to thank you all ❤

**Have fun using this project!** 🚀
