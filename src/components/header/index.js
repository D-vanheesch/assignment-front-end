import React, {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import { AuthContext , useAuthState} from "../../context/AuthContext";
import './Header.css'
import NetflixHeader from "../../assets/NetflixHeader.png";
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
            <div className="header-container">
                <>
                <h1 className="header-title"
                    onClick={() => history.push('/home')}
                >
                    NETFLIX
                </h1>
                {isAuthenticated ? (

                    <button className="buttons"
                        type="button"
                        onClick={() => logout()}
                    >
                        Sign out
                    </button>
                ) : (
                    <>
                    <button className="buttons"
                    type="button"
                    onClick={() => history.push('/signin')}
                >
                    Sign in
                </button>
                    <button className="buttons"
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
