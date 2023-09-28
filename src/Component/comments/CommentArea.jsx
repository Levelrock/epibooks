import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './CommentArea.css';

const CommentArea = ({ bookId }) => {
  const [comment, setComment] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [rate, setRate] = useState();
  const [refresh, setRefresh] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [editedRate, setEditedRate] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const emptytext = () => {
    setText('');
    setEmail('');
    setRate();
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${bookId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0NTc1MDJjMjllYzAwMTk4NzJmNmYiLCJpYXQiOjE2OTU4MzE4ODksImV4cCI6MTY5NzA0MTQ4OX0.hU6WfvlMRw1OS7TpTT4tBVVF4GELP0cL7ID2PCZM8io',
          },
        }
      );
      console.log('sono qui', response);
      const data = await response.json();
      console.log('i miei commenti sono', data);

      setComment(data);


    } catch (err) {
      setError(err.message);
    }
  };

  const postComments = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/',
        {
          method: 'POST',
          body: JSON.stringify({
            "rate": rate,
            "author": email,
            "comment": text,
            "elementId": bookId,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization':
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0NTc1MDJjMjllYzAwMTk4NzJmNmYiLCJpYXQiOjE2OTU4MzE4ODksImV4cCI6MTY5NzA0MTQ4OX0.hU6WfvlMRw1OS7TpTT4tBVVF4GELP0cL7ID2PCZM8io',
          }
        })


      const data = await response.json();
      setRefresh(!refresh)
      emptytext();
      console.log('i miei commenti sono', data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0NTc1MDJjMjllYzAwMTk4NzJmNmYiLCJpYXQiOjE2OTU4MzE4ODksImV4cCI6MTY5NzA0MTQ4OX0.hU6WfvlMRw1OS7TpTT4tBVVF4GELP0cL7ID2PCZM8io',
        },
      });
      setRefresh(!refresh)
    } catch (error) {
      console.log(error);
    }
  }

  const putComments = async (commentId, updatedComment) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0NTc1MDJjMjllYzAwMTk4NzJmNmYiLCJpYXQiOjE2OTU4MzE4ODksImV4cCI6MTY5NzA0MTQ4OX0.hU6WfvlMRw1OS7TpTT4tBVVF4GELP0cL7ID2PCZM8io',
        },
        body: JSON.stringify(updatedComment),
      });

      if (response.ok) {
        const updatedComments = comment.map(comment =>
          comment._id === commentId
            ? {
              ...comment,
              comment: updatedComment.comment,
              rate: updatedComment.rate,
            }
            : comment
        );
        setComment(updatedComments);
        setEditingCommentId(null);
      } else {
        console.error('Errore, non riesco ad modificare il commento');
      }
    } catch (error) {
      console.error('Impossibile modificare i commenti', error);
    }
  };
  const saveEditedComment = async commentId => {
    if (isEditing) {
      const updatedComment = {
        comment: editedCommentText,
        rate: editedRate,
      };
      await putComments(commentId, updatedComment);
    } else {
      cancelEditingComment();
    }
  };
  const startEditingComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);

    setIsEditing(true);
  };
  const cancelEditingComment = () => {
    setIsEditing(false);
    setEditingCommentId(null);
    setEditedCommentText('');
  };


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getComments();
  }, [refresh]);

  return (
    <>
      <Button
        variant='primary'
        onClick={openModal}>
        Mostra commenti
      </Button>

      <Modal
        show={showModal}
        onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Commenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {comment.map(comment => (
              <li key={comment._id}>
                <p>{comment.author}</p>
                {editingCommentId === comment._id ? (
                  <>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      value={editedCommentText}
                      onChange={e => setEditedCommentText(e.target.value)}
                    />
                    <Form.Group className='mb-3'>
                      <Form.Label>Nuovo voto</Form.Label>
                      <Form.Control
                        min={1}
                        max={5}
                        value={editedRate}
                        onChange={e => setEditedRate(e.target.value)}
                        name='editedRate'
                        type='number'
                      />
                    </Form.Group>
                    <Button
                      variant='primary'
                      onClick={() => saveEditedComment(comment._id)}>
                      Salva
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={() => cancelEditingComment()}>
                      Annulla
                    </Button>
                  </>
                ) : (
                  <>
                    <p>{comment.comment}</p>
                    <p>Voto: {comment.rate}/5</p>{' '}
                    <Button
                      className='mb-4'
                      variant='primary'
                      onClick={() =>
                        startEditingComment(comment._id, comment.comment)
                      }>
                      MODIFICA                      
                    </Button>
                    <Button
                      className='mb-4'
                      variant='danger'
                      onClick={() => deleteComment(comment._id)}>
                      ELIMINA
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1'>
              <Form.Label>Username/email</Form.Label>
              <Form.Control
                type='email'
                placeholder='name@example.com'
                autoFocus
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Commento</Form.Label>
              <Form.Control              
                rows={3}
                name='text'
                value={text}
                onChange={e => setText(e.target.value)}
                type='text'
              />
            </Form.Group>
            <Form.Label>Rate</Form.Label>
            <Form.Control
              min={1}
              max={5}
              value={rate}
              onChange={e => setRate(e.target.value)}
              name='rate'
              type='number'
            />
          </Form>
          <Button
            className='mt-3'
            variant='primary'
            onClick={e => postComments(e)}>
            Aggiungi
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={closeModal}>
            Chiudi
          </Button>
          <Button
            variant='primary'
            onClick={closeModal}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentArea;


