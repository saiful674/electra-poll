import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import LoadingSpinner from "../pages/shared/LoadingSpinner";
import getMyInfo from "../Hooks/getMyInfo";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { myInfo, userLoading } = getMyInfo()
  const role = myInfo.role
  console.log(user, myInfo);
  const location = useLocation();
  if (loading || userLoading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  else if (user && role === 'user') {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login"></Navigate>;

};

export default PrivateRoutes;
