
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import LoadingSpinner from '../pages/shared/LoadingSpinner';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const AdminOlyRouts = ({ children }) => {
    const { user, loading } =useContext(AuthContext)
    const location = useLocation()
    const [isAdmin, isAdminLoading] = useAdmin()
    console.log(isAdmin)
    if (loading || isAdminLoading) {
        return <LoadingSpinner />
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace> </Navigate>
};

export default AdminOlyRouts;