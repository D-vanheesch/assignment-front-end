import React from 'react';
import {useHistory} from 'react-router-dom'
import {useAuthState} from "../../context/AuthContext";

function Header () {
    const history = useHistory();

    //context
    const { isAuthenticated } = useAuthState();

    return (
        <header>
            <div>
                {isAuthenticated? (
                    <button
                        type="button"
                        onClick={() => console.log('Sign out')}
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
            </div>
        </header>
    )
}
