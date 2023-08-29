import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: isAdmin, isLoading: isAdminLoading, isError } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/admin/${user?.email}`);
        return res.data;
      } catch (error) {
        // Handle error here
        console.error('Error fetching isAdmin:', error);
        throw error; // Rethrow the error to mark the query as errored
      }
    }
  });
  
  return [isAdmin, isAdminLoading, isError];
};

export default useAdmin;

