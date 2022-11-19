import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from "axios";

function Weather(props) {
    const [forecast, setForecast] = useState(null);

    useEffect(
        () => {
            if (props.localizacion !== null) {
                const options = {
                    method: 'GET',
                    url: 'https://api.openweathermap.org/data/2.5/weather',
                    params: {
                        appid: import.meta.env.VITE_APPID_OPENWEATHERMAP,
                        lat: props.localizacion.latitude,
                        lon: props.localizacion.longitude,
                        units: 'metric'
                    }
                };

                axios.request(options).then(function (response) {
                    setForecast(response.data);
                }).catch(function (error) {
                    console.error(error);
                });
            }
        },
        [props.localizacion],
    );

    return (
        <>
            {forecast
                ? <Card><Card.Body>Seleccionada</Card.Body></Card>
                : <Card><Card.Body>Selecciona una ciudad</Card.Body></Card>
            }
        </>
    );
}

export default Weather;
