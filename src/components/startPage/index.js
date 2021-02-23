import React from 'react';
import './StartPage.css';

export default function StartPage () {

    return (
        <div className="welcome-page">
        <div>
            <div>
                <div className="start-information">
                    <h1>WELCOME!</h1>
                    <h2>On this website you can look up old and new content from Netflix and check the availability per country. </h2>
                </div>
            </div>
        </div>

    <div>
        <div>
            <div className="start-information">
                <h1>Home page</h1>
                <h2>On the home page you can look up every movie from Netflix and get an overview of information. Besides that, when you click on a movie, it will show the countries of availability.</h2>
            </div>
        </div>
    </div>
            <div>
                <div>
                    <div className="start-information">
                        <h1>Profile page</h1>
                        <h2>On the profile page you will see your account information when registered. Besides that, you can look up countries and the website will show you all the new and upcoming content of Netflix and it will also show you all the old and to be removed content of Netflix.</h2>
                    </div>
                </div>
            </div>

        </div>


    )
}
