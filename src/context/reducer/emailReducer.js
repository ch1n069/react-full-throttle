// reducer recieves data
const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.payload, isValid: action.payload.includes("@") };

    default:
      return state;
  }
};

export default emailReducer;
