
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../pages/shared/LoadingSpinner';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import getMyInfo from '../Hooks/getMyInfo';

const AdminOlyRouts = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const { myInfo } = getMyInfo()
    const role = myInfo.role
    const location = useLocation()
    if (loading) {
        return <LoadingSpinner />
    }
    if (user && role === 'admin') {
        return children
    }
    return <Navigate state={{ from: location }} to="/login"></Navigate>;

};

export default AdminOlyRouts;