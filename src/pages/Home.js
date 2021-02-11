import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar";


export default function Home () {


    return (
        <>
            <h1>Home page</h1>

            {/*<h2>*/}
            {/*    {movies?.orderby}*/}
            {/*    {movies?.type}*/}
            {/*</h2>*/}


            <div className="Home">
                <div className="container searchApp">
                    <h2 className="title 2">
                        Search for your favorite MoViEs & SeRiEs!
                    </h2>
                    <SearchBar
                    />
                </div>
            </div>
            <p>To sign in, please click <Link to="/Signin">Sign in</Link> or to sign up, please click <Link to="Signup">Sign up</Link> </p>
            <p>If you are already signed in, you can go to your profile page, <Link to="/Profile">Profile</Link> </p>
        </>
    );
}
