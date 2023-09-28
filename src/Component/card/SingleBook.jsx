import React, { useState } from 'react'
import CommentArea from '../comments/CommentArea'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './card.css'

const SingleBook = ({ book, img, category, title, price, asin }) => {

  const [selected, setSelected] = useState(false)

  const border = () => {
    setSelected(!selected)
    //console.log(selected);
  }

  return (
    <Card
      className='card'
      style={{ width: '18rem' }}>
      <Card.Img
        className={`${selected ? 'Bordo' : ''}`}
        onClick={border}
        variant='top'
        src={img}
      />
      <Card.Body className='corpo'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='testo'>{category}</Card.Text>
        <Card.Text className='testo'>{price}€</Card.Text>

        <Button variant="success">{price}€</Button>
        <Button
          variant="danger">
          <Link to={`/bookdetail/${asin}`} className='text-black'>
            Book Detail
          </Link>
        </Button>
      </Card.Body>
      <Card.Body className='modale'>
        {selected ? <CommentArea bookId={asin} /> : ''}
      </Card.Body>
    </Card>
  )

}

export default SingleBook