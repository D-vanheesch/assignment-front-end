import React from "react";
import './SignInForm.css'
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignInForm () {
    const { register, handleSubmit, errors } = useForm();

    async function onSubmit(data) {
        console.log (data)

        try {
            const response = await axios.post (
                'https://polar-lake-14365.herokuapp.com/api/auth/signin', {
                username: data.username, password: data.password
                });


            console.log (response.data);
        } catch(e) {
            console.log (e)

        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>

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
        >
            Sign in
        </button>
    </form>
}
