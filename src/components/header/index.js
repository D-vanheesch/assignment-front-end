import React, {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import { AuthContext , useAuthState} from "../../context/AuthContext";

export default function Header () {
    const history = useHistory();

    //context
    const { isAuthenticated } = useAuthState();
    const {logout} = useContext(AuthContext);

    // useEffect(() => {
    //     if (isAuthenticated === false) {
    //         history.push('/signin')
    //     }
    // }, [isAuthenticated]);

    return (
        <header>
            <div>
                {isAuthenticated ? (
                    <button
                        type="button"
                        onClick={() => logout()}
                    >
                        Sign out
                    </button>
                ) : (
                    <>
                    <button
                    type="button"
                    onClick={() => history.push('/signin')}
                >
                    Sign in
                </button>
                    <button
                    type="button"
                    onClick={() => history.push('/signup') }
                    >
                    Sign up
                    </button>
                    </>
                        )}
            </div>
        </header>
    )
}
