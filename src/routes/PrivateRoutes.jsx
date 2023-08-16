import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <span className="loading loading-bars loading-lg text-black"></span>
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    return <Navigate state={{ from: location }} to="/login"></Navigate>;
  }
};

export default PrivateRoutes;
