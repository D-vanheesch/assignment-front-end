import React, {useState, useEffect} from 'react';
import "./ProfilePage.css";
import axios from "axios";

export default function ProfilePage () {

    const [countries, setCountries] = useState();

    const options = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
        params: {
            q: "get:new7:US",
            p: '1',
            t: 'ns',
            st: 'adv',
        },
        headers: {
            'x-rapidapi-key': 'adc43e01efmsh4e33b30d1f57ef9p1c5965jsn4a48b5e075ce',
            'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        async function getCountries() {
            try {
                const response = await axios (options)
                setCountries(response.data.results);
            } catch (e) {
                console.error (e);
            }
        }
        getCountries();
    }, [])

    console.log ("DATA:", countries);


    return (
        <div>

        </div>
    )
}
