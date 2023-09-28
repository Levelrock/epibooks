import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="footer">
                <Container fluid className='bg-success text-black mt-5'>
                    <Row>
                        <Col>
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#" className="text-black">about us</a></li>
                                <li><a href="#" className="text-black">our services</a></li>
                                <li><a href="#" className="text-black">privacy policy</a></li>
                                <li><a href="#" className="text-black">affiliate program</a></li>
                            </ul>
                        </Col>
                        <Col>
                            <h4>Get Help</h4>
                            <ul>
                                <li><a href="#" className="text-black">FAQ</a></li>
                                <li><a href="#" className="text-black">shipping</a></li>
                                <li><a href="#" className="text-black">returns</a></li>
                                <li><a href="#" className="text-black">order status</a></li>
                                <li><a href="#" className="text-black">payment options</a></li>
                            </ul>
                        </Col>
                        <Col>
                            <h4>Online Shop</h4>
                            <ul>
                                <li><a href="#" className="text-black">watch</a></li>
                                <li><a href="#" className="text-black">bag</a></li>
                                <li><a href="#" className="text-black">shoes</a></li>
                                <li><a href="#" className="text-black">dress</a></li>
                            </ul>
                        </Col>
                        <Col>
                            <h4>Follow Us</h4>
                            <div className="text-black">
                                <a href="#" className="text-black"><FaFacebookF/></a>
                                <a href="#" className="text-black"><FaInstagram/></a>
                                <a href="#" className="text-black"><FaTwitter/></a>
                                <a href="#" className="text-black"><FaLinkedin/></a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
  )
}

export default Footer