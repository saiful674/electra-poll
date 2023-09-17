import { useEffect } from 'react';
import AdminUserName from './AdminUserName';
import ElectionHistory from './ElectionHistory';
import TotalUser from './TotalUser';
import { useState } from 'react';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import BlogHistory from './BlogHistory';

const AdminHome = () => {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`${import.meta.env.VITE_URL}/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogData(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // There's an error, set loading to false
            });
    }, [])
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div >

            <AdminUserName />
            <TotalUser />
            <ElectionHistory  />
            <BlogHistory blogData={blogData} />

        </div>
    );
};

export default AdminHome;