import React from "react";

const PersonalizedRecommendations = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 mt-10 rounded shadow text-gray-300">
      <h2 className="text-2xl font-semibold mb-4 uppercase">
        Personalized Recommendations
      </h2>
      <div className="mb-4">
        <p>Recommended Election: Environmental Conservation Committee</p>
        <p>
          Reason: Based on your past votes for eco-friendly policies, you might
          be interested in this committee's election.
        </p>
        <p>
          This committee is dedicated to promoting sustainability and preserving
          the environment.
        </p>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
