import React, {useState, useEffect} from 'react';
import "./ProfilePage.css";
import axios from "axios";

export default function ProfilePage () {

    const [newData, setNewData] = useState();
    const [oldData, setOldData] = useState();
    const [search, setSearch] = useState('')
    const [isSearched, setIsSearched] = useState(false);

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

    const handleOnSubmit = (e) => {
        e.preventDefault ();
    }

    const handleOnChange = (e) => {
        if (e.charCode === 13) {
            setSearch(e.target.value);
        }
    }

    console.log ('---------NEWDATA:-----------')
    console.log (newData);
    console.log ('--------OLDDATA:------------')
    console.log (oldData);

    return (
        <div>
            <div className="searchbar-container-countries">
                <form onSubmit={handleOnSubmit}>
                    {/*//search component maken voor styling?*/}
                    <select
                        className="search"
                        placeholder="Search..."
                        onChange={handleOnChange}
                    >
                        <option value="NL">Nederland</option>
                        <option value="EN">Engeland</option>
                        <option value="CH">China</option>
                        <option value="DE">Duitsland</option>

                    </select>

                </form>
            </div>

            <div className="movie-container">
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
