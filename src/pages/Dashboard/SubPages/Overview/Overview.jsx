import React from 'react';
import UserName from '../../../../components/Deshboard/UserName/UserName';
import UpcomingAndRecentElection from './UpcomingAndRecentElection ';
import ImportantNotice from './ImportantNotice';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import TotalElection from './TotalElection';
import ElectionStatusPercentage from './ElectionStatusPercentage';
import UserVotingHistory from './UserVotingHistory';

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
     <ElectionStatusPercentage></ElectionStatusPercentage>
        </div>
       <PersonalizedRecommendations></PersonalizedRecommendations>
            </div>
            {/* TODO: This feature start last week */}
            {/* <BallonDOrVoting></BallonDOrVoting> */}
        </div>
    );
};

export default Overview;
