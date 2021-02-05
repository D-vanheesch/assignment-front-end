import React from "react";
import './SignUpForm.css'
import { useForm } from "react-hook-form";


export default function SignUpForm () {
    const { register, handleSubmit, errors } = useForm();

    function onSubmit(data) {
        console.log (data);
    }

    console.log ("ERROR:", errors)
    return <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="userName">Username</label>
        <input
            name="userName"
            type="text"
            placeholder="Enter your username"
            ref={register({required: true})}
        />
        {errors.userName && <span>This field is required</span>}

        <label htmlFor="emailAdress">Email adress</label>
        <input
            name="emailAdress"
            type="text"
            placeholder="Enter your email"
            ref={register({required: true})}
        />
        {errors.emailAdress && <span>This field is required</span>}

        <label htmlFor="password">Password</label>
        <input
            name="password"
            type="password"
            placeholder="Enter your password"
            ref={register({required: true})}
        />
        {errors.password && <span>This field is required</span>}

        <label htmlFor="password">Confirm password</label>
        <input
            name="password2"
            type="password"
            placeholder="Enter your password"
            ref={register({required: true})}
        />
        {errors.password && <span>This field is required</span>}

        <input
            type="submit"
        />
        <span>
            Already have an account? Login <a href="#">here</a>
        </span>

    </form>


}
