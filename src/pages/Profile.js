import React from "react";
import {useAuthState} from "../context/AuthContext";

export default function Profile () {

    const { user } = useAuthState();

    return (
        <>
            <h1>Profilepage</h1>

            <h2>Account details:</h2>
            {user && (
                <>
                <p> Gebruikersnaam: {user.username} </p>

                <p> Email: {user.email} </p>
                </>
            )};
        </>
    )
}
