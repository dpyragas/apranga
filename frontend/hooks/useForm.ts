import { useState } from "react";

const initState = {
  name: "",
  price: "",
  description: "",
  image: "",
};

export default function useForm(initial = initState) {
  //create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e: any) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      value = e.target.files[0];
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  // function clearForm() {
  //   const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, ""]));
  //   setInputs(blankState)
  // }

  return { inputs, handleChange, resetForm };
}
