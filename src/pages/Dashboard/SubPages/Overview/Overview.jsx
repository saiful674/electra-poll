import React from 'react';
import UserName from '../../../../components/Deshboard/UserName/UserName';
import TotalElection from './TotalElection';
import UpcomingAndRecentElection from './UpcomingAndRecentElection ';
import UserVotingHistory from './userVotingHistory';
import CommunityEngagement from './CommunityEngagement';
import ImportantNotice from './ImportantNotice';
import PersonalizedRecommendations from './PersonalizedRecommendations';

const Overview = () => {
 
  
    return (
        <div >
          <UserName></UserName>
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

export default Overview;
