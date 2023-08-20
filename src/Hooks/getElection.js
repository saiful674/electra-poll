import axios from "axios"
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
const getElection =()=>{
    const { user,loading } = useContext(AuthContext);
const { data: elections = [], refetch} = useQuery({
    queryKey: ['elections', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/elections/${user?.email}`)
 const data = res.data
      return data
    }
  })
  return [elections, refetch]
}
export default getElection;



// const useMySelected = () => {
//   const { user, loading } = useAuth()
//   const { refetch, data: mySelected = [] } = useQuery({
//     queryKey: ['mySelected', user?.email],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await fetch(`http://localhost:5000/selected?email=${user?.email}`)
//       return res.json()
//     }

//   })
//   return [mySelected, refetch]
// };
// export default useMySelected;
