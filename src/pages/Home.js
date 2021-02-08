import React from "react";
import { Link } from "react-router-dom";

export default function Home () {
    return (
        <>
            <h1>Home page</h1>
            <p>To sign in, please click <Link to="/Signin">Sign in</Link> or to sign up, please click <Link to="Signup">Sign up</Link> </p>
            <p>If you are already signed in, you can go to your profile page, <Link to="/Profile">Profile</Link> </p>
        </>
    );
}
