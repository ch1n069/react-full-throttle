import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import emailReducer from "../../context/reducer/emailReducer";
import passwordReducer from "../../context/reducer/passwordReducer";

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // our reducer
  const [userEnteredEmail, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  // reducer for the password input
  const [userEnteredPassword, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });
  //side effect to check if the form is valid
  //side effects are http requests, timers, event listeners, checking form validity
  useEffect(() => {
    // this is to make the check happen after 5 milliseconds
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        userEnteredEmail.value.includes("@") &&
          enteredPassword.trim().length > 6
      );
    }, 500);
    // a clean up function
    return () => {
      console.log("CLEANUP");
      // clear the timer if the user is still typing
      clearTimeout(identifier);
    };
  }, [userEnteredEmail, enteredPassword]);

  // grab the value of the entered email
  const emailChangeHandler = (e) => {
    // make use of our dispatch function
    // which takes in an object and the payload from the field
    dispatchEmail({ type: "USER_INPUT", payload: e.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      userEnteredEmail.isValid &&
        userEnteredEmail.value.includes("@") &&
        event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(userEnteredEmail.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            userEnteredEmail.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={userEnteredEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
