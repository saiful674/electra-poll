import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { app } from "../firebase.config";
import axios from "axios";
const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  // dark theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
      if (loggedUser) {
        const user = { email: loggedUser.email, name: loggedUser.displayName };
        axios.post(`${import.meta.env.VITE_URL}/jwt`, user).then((res) => {
          localStorage.setItem("electra-poll-access-token", res.data.token);
        });
      } else {
        setUser(null);
        localStorage.removeItem("electra-poll-access-token");
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

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
    updateUserProfile,
    passwordReset,
    speak,
    cancel,
    speaking,
    theme,
    handleThemeToggle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
