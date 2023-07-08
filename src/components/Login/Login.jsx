import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import emailReducer from "../../context/reducer/emailReducer";
import passwordReducer from "../../context/reducer/passwordReducer";
import AuthContext from "../../context/auth-context";

const Login = (props) => {
  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

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
  //side effect
  // make use of alias alias assignemer
  const { isValid: emailIsValid1 } = userEnteredEmail;
  const { isValid: passwordIsValid } = userEnteredPassword;
  //to check if the form is valid
  //side effects are http requests, timers, event listeners, checking form validity
  useEffect(() => {
    // this is to make the check happen after 5 milliseconds
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid1 && passwordIsValid);
    }, 500);
    // a clean up function
    return () => {
      console.log("CLEANUP");
      // clear the timer if the user is still typing
      clearTimeout(identifier);
    };
  }, [emailIsValid1, passwordIsValid]);

  // grab the value of the entered email
  const emailChangeHandler = (e) => {
    // make use of our dispatch function
    // which takes in an object and the payload from the field
    dispatchEmail({ type: "USER_INPUT", payload: e.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  // grab the value for the entered password
  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_ENTERED_PASSWORD",
      payload: event.target.value,
    });

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
    dispatchPassword({ type: "USER_ENTERED_PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(userEnteredEmail.value, userEnteredPassword.value);
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
            userEnteredPassword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userEnteredPassword.value}
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
