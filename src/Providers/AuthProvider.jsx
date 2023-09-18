import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { app } from "../firebase.config";
const auth = getAuth(app);
export const AuthContext = createContext(null);
const Provider = new GoogleAuthProvider();
const AuthProviders = ({ children }) => {
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //registration

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // passwordReset
  const passwordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
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

  const authInfo = {
    user,
    createUser,
    setLoading,
    loading,
    signIn,
    logout,
    signInGoogle,
    updateUserProfile,
    passwordReset,
    speak,
    cancel,
    speaking,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
