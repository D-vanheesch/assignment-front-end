import React from "react";
import {useAuthState} from "../context/AuthContext";

export default function Profile () {

    const { user } = useAuthState();

    //wil je beschermde data uitlezen?
    // zet dan weer een useEffect met eem lege [] dependency array
    // asynchrone functie met try/catch
    // maar in het request stuur je de token die in de local storage staat, mee

    return (
        <>
            <h1>Profilepage</h1>

            <h2>Account details:</h2>
            {user && (
                <>
                <p> Gebruikersnaam: {user.username} </p>

                <p> Email: {user.email} </p>
                </>
            )}
        </>
    )
}
