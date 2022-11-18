import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
// import './App.css'
import Container from 'react-bootstrap/Container';
import Weather from './components/Weather'
import Menu from './components/Menu'
import Search from './components/Search'
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
      <Row>
        <Col>
          <Search latLon={handleCity}></Search>
        </Col>
      </Row>
      <Row>
        <Col>
          <Weather></Weather>
        </Col>
      </Row>
    </Container>
  )
}

export default App
