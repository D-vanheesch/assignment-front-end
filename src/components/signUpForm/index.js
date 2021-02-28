import React, { useRef, useState } from "react";
import './SignUpForm.css'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import FormErrorSignUp from "./FormErrorSignUp";

export default function SignUpForm () {
    const { register, handleSubmit, errors, watch } = useForm();

    const [createUserSuccess, setCreateUserSuccess] = useState(false );
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('')

    const password = useRef({});
    password.current = watch("password", "");

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
                setCreateUserSuccess(true);

            }
        } catch (e) {
            console.error (e);
            if (e.message.includes('400')) {
                setError('Account already exists.')
            } else {
                setError('Something went wrong, please try again.')
            }
        }
        toggleLoading(false);
    }

    return <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flow">

        <div className="cont">
            <div className="form">
        <h2>Sign up</h2>


        <label htmlFor="email-adress-details">Email:</label>
        <input
            name="email"
            type="email"
            placeholder="Enter your email"
            ref={register({
                required: true,
                validate: (value) => value.includes('@'),
            })}
        />

        <label htmlFor="username-details">Username:</label>
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

        <FormErrorSignUp
            condition={errors.username?.type === 'required'}
            message={"This field is required."}
            />
        <FormErrorSignUp
             condition={errors.username?.type === 'minLength'}
             message={"Your username must be at least 6 characters long."}
            />
            <FormErrorSignUp
                condition={errors.username?.type === 'pattern'}
                message={"Your username must have a pattern from a to z with no random marks."}
                />

        <label htmlFor="password-details">Password:</label>
        <input
            name="password"
            type="password"
            placeholder="Enter your password"
            ref={register({
                required: true,
                minLength: 6,
            })}
        />
        <FormErrorSignUp
            condition={errors.password?.type === 'required'}
            message={"This field is required"}
            />
        <FormErrorSignUp
            condition={errors.password?.type === 'minLength'}
            message={"Your password must be at least 6 characters long"}
        />

        <label htmlFor="password-details-confirm">Confirm password:</label>
        <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            ref={register({
                required: true,
                minLength: 6,
                validate: value =>
                    value === password.current || "The passwords do not match"
            })}
            />
                <FormErrorSignUp
                    condition={errors.confirmPassword?.type === 'required'}
                    message={"This field is required"}
                />
                <FormErrorSignUp
                    condition={errors.confirmPassword?.type === 'minLength'}
                    message={"Your password must be at least 6 characters long"}
                />

        <button
        type="submit"
        className="form-button"
        disabled={loading}
        >
        {loading? 'Loading...' : 'Sign up'}
        </button>

        {error && <p>{error}</p>}

        <div className="below-text">
            <h2>Already have an account? <Link to="/Signin">Sign in</Link> </h2>
        </div>
                    <div className="registration">
                {createUserSuccess === true && (
                    <p>*Registration is successfull! Click <Link to="/signin">here</Link> to sign in. </p>
                )}
                    </div>
            </div>
        </div>
        </div>
    </form>
}
