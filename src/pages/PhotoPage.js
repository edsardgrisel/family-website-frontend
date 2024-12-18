import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const PhotoPage = () => {
    const { folderId, photoId } = useParams();
    const location = useLocation();
    const { photoUrl } = location.state || {};
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments/${folderId}/${photoId}`);
                setComments(response.data.comments || []);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [folderId, photoId]);

    const handleAddComment = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const userName = localStorage.getItem('userName');
        if (!userName) {
            alert('You must be logged in to comment');
            return;
        }

        const newComment = { user: userName, message: comment, folderId, photoId };

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments/add`, newComment);
            setComments([...comments, response.data.comment]);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddComment(e);
        }
    };

    return (
        <div>
            <h2>Photo</h2>
            <img src={photoUrl} alt="Photo" />
            <div>
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <strong>{comment.user}</strong>: {comment.message}
                        </li>
                    ))}
                </ul>
                <Form onSubmit={handleAddComment}>
                    <Form.Group controlId="newComment">
                        <Form.Label>New Comment</Form.Label>
                        <Form.Control
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your comment"
                            onKeyPress={handleKeyPress}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default PhotoPage;