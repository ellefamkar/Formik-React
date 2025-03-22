import "./App.css";
import Signup from "./signup/Signup";

function App() {
  return (
    <>
      <Signup />
    </>
  );
}

export default App;

// install formik => npm i formik (npm install formik --save)
// 1. manage state
// 2. handle form submission
// 3. form validation 

// we use Formik for it
// ==> use useFormik Hook 
// => state management + error handling
// 1. useFormik hook -> 1.initialValues 2.onSubmit 3.validate
// for error handling we use ==>  "Yup" => npm install yup --save