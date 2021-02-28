import React, { useContext, useEffect, useState } from "react";
import './SignInForm.css';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext, useAuthState } from "../../context/AuthContext";
import FormErrorSignIn from "./FormErrorSignIn";

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

            login (response.data);
        } catch(e) {
            console.error (e);
            if (e.message.includes('401')) {
                setError ('Username or password is incorrect.')
            } else {
                setError ('Sign in failed, please try again.')
            }
        }
        toggleLoading(false);

    }

    return <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flow">
            <div className="cont">
                <div className="form">
                    <h2>Sign in</h2>

        <label htmlFor="username-details">Username</label>
        <input
            name="username"
            type="text"
            placeholder="Enter your username"
            ref={register({
                required: true,
                minLength: 6,
                pattern: /^[a-zA-Z]*$/,
            })}
        />
            <FormErrorSignIn
                condition={errors.username?.type === 'required'}
                message={"Please fill in your username."}
            />
            <FormErrorSignIn
                condition={errors.username?.type === 'minLength'}
                message={"Your username must be at least 6 characters long."}
            />
            <FormErrorSignIn
                condition={errors.username?.type === 'pattern'}
                message={"Your username must have a pattern from a to z and no random marks."}
            />

        <label htmlFor="password-details">Password</label>
        <input
            name="password"
            type="password"
            placeholder="Enter your password"
            ref={register({
                required: true,
                minLength: 6,
            })}
        />
        <FormErrorSignIn
            condition={errors.password?.type === 'required'}
            message={"This field is required."}
        />
        <FormErrorSignIn
            condition={errors.password?.type === 'minLength'}
            message={"Your password must be at least 6 characters long."}
        />

        <button
            type="submit"
            className="form-button"
            disabled={loading}
        >
            {loading? 'Loading..' : 'Sign in'}
        </button>
        {error && <p>{error}</p>}

        </div>
            </div>
        </div>

    </form>
}

