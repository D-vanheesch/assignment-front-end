import React, {useState, useEffect, useMemo} from 'react';
import "./ProfilePage.css";
import axios from "axios";
import {useAuthState} from "../../context/AuthContext";

export default function ProfilePage () {

    const [newData, setNewData] = useState();
    const [oldData, setOldData] = useState();
    const [search, setSearch] = useState('')
    const [isSearched, setIsSearched] = useState(false);
    const [availableCountries, setAvailableCountries] = useState();

    const { user } = useAuthState();

    let countryCode = 'NL';
    if (search !== undefined && search.length > 0) {
        countryCode = search;
    }

    useEffect(() => {
        getNetflixContent(countryCode);
        getNetflixContent(countryCode, true);
        setIsSearched(true);
    }, [search])


    /**
     * getNetflixContent, get old and new netflix content per country
     *
     * @param countryCodeInput 'supply the country code'
     * @param isExp 'default false, returns old data or new data'
     *
     * @return bool | array
     */
    function getNetflixContent (countryCodeInput, isExp=false) {
        let period = 'new7';
        if (isExp) {
            period = 'exp';
        }

        const options = {
            method: 'GET',
            url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
            params: {
                q: 'get:' + period + ':' + countryCodeInput,
                p: '1',
                t: 'ns',
                st: 'adv',
            },
            headers: {
                'x-rapidapi-key': 'adc43e01efmsh4e33b30d1f57ef9p1c5965jsn4a48b5e075ce',
                'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response){
            if (isExp)  {
                setOldData(response.data);
            } else {
                setNewData(response.data);
            }
        })
    }

    // function getCountries () {
    //     const country =
    // }

    const options = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
        params: {
            t: 'lc',
            q: 'available',
        },
        headers: {
            'x-rapidapi-key': 'adc43e01efmsh4e33b30d1f57ef9p1c5965jsn4a48b5e075ce',
            'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        async function getCountries() {
            try {
                const response = await axios(options)
                setAvailableCountries(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        getCountries();
    }, [search]);

    const handleOnSubmit = (e) => {
        e.preventDefault ();
    }

    const handleOnChange = (e) => {
        if (e.charCode === 13) {
            setSearch(e.target.value);
        }
    }
    console.log ("check:",availableCountries);

    // console.log ('---------NEWDATA:-----------')
    // console.log (newData);
    // console.log ('--------OLDDATA:------------')
    // console.log (oldData);

    return (
        <div>
            <div className="profile-information">
            <h1>Account details:</h1>
            {user && (
                <>
                    <p> Username: {user.username} </p>
                    <p> Email: {user.email} </p>
                </>
            )}
            <h2>
                Below you will find content that will be newly released on Netflix and content that will be released soon, by country!</h2>
            </div>

            {/*<div className="Country-container">*/}
            {/*    {availableCountries?.data.map((countries) => {*/}
            {/*        //country tussenbouwen voor overview?*/}
            {/*        return (*/}
            {/*            <div className="select-options">*/}

            {/*            <input*/}
            {/*                name="country-name"*/}
            {/*                value={countries}*/}
            {/*                onClick={handleOnSubmit}*/}
            {/*            />*/}
            {/*            </div>*/}
            {/*        )})}*/}
            {/*</div>*/}

            <div className="movie-container">

                <header className="searchbar-container">
                <form onSubmit={handleOnSubmit}>
                    {/*//search component maken voor styling?*/}
                    <input
                        className="search"
                        type="text"
                        placeholder="Search..."
                        onKeyPress={handleOnChange}
                    />
                </form>
            </header>

                <h1>NEW TO COME:</h1>

                {newData != undefined ? newData.ITEMS?.map((movie) => {
                    //country tussenbouwen voor overview?
                    return (
                        <div className="movie">
                            <img className="movie-image" src={movie?.image} alt="movie-img"/>

                            <div className="movie-info">
                                <h3>{movie?.title}</h3>
                                <span>{movie?.date}</span>
                                {/*<h4> Year: {movie?.year}</h4>*/}

                                <div className="movie-over">
                                    <h2>Overview: </h2>
                                    <p>{movie?.synopsis}</p>
                                </div>
                            </div>
                        </div>
                    )}) : '' }
            </div>

            <div className="movie-container">
                <h1> MOVIES TO BE REMOVED:</h1>
                {oldData != undefined ? oldData.ITEMS?.map((movie) => {
                    //country tussenbouwen voor overview?
                    return (
                        <div className="movie">
                            <img className="movie-image" src={movie?.image} alt="movie-img"/>

                            <div className="movie-info">
                                <h3>{movie?.title}</h3>
                                <span>{movie?.date}</span>

                                <div className="movie-over">
                                    <h2>Overview: </h2>
                                    <p>{movie?.synopsis}</p>
                                </div>
                            </div>
                        </div>
                    )}) : '' }
            </div>
        </div>
    )
}
