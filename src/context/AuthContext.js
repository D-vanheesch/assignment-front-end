import React, { createContext, useState, useEffect, useContext} from "react";

const AuthContext = createContext({});

function AuthContextProvider ( { children } ) {
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

    return (
        <AuthContext.Provider value={authState}>
            {authState.status === 'done' && children}
            {authState.status === 'pending' && <p>Loading...</p>}
            { children }
        </AuthContext.Provider>
    );
}

function useAuthState () {
    const authState = useContext (AuthContext);

    const isDone = authState.status === 'done';
    const isAuthenticated = authState.status !== null && isDone;

    console.log ('Hee ik ben geauthoriseerd: ', isAuthenticated);

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
