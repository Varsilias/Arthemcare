/* eslint-disable */
import { useEffect } from "react"
import { useAuthContext } from "context/auth";
import axios from "http/api";
import { useNavigate, Navigate, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function logout() {
    const [controller, dispatch] = useAuthContext();
    const navigate = useNavigate()
    // console.log(token);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post('auth/logout').then((res) => {

            console.log(res.data)
            localStorage.clear();
            dispatch({ type: "LOGOUT_USER", user: null });
            toast.success('Successfully logged out');

        }).then(() => {
            navigate('/');
        }).catch((error) => console.log(error))
            
    }, [])
    
    return (
        <div>
            
        </div>
    );
}

export default logout
