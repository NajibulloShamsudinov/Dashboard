import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isLogged = sessionStorage.getItem("isLogged");

  return isLogged == "true" ? children : <Navigate to="/signIn" />;
};

export default RequireAuth;
