export const getAllClasses = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/classes`)
    const classes = await res.json()
    // console.log(classes)
    return classes;
  }