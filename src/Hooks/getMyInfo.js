import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const getMyInfo = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    data: myInfo = [],
    refetch,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["myInfo", user],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`https://electra-poll-server.vercel.app/users/${user?.email}`);
      const data = res.data;
      return data;
    },
  });

  return { myInfo, refetch, userLoading };
};
export default getMyInfo;
