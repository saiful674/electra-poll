import { useEffect } from 'react';
import AdminUserName from './AdminUserName';
import ElectionHistory from './ElectionHistory';
import TotalUser from './TotalUser';
import { useState } from 'react';

const AdminHome = () => {
    const [electionData, setElectionData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/all-elections')
        .then(response => response.json())
        .then(data => setElectionData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    return (
        <div >
            
        <AdminUserName />
         <TotalUser />
         <ElectionHistory electionData={electionData} />
         
        </div>
    );
};

export default AdminHome;
