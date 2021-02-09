import React, {useState} from "react";
import './SignUpForm.css'
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";

export default function SignUpForm () {
    const { register, handleSubmit, errors } = useForm();

    //state voor gebruikers feedback
    const [createUserSuccess, setCreateUserSuccess] = useState(false );
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('')

    async function onSubmit (data) {
        toggleLoading(true);
        setError('');
        console.log (data)
        try {
            const response = await axios.post(
                'https://polar-lake-14365.herokuapp.com/api/auth/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"],
            });
            console.log (response.data)
            if (response.status === 200) {
                setCreateUserSuccess(true)
            }
        } catch (e) {
            console.error (e);
            if (e.message.includes('400')) {
                setError('Er bestaat al een account met deze gebruikersnaam.')
            } else {
                setError('Er is iets misgegaan bij het verzenden, probeer het opnieuw.')
            }
        }
        toggleLoading(false);
    }

    //implementeer loading en error in beide formulieren
    //zorg ervoor dat de knoppen disabled zijn tijdens het laden en dat de gebruiker dat ziet
    //zorg ervoor dat als er iets mis gaat , dit met de gebruiker wordt gecommuniceerd.

        //niks met context
        //gebruik de data uit het formulier om een gebruiker aan te maken (check docu)
        //kijk goed wat je terugkrijgt!
        //Als het is gelukt, willen we in DIT component opslaan dat het gelukt is.
        //Als het gelukt is, willen we een berichtje laten zien in de HTML, zoals:
        //{/*{ createSucces } === true <p>yeey het is gelukt! Je kunt hier inloggen...LINK</p>*/}



    return <form onSubmit={handleSubmit(onSubmit)}>

        <h1>Registration</h1>

        {createUserSuccess === true && (
            <p>Registration is successfull! Click <Link to="/signin">here</Link> to sign in. </p>
        )}

        <label htmlFor="email-adress-details">Email:</label>
        <input
            name="email"
            type="text"
            placeholder="Enter your email"
            ref={register({required: true})}
        />
        {errors.emailAdress && <span>This field is required</span>}

        <label htmlFor="username-details">Username:</label>
        <input
            name="username"
            type="text"
            placeholder="Enter your username"
            ref={register({required: true})}
        />
        {errors.userName && <span>This field is required</span>}

        <label htmlFor="password-details">Password:</label>
        <input
            name="password"
            type="password"
            placeholder="Enter your password"
            ref={register({required: true})}
        />
        {errors.password && <span>This field is required</span>}

        <button
            type="submit"
            className="form-button"
            disabled={loading}
            >
            {loading? 'Loading...' : 'Sign up'}
        </button>
        {error && <p>{error}</p>}
        <span>
            Already have an account? Login <Link to="/Signin">Sign in</Link>
        </span>

    </form>


}
