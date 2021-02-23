import React, {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import { AuthContext , useAuthState} from "../../context/AuthContext";
import './Header.css'

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
                    onClick={() => history.push('/Startpage')}

                >
                    NETFLIX
                </h1>
                {isAuthenticated ? (

                    <button className="buttons-header"
                        type="button"
                        onClick={() => logout()}
                    >
                        Sign out
                    </button>
                ) : (
                    <>
                    <button className="buttons-header"
                    type="button"
                    onClick={() => history.push('/signin')}
                >
                    Sign in
                </button>
                    <button className="buttons-header"
                    type="button"
                    onClick={() => history.push('/signup') }
                    >
                    Sign up
                    </button>
                    </>
                        )}
                </>

                <div className="profile-button">
                    <button
                    className="buttons-header"
                    type="button"
                    onClick={() => history.push('/home')}
                    >
                        Home
                    </button>
                </div>

                <div className="profile-button">
                <button
                    className="buttons-header"
                    type="button"
                    onClick={() => history.push('/profile')}
                >
                    My profile
                </button>

                    {/*<div className="buttons-logout">*/}
                    {/*<button*/}
                    {/*    className="buttons-header"*/}
                    {/*    type="button"*/}
                    {/*    onClick={logout}*/}
                    {/*>*/}
                    {/*    Log out*/}

                    {/*    </button>*/}
                    {/*</div>*/}

            </div>
            </div>
        </header>
    )
}
