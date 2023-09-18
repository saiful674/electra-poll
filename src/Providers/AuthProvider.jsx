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
import { app } from "../firebase.config";
import axios from "axios";
const auth = getAuth(app);
export const AuthContext = createContext(null);
const Provider = new GoogleAuthProvider();
const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //registration

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
            .then(res => {
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }


    // Login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // passwordReset
    const passwordReset = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // ovserver
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
            setUser(loggedUser);
            setLoading(false);
            if (loggedUser) {
                const user = { email: loggedUser.email, name: loggedUser.displayName }
                axios.post(`${import.meta.env.VITE_URL}/jwt`, user)
                    .then(res => {
                        localStorage.setItem('electra-poll-access-token', res.data.token)
                    })
            }
            else {
                setUser(null)
                localStorage.removeItem('electra-poll-access-token')
            }

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
        passwordReset
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProviders;
