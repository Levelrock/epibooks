import React, { useContext, useState } from "react";
import { Container, Row, Col, } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import { PostProvider } from "../../Context/PostContext";
import { nanoid } from "nanoid";
import SingleBook from "../card/SingleBook";



const LatestRelease = () => {
    const { filteredBooks, setFilteredBooks, error, setError, isLoading, setIsLoading } = useContext(PostProvider)
    // console.log(filteredBooks);

    return (
        <Container fluid>
            {error && <h1>errore nel recupero dei dati</h1>}
            {isLoading && !error && (
                <BeatLoader
                    style={{ display: "flex", justifyContent: "center", height: '100vh' }}
                    loading={isLoading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )}
            <Row>
                <Col className="d-flex justify-content-center gap-4 flex-wrap mt-5 col-8">
                    {!isLoading && !error &&
                        filteredBooks.slice(0, 69).map((book) => {
                            return (
                                <>
                                    <SingleBook
                                        key={nanoid()}
                                        title={book.title}
                                        catergory={book.category}
                                        img={book.img}
                                        price={book.price}
                                        asin={book.asin} />
                                </>

                            )
                        })}
                </Col>
            </Row>
        </Container>

    )
}

export default LatestRelease