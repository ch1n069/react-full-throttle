export const passWordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT_PASSWORD":
      return;

    default:
      return { state };
  }
};
