import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FolderCard({ folderId }) {

    const [isLoading, setIsLoading] = useState(true);
    const [folder, setFolder] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        isFavorite: false,
        photos: [],
    });
    const [photoUrl, setPhotoUrl] = useState([]);

    const handleClick = () => {
        window.location.href = "/folders/" + folderId;
    };

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

    const fetchAndSetFolder = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/folders/${folderId}`);
            setFolder(response.data);
        } catch (error) {
            console.error(`Error fetching photos in folder card ${folderId}:`, error);
        }
        setIsLoading(false);
    }

    const fetchPhotoUrl = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/folders/${folderId}/photo`);
            setPhotoUrl(response.data.photoUrl);
        } catch (error) {
            console.error('Error fetching photo URLs:', error);
        }
    };



    useEffect(() => {
        fetchAndSetFolder();
        fetchPhotoUrl();
    }, [folderId]);

    return (
        <div
            className="folder-card"
            onClick={handleClick}
            style={cardStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = hoverStyle.transform}
            onMouseOut={(e) => e.currentTarget.style.transform = "none"}
        >
            {isLoading || !folder || !photoUrl ? <p>Loading...</p> :
                <div>
                    <h6 style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{folder.title}</h6>
                    {photoUrl && (
                        <div style={imageContainerStyle}>
                            <img
                                src={photoUrl}
                                alt={folder.title}
                                style={imageStyle}
                            />
                        </div>
                    )}
                </div>
            }
        </div>
    );
}