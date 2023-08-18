

  export const getMyElections = async (user) => {
    const res = await fetch(`http://localhost:5000/elections/${user?.email}`)
    const data = await res.json()
    return data;
  }