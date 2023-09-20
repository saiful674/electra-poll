import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase.config';

const auth = getAuth(app)
const UseAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)
    const secureAxios = axios.create({ baseURL: 'http://localhost:5000' })


    const token = localStorage.getItem('electra-poll-access-token')
    useEffect(() => {
        secureAxios.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        secureAxios.interceptors.response.use(
            (res) => {
                return res
            },
            (error) => {
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    navigate('/login');
                    // signOut(auth)
                }
                return Promise.reject(error);
            }
        )
    }, [logOut, navigate, secureAxios])

    return [secureAxios]
};

export default UseAxiosSecure;