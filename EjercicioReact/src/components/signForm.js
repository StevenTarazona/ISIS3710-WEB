import React from "react";
import useForm from "../customHooks/useForm";

const SignForm = (props) => {
  const inputs = props.inputs;
  var valueList = {};
  var validateFun = [];
  for (let i = 0; i < inputs.length; i++) {
    valueList[inputs[i].name] = "";
    validateFun.push(inputs[i].validate);
  }

  const { handleChange, handleSubmit, errors } = useForm(
    validateFun,
    valueList
  );
  
  return (
    <div>
      <h1>Register form</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((t) => (
          <div className="form-group" key={t.name}>
            <label htmlFor="username">{t.placeholder}</label>
            <input
              type={t.type}
              className="form-control"
              name={t.name}
              placeholder={t.placeholder}
              onChange={handleChange}
              id={t.name}
            />
            {errors[t.name] && <p>{errors[t.name]}</p>}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default SignForm;
