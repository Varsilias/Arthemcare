/* eslint-disable */
import { useState, createContext, useContext } from "react"
import { useLocation, Navigate } from "react-router-dom"
import authRequest from "requests/auth"

let AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    signin: (username, password) => {},
    signout: () => {}
});

export function AuthContextProvider({ children }) {
    let [user, setUser] = useState(null);
    let [isLoggedin, setIsLoggedIn] = useState(false);

    let signin = async (newUsername, newPassword, callback) => {
        const user = await authRequest.signin(newUsername, newPassword);
        localStorage.setItem('user', user)
        localStorage.setItem('token', user.access_token)
        setUser(user);
        setIsLoggedIn(true)

        return callback()
        
    };

    let signout = async (callback) => {
        return await authRequest.signout(() => {
            setUser(null);
            setIsLoggedIn(false)
            callback();
        });
    };

  let value = { user, isLoggedin, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth should be used inside the AuthProvider."
        );
    }

    return context;
}

function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <button
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
}

export function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (auth.user == null) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}

function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let username = formData.get("username");

        auth.signin(username, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
        });
    }
}