import { useApp } from "../../../AppContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, isAuth }) {
  const { token } = useApp();

  if (isAuth) {
    return token ? <Navigate to="/" /> : element;
  }

  return token ? element : <Navigate to="/signin" />;
}

export default ProtectedRoute;
