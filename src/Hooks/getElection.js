import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const getElection = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: elections = [], refetch } = useQuery({
    queryKey: ['elections', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`https://electra-poll-server.vercel.app/elections/${user?.email}`)
      const data = res.data
      return data
    }
  })
  return [elections, refetch]
}
export default getElection;


