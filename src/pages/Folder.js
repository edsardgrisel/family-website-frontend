import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/FolderPage.css';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function Folder() {
    const { id } = useParams();
    const [folder, setFolder] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Declare the state variables


    //////// temp
    ////////



    const fetchFolder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/folders/${id}`);
            setFolder(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
        setLoading(false);
    }

    const confirmDelete = async () => {
        // Add your delete confirmation logic here
        try {
            const response = await axios.delete(`http://localhost:5000/folders/${id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching photos in folder card:', error);
        }

        console.log('Delete confirmed');
        setShowModal(false);
        window.location.href = '/folders';
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };




    useEffect(() => {
        fetchFolder();
    }, []);

    return (
        <div>
            {loading ? (<p>Loading...</p>) : (
                <div>
                    <h1>
                        {folder.title}
                        <Link to={`/edit/${id}`}><CiEdit /></Link>
                        <Button onClick={() => handleDeleteClick()} variant="danger"><RiDeleteBin5Line /></Button>
                    </h1>
                    <div className="image-container">
                        {folder.photos.map(image => (
                            <img
                                onError={(e) => console.log(e)}
                                key={image.id}
                                src={image.url}
                                alt={image.url}
                                className="image-item" // Apply the CSS class
                            />
                        ))}
                    </div>
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{`Are you sure you want to delete ${folder.title}? All photos will be lost.`}</p>
                        <button onClick={confirmDelete}>Delete</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );

}