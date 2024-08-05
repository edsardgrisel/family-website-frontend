import React from "react";

export default function FolderCard({ folder }) {
    const handleClick = () => {
        window.location.href = "/folders/" + folder.id;
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

    return (
        <div
            className="folder-card"
            onClick={handleClick}
            style={cardStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = hoverStyle.transform}
            onMouseOut={(e) => e.currentTarget.style.transform = "none"}
        >
            <h6 style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{folder.title}</h6>
            <div style={imageContainerStyle}>
                <img 
                    src={folder.url} 
                    alt={folder.title} 
                    style={imageStyle}
                />
            </div>
        </div>
    );
}