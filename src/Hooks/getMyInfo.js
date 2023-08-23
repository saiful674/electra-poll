import axios from "axios"
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
const getMyInfo = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: myInfo = [], refetch } = useQuery({
    queryKey: ['elections', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user?.email}`)
      const data = res.data
      console.log(data)
      return data
    }
  })
  return [myInfo, refetch]
}
export default getMyInfo;

