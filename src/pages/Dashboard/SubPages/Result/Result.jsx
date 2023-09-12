import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import UserName from "../../../../components/Deshboard/UserName/UserName";
import ElectionCard from "../../../ElectionCreationAndManagement/ElectionCard";
import ElectionTabs from "./ElectionTabs";

const Result = () => {
  const { user } = useContext(AuthContext);
  const PUBLISHED = "published";
  const ONGOING = "ongoing";
  const COMPLETED = "completed";
  const PENDING = "pending";
  const [activeTab, setActiveTab] = useState(PUBLISHED);

  const {
    data: elections = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["elections", user],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/all-elections/${user?.email}`
      );
      return res.data;
    },
  });

  const publishedElections = elections.filter(
    (election) => election.status === PUBLISHED
  );
  const ongoingElections = elections.filter(
    (election) => election.status === ONGOING
  );
  const doneElections = elections.filter(
    (election) => election.status === COMPLETED
  );
  const pendingElections = elections.filter(
    (election) => election.status === PENDING
  );

  return (
    <div>
      <UserName />

      {/* election tabs component */}
      <ElectionTabs activeTab={activeTab} onSelectTab={setActiveTab} />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {activeTab === PUBLISHED &&
          (publishedElections.length === 0 ? (
            <p className="mt-20 col-span-3 text-xl text-center text-error">
              No published elections found.
            </p>
          ) : (
            publishedElections.map((election) => (
              <ElectionCard
                key={election._id}
                refetch={refetch}
                election={election}
              />
            ))
          ))}
        {activeTab === ONGOING &&
          (ongoingElections.length === 0 ? (
            <p className="mt-20 col-span-3 text-xl text-center text-error">
              No ongoing elections found.
            </p>
          ) : (
            ongoingElections.map((election) => (
              <ElectionCard
                key={election._id}
                refetch={refetch}
                election={election}
                isUseForResultPage={true}
              />
            ))
          ))}
        {activeTab === COMPLETED &&
          (doneElections.length === 0 ? (
            <p className="mt-20 col-span-3 text-xl text-center text-error">
              No completed elections found.
            </p>
          ) : (
            doneElections.map((election) => (
              <ElectionCard
                key={election._id}
                refetch={refetch}
                election={election}
                isUseForResultPage={true}
              />
            ))
          ))}
        {activeTab === PENDING &&
          (pendingElections.length === 0 ? (
            <p className="mt-20 col-span-3 text-xl text-center text-error">
              No pending elections found.
            </p>
          ) : (
            pendingElections.map((election) => (
              <ElectionCard
                key={election._id}
                refetch={refetch}
                election={election}
              />
            ))
          ))}
      </div>
    </div>
  );
};

export default Result;
