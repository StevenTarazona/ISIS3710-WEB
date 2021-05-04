import React from "react";
import ReactDOM from "react-dom";
import SignForm from "./components/signForm";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const inputs = [
  {
    type: "text",
    name: "username",
    placeholder: "Username",
    validate: (values, err) => {
      if (values.username.length === 0) {
        err.username = "Length of username is too short";
      }
    },
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email",
    validate: (values, err) => {
      if (values.email.length === 0) {
        err.email = "Length of email is too short";
      }
    },
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    validate: (values, err) => {
      if (values.password.length < 5) {
        err.password = "Length of password is too short";
      }
    },
  },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm password",
    validate: (values, err) => {
      if (values.password !== values.confirmPassword) {
        err.confirmPassword = "Passwords must match";
      }
    },
  },
];

ReactDOM.render(<SignForm inputs={inputs} />, document.getElementById("root"));
