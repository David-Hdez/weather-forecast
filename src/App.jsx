import reactLogo from './assets/react.svg'
// import './App.css'
import Container from 'react-bootstrap/Container';
import Weather from './components/Weather'
import Menu from './components/Menu'
import Search from './components/Search'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Menu></Menu>
        </Col>
      </Row>
      <Row>
        <Col>
          <Search></Search>
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
