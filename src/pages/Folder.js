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
            const response = await axios.get(`http://localhost:5000/folders/${id}`);
            setFolder(response.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
        setLoading(false);
    }

    const fetchPhotoUrls = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/folders/${id}/photos`);
            setPhotoUrls(response.data.photoUrlTuples);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    }


    const confirmDelete = async () => {
        // Add your delete confirmation logic here

        // get list of photos in folder
        // delete each photo

        try {
            const response = await axios.get(`http://localhost:5000/folders/${id}`);
            console.log(response.data);
            const photoUrls = response.data.folder.photos;
            console.log(photoUrls);
            for (let i = 0; i < photoUrls.length; i++) {
                console.log(photoUrls[i][0]);
                try {
                    const photoName = photoUrls[i][0].split('/').pop();
                    const response = await axios.delete(`http://localhost:5000/folders/${id}/photos/${photoName}`);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching photos in folder card:', error);
                }
            }
        } catch (error) {
            console.error('Error fetching photos in folder card:', error);
        }


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