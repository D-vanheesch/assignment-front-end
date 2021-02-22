import React from "react";
import {useAuthState} from "../context/AuthContext";
import {Link} from "react-router-dom";
import ProfilePage from "../components/profile";


export default function ProfileNewCountries () {

    const { user } = useAuthState();

    //wil je beschermde data uitlezen?
    // zet dan weer een useEffect met eem lege [] dependency array
    // asynchrone functie met try/catch
    // maar in het request stuur je de token die in de local storage staat, mee

    return (
        <>

            <h1>Profile page</h1>



            <p>Welcome to your profile page.</p>
            <p>Want to know what movies and series are available in your country to Netflix and Chill?
                Click <Link to="./home">here!</Link>
            </p>

            <h2>Account details:</h2>
            {user && (
                <>
                <p> Gebruikersnaam: {user.username} </p>

                <p> Email: {user.email} </p>
                </>
            )}
            <div className="profile">
            <ProfilePage/>
            </div>

        </>
    )
}
