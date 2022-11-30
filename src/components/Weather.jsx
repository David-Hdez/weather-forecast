import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import './Weather.css'

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
                        units: 'metric',
                        lang: 'es'
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
                ? <Card className="text-center detail-forecast text-white">
                    <Card.Img variant="top" src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Weather icon" className='icon-weather mx-auto' />
                    <Card.Body>
                        <Card.Title>{forecast.name}</Card.Title>
                        <Card.Text>
                            {forecast.weather[0].description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        Temperatura actual: <strong>{forecast.main.temp}°C</strong>
                    </Card.Body>
                    <Card.Body>
                        Mínima: <strong>{forecast.main.temp_min}°C</strong>
                    </Card.Body>
                    <Card.Body>
                        Máxima: <strong>{forecast.main.temp_max}°C</strong>
                    </Card.Body>
                </Card>
                : <Card>
                    <Card.Body>Selecciona una ciudad</Card.Body>
                </Card>
            }
        </>
    );
}

export default Weather;
