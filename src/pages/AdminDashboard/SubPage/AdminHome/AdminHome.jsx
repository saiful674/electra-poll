import React from 'react';
import ImportantNotice from '../../../Dashboard/SubPages/Overview/ImportantNotice';
import TotalElection from '../../../Dashboard/SubPages/Overview/TotalElection';
import UserVotingHistory from '../../../Dashboard/SubPages/Overview/userVotingHistory';
import CommunityEngagement from '../../../Dashboard/SubPages/Overview/CommunityEngagement';
import PersonalizedRecommendations from '../../../Dashboard/SubPages/Overview/PersonalizedRecommendations';
import UpcomingAndRecentElection from '../../../Dashboard/SubPages/Overview/UpcomingAndRecentElection ';
import AdminUserName from './AdminUserName';

const AdminHome = () => {
 
  
    return (
        <div >
        <AdminUserName />
          <div>
          <ImportantNotice></ImportantNotice>
         <TotalElection></TotalElection>
        <UpcomingAndRecentElection></UpcomingAndRecentElection>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-6 '>
        <UserVotingHistory></UserVotingHistory>
        <CommunityEngagement></CommunityEngagement>
        </div>
       <PersonalizedRecommendations></PersonalizedRecommendations>
            </div>
        </div>
    );
};

export default AdminHome;
