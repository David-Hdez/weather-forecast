import React, { useState, useEffect } from 'react';
import axios from "axios";

import AsyncSelect from 'react-select/async';

function Place(props) {
    const [city, setCity] = useState(null);

    useEffect(
        () => {
            if (city !== null) {
                const options = {
                    method: 'GET',
                    url: `https://spott.p.rapidapi.com/places/${city.value}`,
                    headers: {
                        'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
                        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
                    }
                };

                axios.request(options).then(function (response) {
                    props.latLon(response.data.coordinates)
                }).catch(function (error) {
                    console.error(error);
                });
            }
        },
        [city],
    );

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
            <AsyncSelect
                isClearable
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                onChange={setCity}
                placeholder='Busca ciudad'
                loadingMessage={() => 'Cargando...'}
                noOptionsMessage={() => 'Sin resultados'} />
        </>
    );
}

export default Place;
