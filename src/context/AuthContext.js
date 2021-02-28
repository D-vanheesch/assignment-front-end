import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({});

function AuthContextProvider ({ children }) {
    const [authState, setAuthState] = useState({
        status: 'pending',
        error: null,
        user: null,
    });

    useEffect (() => {

        setTimeout(() => {
            setAuthState({
                //spread operator:
                ...authState,
                status: 'done',
            });
        }, 2000)
    }, [] );

    function login (data) {
        console.log (data)
        localStorage.setItem('accessToken', data.accessToken);

        setAuthState({
            ...authState,
            user: {
                username: data.username,
                email: data.email,
                roles: data.roles,
            }
        });
    }

    function logout () {
        localStorage.clear();
        setAuthState({
            ...authState,
            user: null,
        })
    }

    return (
        <AuthContext.Provider value={{...authState, login, logout}}>
            {authState.status === 'done' && children}
            {authState.status === 'pending' && <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

function useAuthState () {
    const authState = useContext (AuthContext);

    const isDone = authState.status === 'done';
    const isAuthenticated = authState.user !== null && isDone;

    return {
        ...authState,
        isAuthenticated: isAuthenticated,
    }
}

export {
    AuthContext,
    useAuthState,
    AuthContextProvider,
};
