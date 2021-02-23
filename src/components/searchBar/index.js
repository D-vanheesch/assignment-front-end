import React, {useEffect, useState} from "react";
import './SearchBar.css'
import axios from "axios";

function SearchBar () {

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState();
    const [countries, setCountries] = useState();

    const options = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/search',
        params: {
            query: search,
            orderby: 'date',
            limit: '200',
            type: 'movie',
            start_year: '1992',
            end_year: '2019',
        },
        headers: {
            'x-rapidapi-key': 'adc43e01efmsh4e33b30d1f57ef9p1c5965jsn4a48b5e075ce',
            'x-rapidapi-host': 'unogsng.p.rapidapi.com'
        }
    };

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await axios(options)
                setMovies(response.data.results);
            } catch (e) {
                console.error(e);
            }
        }
        getMovies();
    }, [ search ]);

    // console.log ("data:", movies);

    const handleOnSubmit = (e) => {
        e.preventDefault ();
}

    const handleOnChange = (e) => {
    if (e.charCode === 13) {
        setSearch(e.target.value);
    }
    }

    const handleOnClick = (netflixId) => {
        const options = {
            method: 'GET',
            url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
            params: {t: 'loadvideo', q: netflixId},
            headers: {
                'x-rapidapi-key': 'adc43e01efmsh4e33b30d1f57ef9p1c5965jsn4a48b5e075ce',
                'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setCountries(response.data.RESULT.country)
        }).catch(function (error) {
            console.error(error);
        });
        // if (e.charCode === 13) {
        //     setSearch(e.target.value);
        // }
    }

    return (
        <>
            <div className="">

            </div>

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

            <div className="movie-container">
                {countries?.map((country) => {
                    let countryImage  = "https://cdn.ipregistry.co/flags/emojitwo/" +country?.ccode + ".svg"
                    //country tussenbouwen voor overview?
                    return (
                        <div className="movie-countries">
                            <img className="flags" src={countryImage} />
                            {country?.country}
                        </div>

                    )})}
            </div>

            <div className="movie-container">
            {movies?.map((movie) => {
                //country tussenbouwen voor overview?

                return (
                    <div
                        className="movie"
                        onClick={() => {handleOnClick (movie?.nfid) }}
                    >
                    <img className="movie-image" src={movie?.img} alt="movie-img"/>

                <div className="movie-info">
                        <h3>{movie?.title}</h3>
                        <span>{movie?.imdbrating}</span>
                        {/*<h4> Year: {movie?.year}</h4>*/}

                        <div className="movie-over">
                            <h2>Overview: </h2>
                            <p>{movie?.synopsis}</p>
                        </div>
                </div>
                    </div>
                )})}
            </div>
        </>
    )
}

export default SearchBar;
