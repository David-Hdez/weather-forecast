import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
// import './App.css'
import Container from 'react-bootstrap/Container';
import Weather from './components/Weather'
import Place from './components/Place'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [coordinates, setCoordinates] = useState(null);

  const handleCity = (event) => {
    setCoordinates(event);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Navbar expand="lg" variant="light" bg="light">
            <Navbar.Brand href="#">Pronóstico del tiempo</Navbar.Brand>
          </Navbar>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <Place latLon={handleCity}></Place>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <Weather localizacion={coordinates}></Weather>
        </Col>
      </Row>
    </Container>
  )
}

export default App
