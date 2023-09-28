import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Jumbotron = () => {
  return (
    <Container fluid className='bg-success'>
      <Row className="justify-content-md-center">        
        <Col md="auto">EPIBOOKS</Col>        
      </Row>
      <Row className="justify-content-md-center">        
        <Col md="auto">“Un libro dev’essere un’ascia per rompere il mare ghiacciato che è dentro di noi”, Franz Kafka</Col>        
      </Row>
      <Row className="justify-content-md-center">        
        <Col md="auto">Franz Kafka</Col>        
      </Row>
    </Container>
  )
}

export default Jumbotron