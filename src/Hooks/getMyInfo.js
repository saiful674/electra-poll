import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const getMyInfo = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: myInfo = [], refetch } = useQuery({
    queryKey: ['myInfo', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user?.email}`)
      const data = res.data
      return data
    }
  })
  console.log(myInfo);
  return [myInfo, refetch]
}
export default getMyInfo;

