/* eslint-disable */
import { useReducer, createContext, useContext } from "react"
import { useLocation, Navigate } from "react-router-dom"

export const AuthContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "SET_USER": 
            return { ...state, user: action.user };
        case "LOGOUT_USER": 
            return { ...state, user: action.user };
        case "SET_TOKEN": 
            return { ...state, token: action.token };
        case "SET_ROLE": 
            return { ...state, role: action.role };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export function AuthContextProvider({ children }) {

    const initialState = {
        user: null ?? JSON.parse(localStorage.getItem('user')),
        token: null ?? localStorage.getItem('token'),
        role: null ?? localStorage.getItem('role')
    }

  const [controller, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={[controller, dispatch]}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext should be used inside the AuthProvider."
        );
    }

    return context;
}

export function RequireAuth({ children }) {
    const [controller] = useAuthContext();
    const { user } = controller
    let location = useLocation();

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}


