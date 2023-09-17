import React from 'react';

const VotingResults = ({ voteTitle, voteUrl }) => {
  // Share on Facebook
  const shareOnFacebook = () => {
    const shareMessage = `Check out the voting results for ${voteTitle}!`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(voteUrl)}&quote=${encodeURIComponent(shareMessage)}`);
  };

  // Share on Twitter
  const shareOnTwitter = () => {
    const tweetText = `Check out the voting results for ${voteTitle}! ${voteUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`);
  };

  // Example voting results data
  const candidates = [
    { name: "Candidate A", votes: 120 },
    { name: "Candidate B", votes: 85 },
    { name: "Candidate C", votes: 60 },
    // Add more candidates here
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-semibold mb-4">Results for {voteTitle}</h1>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index} className="flex items-center justify-between py-2">
            <span className="text-lg">{candidate.name}</span>
            <span className="text-gray-600">{candidate.votes} votes</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          className="bg-blue-500 text-white rounded py-2 px-4 mr-4 hover:bg-blue-600"
          onClick={shareOnFacebook}
        >
          Share on Facebook
        </button>
        <button
          className="bg-twitter-blue text-white rounded py-2 px-4 hover:bg-blue-600"
          onClick={shareOnTwitter}
        >
          Share on Twitter
        </button>
      </div>
    </div>
  );
};

export default VotingResults;
      