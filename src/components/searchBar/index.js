import React, {useEffect, useState} from "react";
import './SearchBar.css'
import axios from "axios";

function SearchBar () {

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState();

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
    }, [search]);

    console.log (movies);

    const handleOnSubmit = (e) => {
        e.preventDefault ();
}

    const handleOnChange = (e) => {
    if (e.charCode === 13) {
        setSearch(e.target.value);
    }
    }

    return (
        <>
        <div className="Search-bar-container">
                <form onSubmit={handleOnSubmit}>
                {/*//search component maken voor styling?*/}
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        onKeyPress={handleOnChange}
                    />
                </form>
            </div>

            {movies?.map((movie) => {
                return <li className="movie-container">
                    <img src={movie?.img} alt="movie-img"/>

                    <div className="movie-text">
                        <h4>Title: {movie?.title}</h4>
                        <h4> IMDB rating: {movie?.imdbrating}</h4>
                        <h4>Year: {movie?.year}</h4>
                    </div>


                </li>
            })}
        </>
    )
}

export default SearchBar;
