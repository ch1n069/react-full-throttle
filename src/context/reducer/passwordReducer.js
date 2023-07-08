const passWordReducer = (state, action) => {
  switch (action.type) {
    case "USER_ENTERED_PASSWORD":
      return {
        value: action.payload,
        isValid: action.payload.trim().length > 6,
      };
    case "USER_ENTERED_PASSWORD_BLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };

    default:
      return { value: "", isValid: undefined };
  }
};

export default passWordReducer;
