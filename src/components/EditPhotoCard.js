import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "react-bootstrap";


export default function EditPhotoCard({ signedPhotoUrl, photoUrl, folderId, onDelete }) {

    const [isLoading, setIsLoading] = useState(true);
    const [photo, setPhoto] = useState({});
    const [showModal, setShowModal] = useState(false); // Declare the state variables



    const cardStyle = {
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        boxSizing: "border-box",
        textAlign: "center",
        width: "200px",
        flex: "1 1 30%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for hover effects
        cursor: "pointer", // Changes cursor to pointer on hover
        backgroundColor: "#ffffff",
    };

    // Inline styles for the image container
    const imageContainerStyle = {
        width: "100%",
        paddingTop: "75%",
        position: "relative",
    };

    // Inline styles for the image
    const imageStyle = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "10px",
    };

    // Hover styles (can be applied via inline styles, but CSS is more suitable for hover effects)
    const hoverStyle = {
        transform: "scale(1.05)", // Slightly scale up the card
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow to highlight
    };

    // const fetchAndSetPhoto = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/folders/${folderId}/photos/${photoId}`);
    //         setPhoto(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(`Error fetching photos in folder card. FolderId: ${folderId}. PhotoId ${photoId}`, error);
    //     }
    //     setIsLoading(false);
    // }

    const confirmDelete = async () => {
        const photoName = photoUrl.split('/').pop();
        try {

            // const encodedUrl = encodeURIComponent(photoUrl);
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/folders/delete/${photoName}`);
        } catch (error) {
            console.error('Error fetching photos in folder card:', error);
        }

        console.log('Delete confirmed on s3');

        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/folders/${folderId}/photos/${photoName}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting photos in folder card:', error);
        }

        setShowModal(false);

        onDelete(photoUrl);
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // useEffect(() => {
    //     fetchAndSetPhoto();
    // }, []);

    return (
        <div
            className="folder-card"
            style={cardStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = hoverStyle.transform}
            onMouseOut={(e) => e.currentTarget.style.transform = "none"}
        >
            {!photoUrl ? <p>Loading...</p> :
                <div>
                    <Button onClick={() => handleDeleteClick()} variant="danger"><RiDeleteBin5Line /></Button>
                    <div style={imageContainerStyle}>
                        <img
                            src={signedPhotoUrl}
                            style={imageStyle}
                        />
                    </div>
                </div>
            }
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{`Are you sure you want to delete this photo?`}</p>
                        <button onClick={confirmDelete}>Delete</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}