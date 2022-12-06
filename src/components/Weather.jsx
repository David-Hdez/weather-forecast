import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import './Weather.css'
import ClipLoader from "react-spinners/ClipLoader";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Weather(props) {
    const [forecast, setForecast] = useState(null);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#48c6ef");

    useEffect(
        () => {
            if (props.localizacion !== null) {
                setLoading(true);

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
                    setLoading(false);
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
            <Row className='mt-3'>
                <Col className='d-flex justify-content-center'>
                    <ClipLoader
                        color={color}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Col>
            </Row>

            {props.localizacion === null &&
                <Row className='mt-3'>
                    <Col>
                        <Card>
                            <Card.Body>Selecciona una ciudad</Card.Body>
                        </Card>
                    </Col>
                </Row>
            }

            {forecast &&
                <Row className='mt-3'>
                    <Col>
                        <Card className="text-center detail-forecast text-white">
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
                    </Col>
                </Row>
            }
        </>
    );
}

export default Weather;
