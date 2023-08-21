import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase";
import { getASecureRandomPassword } from "../Hooks/getASecureRandomPassword";
  const auth = getAuth(app);
  export const AuthContext = createContext(null);
  const newPassword = getASecureRandomPassword();
  const Provider = new GoogleAuthProvider();
  const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    //registration

    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
  }
  const updateUserProfile = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    })
}
    // Login
    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  

    // ovserver
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
        setUser(loggedUser);
        setLoading(false);
      });
      return () => {
        return unsubscribe();
      };
    }, []);
  
    // Login with google
    const signInGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, Provider);
    };
  
    // logout
    const logout = () => {
      setLoading(true);
      return signOut(auth);
    };

    const PasswordUpdate = ()=>{
      setLoading(true);
      return updatePassword(user, newPassword)
    }
    


    const authInfo = {
      user,
      createUser,
      setLoading,
      loading,
      signIn,
      logout,
      signInGoogle,
      PasswordUpdate,
      updateUserProfile
    };
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProviders;
  