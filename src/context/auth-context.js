// we use kebab case for the class names in areas
// we dont store components
import React from "react";
const AuthContext = React.createContext({ isLoggedIn: false });

export default AuthContext;
