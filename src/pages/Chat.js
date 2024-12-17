import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import '../styles/Chat.css'; // Import the CSS file

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userName = localStorage.getItem('userName');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat`);
                const sortedMessages = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setMessages(sortedMessages);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!userName) {
            alert('You must be logged in to send a message');
            return;
        }

        const messageData = { user: userName, message: newMessage };

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat`, messageData);
            setMessages([...messages, response.data]); // Add new message to the end of the array
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div className="chat-box">
                <div ref={chatContainerRef} className="chat-container">
                    {messages.map((msg, index) => (
                        <div key={index} className="message-container">
                            <div className="message-user">
                                <strong>{msg.user}</strong>
                            </div>
                            <div className="message-bubble">
                                {msg.message}
                            </div>
                            <div className="message-info">
                                <em>{new Date(msg.createdAt).toLocaleString()}</em>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Form>
                <Form.Group controlId="newMessage">
                    <Form.Label>New Message</Form.Label>
                    <Form.Control
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter your message"
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </Form>
        </div>
    );
};

export default Chat;