import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import LoadingSpinner from "../pages/shared/LoadingSpinner";
import getMyInfo from "../Hooks/getMyInfo";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  const [myInfo,] = getMyInfo()
  const role = myInfo.role
  const location = useLocation();
  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  else if (user && role === 'user' ) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login"></Navigate>;

};

export default PrivateRoutes;
