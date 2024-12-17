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

    const handleAddComment = async () => {
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

    // Sort comments by time (earliest at the top)
    const sortedComments = comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: '0 1 50%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                <img src={photoUrl} alt="Photo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ flex: '1 1 50%', overflowY: 'auto' }}>
                <h5>Comments</h5>
                {sortedComments.map((c, index) => (
                    <div key={index} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', margin: '5px 0', border: '1px solid black', width: 'auto' }}>
                        <strong>{c.user}:</strong> {c.message}
                    </div>
                ))}
                <Form>
                    <Form.Group controlId="comment">
                        <Form.Label>Add a comment</Form.Label>
                        <Form.Control
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default PhotoPage;