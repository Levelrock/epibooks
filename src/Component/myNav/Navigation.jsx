import React, {useContext, useState} from "react";
import  Navbar  from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLinks } from "../../Data/NavLinks";
import { nanoid } from "nanoid";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { PostProvider } from "../../Context/PostContext";


function Navigation() {

  const {filteredBooks, books, setFilteredBooks} = useContext(PostProvider);
  const [srcValue, setsrcValue] = useState('')

  const getForm = (value)=> {
    if (value === '')
    {
      setFilteredBooks(books)
    }
    setsrcValue(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const resultBooks = books.filter(book => book.title.toLowerCase().includes(srcValue.toLowerCase()))
    setFilteredBooks(resultBooks)
  }




  return (
    <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Brand href="#home">EPIBOOKS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {NavLinks.map((link)=>(
              <Nav.Link
              key={nanoid()}
              href={link.url}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              value={srcValue}
              onChange={(e)=>getForm(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" className="bg-danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;