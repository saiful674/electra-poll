import { useEffect } from 'react';
import AdminUserName from './AdminUserName';
import ElectionHistory from './ElectionHistory';
import TotalUser from './TotalUser';
import { useState } from 'react';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import BlogHistory from './BlogHistory';

const AdminHome = () => {
    const [electionData, setElectionData] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/all-elections')
            .then(response => response.json())
            .then(data => {
                setElectionData(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
                setLoading(false)
            });
    }, []);
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/blogs`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
            <ElectionHistory electionData={electionData} />
            <BlogHistory blogData={blogData} />

        </div>
    );
};

export default AdminHome;