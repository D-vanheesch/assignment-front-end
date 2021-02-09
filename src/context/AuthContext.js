import React, { createContext, useState, useEffect, useContext} from "react";

const AuthContext = createContext({});

function AuthContextProvider ({ children }) {
    const [authState, setAuthState] = useState({
        status: 'pending',
        error: null,
        user: null,
    });

    useEffect (() => {
        // life cicle, wanneer iets getriggert wordt
        // anoniem & dependicy.

        setTimeout(() => {
            // er is geen token, dus we beginnen met schone lei!
            setAuthState({
                //spread operator:
                ...authState,
                status: 'done',
            });
        }, 2000)
    }, [] );

    function login (data) {
        //token in localstorage
        console.log (data)
        localStorage.setItem('accessToken', data.accessToken);

        // user informatie in context plaatsen
        setAuthState({
            ...authState,
            user: {
                username: data.username,
                email: data.email,
                roles: data.roles,
            }
        });
        //als dat eenmaal gelukt is, link door naar profielpagina
        //dit doen we in het component zelf.
    }

    function logout () {
        // doe dingen
    }

    //deze zou ook bij return authcontext.provider gezet kunnen worden (check providerData!)
    // const providerData = {
    //     ...authState,
    //     login,
    //     logout,
    // }

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

    //console.log ('authenticated', isAuthenticated);

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
