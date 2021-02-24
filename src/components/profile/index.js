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
                // console.log ("DATA:",response.data.ITEMS)
                setAvailableCountries(response.data.ITEMS);
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

    const changeCountry = (e) => {
        getNetflixContent(e.target.value);
        getNetflixContent(e.target.value, true);
        console.log (e.target.value)
        }


    // console.log ("check:",availableCountries);

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

            <div className="Country-container">
                <select
                onChange={changeCountry}
                >
                {availableCountries?.map((countries) => {
                    // console.log (countries);
                    //country tussenbouwen voor overview?
                    return (
                        <option
                            value={countries[1]}
                        >
                            {countries[2]}
                        </option>
                    )})}
                </select>
            </div>

            <div className="movie-container">
                <div className="column d-inline-block">

                <h1>NEW TO COME:</h1>

                {newData != undefined ? newData.ITEMS?.map((movie) => {
                    //country tussenbouwen voor overview?
                    console.log (movie?.synopsis.split('<br>'))
                    return (
                        <div className="movie movie-extended">

                            <div className="release-date">
                                <span>{ movie?.synopsis.split('<br>')[1].replace('<b>New on', '').replace('</b>', '')}</span>
                            </div>
                            <img className="movie-image" src={movie?.image} alt="movie-img"/>

                            <div className="movie-info">
                                <h3 className="movie-title">{movie?.title}</h3>
                                <span>{movie?.date}</span>
                                {/*<h4> Year: {movie?.year}</h4>*/}

                                <div className="movie-over">
                                    <h2>Overview: </h2>
                                    <p>{movie?.synopsis.split('<br>')[0]}</p>
                                </div>
                            </div>
                        </div>
                    )}) : '' }
                </div>

                <div className="column d-inline-block">

                    <h1>TO BE REMOVED:</h1>
                    {oldData != undefined ? oldData.ITEMS?.map((movie) => {
                        //country tussenbouwen voor overview?
                        return (
                            <div className="movie movie-extended">
                                <img className="movie-image" src={movie?.image} alt="movie-img"/>

                                <div className="movie-info">
                                    <h3 className="movie-title">{movie?.title}</h3>
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
            </div>
        </div>
    )
}
