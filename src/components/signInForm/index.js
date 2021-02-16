import React, {useContext, useEffect, useState} from "react";
import './SignInForm.css'
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext, useAuthState} from "../../context/AuthContext";

export default function SignInForm () {

    const { login } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();

    const { register, handleSubmit, errors } = useForm();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('')

    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated === true) {
            history.push('/Profile');
        }
    }, [isAuthenticated]);

        async function onSubmit(data) {
            toggleLoading(true);
            setError('');
            console.log (data);
        try {
            const response = await axios.post (
                'https://polar-lake-14365.herokuapp.com/api/auth/signin', {
                    username: data.username,
                    password: data.password,
                });

            //handel het inloggen aan de voorkant af in de context met de data die we binnen hebben gekregen!
            login (response.data);
        } catch(e) {
            console.error (e);
            if (e.message.includes('401')) {
                setError ('Gebruikersnaam of wachtwoord is onjuist.')
            } else {
                setError ('Inloggen is helaas mislukt, probeer het nogmaals.')
            }
            //tip: als de gebruikersnaam niet bestaat of ww is verkeerd, stuurt de backend een 401
        }
        toggleLoading(false);

    }

    return <form onSubmit={handleSubmit(onSubmit)}>

        <h1>Sign in</h1>
        <div className="background-signin">

        <label htmlFor="username-details">Username</label>
        <input
            name="username"
            type="text"
            ref={register({required: true})}
        />
        {errors.username && <span>This field is required</span>}

        <label htmlFor="password-details">Password</label>
        <input
            name="password"
            type="password"
            ref={register({required: true})}
        />
        {errors.password && <span>This field is required</span>}

        <button
            type="submit"
            className="form-button"
            disabled={loading}
        >
            {loading? 'Loading..' : 'Sign in'}
        </button>
        {error && <p>{error}</p>}

        </div>

    </form>
}
