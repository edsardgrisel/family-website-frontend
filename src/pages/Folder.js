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
    const [folder, setFolder] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        isFavorite: false,
        photos: [],
    });
    const [photoUrls, setPhotoUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Declare the state variables


    //////// temp
    ////////



    const fetchFolder = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/folders/${id}`);
            setFolder(response.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
        setLoading(false);
    }

    const fetchPhotoUrls = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/folders/${id}/photos`);
            setPhotoUrls(response.data.photoUrlTuples);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    }


    const confirmDelete = async () => {
        var photoUrls = [];
        // Get list of photos from folder
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/folders/${id}`);
            photoUrls = response.data.photos;
        } catch (error) {
            console.error('Error fetching photos from mongodb folder:', error);
        }
        console.log(photoUrls);
        // Delete photos from s3
        try {
            for (const photo of photoUrls) {
                const photoName = photo.split('/').pop();
                try {
                    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/folders/delete/${photoName}`);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error deleting photo from S3:', error);
                }
            }
        } catch (error) {
            console.error('Error deleting photos in S3:', error);
        }

        // Delete folder from mongodb
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/folders/${id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting folder from mongodb', error);
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
        fetchPhotoUrls();
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
                    <p>{folder.description}</p>
                    <div className="image-container">

                        {photoUrls && photoUrls.map(tuple => (

                            <img
                                onError={(e) => console.log(e)}
                                key={tuple[0]}
                                src={tuple[1]}
                                alt={tuple[0]}
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