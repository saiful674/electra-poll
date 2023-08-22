import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import LoadingSpinner from "../pages/shared/LoadingSpinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();
  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  else if (user) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login"></Navigate>;

};

export default PrivateRoutes;
