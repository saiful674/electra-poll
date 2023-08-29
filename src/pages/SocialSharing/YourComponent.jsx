// Example usage of VotingResults component
import React from 'react';
import VotingResults from './VotingResults'; // Adjust the import path as needed

const YourComponent = () => {
  // Example data
  const voteTitle = "Example Voting Title";
  const voteUrl = "30vote, 70 vote"; // Replace with the actual URL

  return (
    <div>
      {/* Other content */}
      {/* ... */}
      
      {/* Use the VotingResults component */}
      <VotingResults voteTitle={voteTitle} voteUrl={voteUrl} />
    </div>
  );
};

export default YourComponent;
