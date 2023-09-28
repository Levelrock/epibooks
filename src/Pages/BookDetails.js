import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { Container, Row, Col } from 'react-bootstrap'
import BeatLoader from'react-spinners/BeatLoader'
import BookCard from '../Component/card/BookCard'
import CommentArea from '../Component/comments/CommentArea'


const BookDetails = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { bookasin } = useParams();  
  //console.log('sono qui', bookasin);
  const [bookDetail, setBookDetail] = useState(null)
  //console.log(bookDetail)




  const GetBookDetail = async () => {
    try {
      setIsLoading(true);
      const response = await fetch (`https://epibooks.onrender.com/${ bookasin }`);
      //console.log(response);

      const data = await response.json()
      console.log(data);


      setBookDetail(data)
      console.log(setBookDetail(data));
      setIsLoading(false)


    } catch (e) {
      setError(e)
      console.log(e);
    }
  }


  useEffect(() => {
    GetBookDetail();
  }, [bookasin, setIsLoading, setError])








  return (
    <Container className='mt-5'>
      {error && <h1>errore nel recupero dei dati</h1>}
      {!isLoading && !error && (
        <BeatLoader
          style={{ display: "flex", justifyContent: "center", height: '100vh' }}
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <Row>
        <Col className="d-flex justify-content-start gap-4 flex-wrap">
          {
            bookDetail && (
              <BookCard 
                key={nanoid()}
                title={bookDetail[0].title}
                category={bookDetail[0].category}
                img={bookDetail[0].img}
                price={bookDetail[0].price}
                asin={bookDetail[0].asin}
              />
            )
          }

        </Col>
        <Col>
          <CommentArea bookId={bookasin}/>
        </Col>
      </Row>
    </Container>

  )
}



export default BookDetails