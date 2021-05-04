import { useState } from "react";

const useForm = (validateFun, valueList) => {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState(valueList);

  const validateForm = (values, validateFun) => {
    const err = {};
    validateFun.forEach((fun) => {
      fun(values, err);
    });
    return err;
  };

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrors(validateForm(values, validateFun));
  };

  return { handleChange, handleSubmit, errors };
};

export default useForm;
