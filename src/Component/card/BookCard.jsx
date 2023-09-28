import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BookCard = ({ img, title, catergory, asin, price, }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text>
          {catergory}
        </Card.Text>
        <Card.Text>
          {asin}
        </Card.Text>
        <Button variant="success">{price}€</Button>        
      </Card.Body>
    </Card>
  );
}

export default BookCard;