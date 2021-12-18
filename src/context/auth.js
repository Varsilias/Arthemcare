/* eslint-disable */
import { useReducer, createContext, useContext } from "react"
import { useLocation, Navigate } from "react-router-dom"

const AuthContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "SET_USER": 
            return { ...state, user: action.user };
        case "LOGOUT_USER": 
            return { ...state, user: action.user };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export function AuthContextProvider({ children }) {
    const initialState = {
        user: null
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
        return <Navigate to="/" state={{ from: location, user: user }} />;
    }

    return children;
}

// export const setUser = (dispatch, value) => dispatch({ type: "SET_USER", value });
