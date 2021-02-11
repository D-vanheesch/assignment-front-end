import React, {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import { AuthContext , useAuthState} from "../../context/AuthContext";
import './Header.css'
import SearchBar from "../searchBar";

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
                <>
                <h1 className="header-title">NETFLIXXXXXXX</h1>
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
                </>
            </div>
        </header>
    )
}
