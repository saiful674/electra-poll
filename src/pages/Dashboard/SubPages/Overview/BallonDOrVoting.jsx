import React, { useContext, useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { AuthContext } from '../../../../Providers/AuthProvider';
import image from '../../../../assets/company/company-logo (1).png';

const BallonDOrVoting = () => {
    const { user } = useContext(AuthContext);
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState({});
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [votingCompleted, setVotingCompleted] = useState(false);

    useEffect(() => {
        // Fetch candidates from your API or data source
        // For simplicity, we're using a static list here
        const fetchedCandidates = [
            { id: 1, name: 'Candidate A', image: image, details: 'Details for Candidate A' },
            { id: 2, name: 'Candidate B', image: image, details: 'Details for Candidate B' },
            { id: 3, name: 'Candidate C', image: 'candidateC.jpg', details: 'Details for Candidate C' },
            { id: 4, name: 'Candidate D', image: 'candidateD.jpg', details: 'Details for Candidate D' },
        ];
        setCandidates(fetchedCandidates);
    }, []);

    const handleVote = () => {
        if (selectedCandidate && user?.email) {
            // Update the votes object with the user's vote
            setVotes({ ...votes, [selectedCandidate]: (votes[selectedCandidate] || 0) + 1 });

            // You can send the vote to your server with user email here
            // Example:
            fetch(`${import.meta.env.VITE_URL}/vote`, {
                method: 'POST',
                body: JSON.stringify({ candidate: selectedCandidate, userEmail: user.email }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSelectedCandidate('');
        }
    };

    const renderCandidates = () => {
        return candidates.map((candidate) => (
            <div key={candidate.id} className="p-4 m-4 bg-white shadow-lg rounded-lg">
                <img src={candidate.image} alt={candidate.name} className="w-32 h-32 rounded-full mx-auto" />
                <h3 className="text-xl font-semibold mt-4">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.details}</p>
                <button
                    onClick={() => setSelectedCandidate(candidate.name)}
                    className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ${
                        votingCompleted ? 'hidden' : ''
                    }`}
                >
                    Vote
                </button>
            </div>
        ));
    };

    const renderResults = () => {
        if (votingCompleted) {
            // Convert the votes object into an array for rendering in a chart
            const voteData = candidates.map((candidate) => ({
                candidate: candidate.name,
                voteCount: votes[candidate.name] || 0,
            }));

            return (
                <div className="bg-white p-8 mt-8 rounded shadow text-slate-700">
                    <h3 className="text-2xl font-semibold mb-4">Voting Results</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={voteData}>
                            <XAxis dataKey="candidate" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="voteCount" fill="rgba(75, 192, 192, 0.5)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        }
    };

    const handleVotingCompletion = () => {
        // Determine if all candidates have been voted for
        const votedCandidates = Object.keys(votes);
        const allCandidatesVoted = candidates.every((candidate) => votedCandidates.includes(candidate.name));
        if (allCandidatesVoted) {
            setVotingCompleted(true);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-semibold mb-4">Ballon d'Or Voting</h1>
            {!votingCompleted ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Choose Your Candidate</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {renderCandidates()}
                    </div>
                    <button
                        onClick={() => {
                            handleVote();
                            handleVotingCompletion();
                        }}
                        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-full ${
                            votingCompleted ? 'hidden' : ''
                        }`}
                    >
                        Vote
                    </button>
                </div>
            ) : (
                <div>
                    <p>Voting has ended. Results are displayed below.</p>
                    {renderResults()} {/* Display results */}
                </div>
            )}
        </div>
    );
};

export default BallonDOrVoting;
