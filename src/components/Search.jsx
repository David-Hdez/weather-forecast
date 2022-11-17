import axios from "axios";

import AsyncSelect from 'react-select/async';

function Search() {
    /**
     * Cities autocomplete
     * @param {string} inputValue 
     * @param {*} callback 
     * @see {@link https://react-select.com/async#loading-asynchronously}
     */
    const loadOptions = (
        inputValue,
        callback
    ) => {
        let options = {
            method: 'GET',
            url: 'https://spott.p.rapidapi.com/places/autocomplete',
            params: { type: 'CITY', country: 'MX', limit: '5', 'language': 'es' },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'spott.p.rapidapi.com'
            }
        };

        if (inputValue) {
            options.params.q = inputValue
        };

        axios.request(options).then(function (response) {
            callback(response.data.map((city) => {
                let city_name;

                if (city.localizedName === null) {
                    city_name = `${city.name}, ${city.adminDivision1.localizedName}`;
                } else {
                    city_name = `${city.localizedName}, ${city.adminDivision1.localizedName}`;
                }

                return { value: city.id, label: city_name }
            }));
        })
    };

    return (
        <>
            <AsyncSelect cacheOptions defaultOptions loadOptions={loadOptions} />
        </>
    );
}

export default Search;
