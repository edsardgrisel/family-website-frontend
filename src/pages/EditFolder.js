import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import EditPhotoCard from '../components/EditPhotoCard';

export default function EditFolder() {
    const { id } = useParams();
    const [folder, setFolder] = useState({});
    const [loading, setLoading] = useState(true);
    // This should eventually be an array of photos
    const [newPhotos, setNewPhotos] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewPhotos(files);
    };

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

    const uploadPhotosToBackend = async (photos) => {
        const formData = new FormData();
        photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });

        const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.urls; // Assuming the backend returns an object with a `urls` array
    };

    useEffect(() => {
        fetchFolder();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFolder = { ...folder, isFavorite: folder.isFavorite || false };
            { console.log(updatedFolder.isFavorite) } // this line prints True

            await axios.put(`http://localhost:5000/folders/${id}`, updatedFolder); // this line is not updating the favorite field to True

            console.log('Folder updated successfully');
        } catch (error) {
            console.error('Error updating folder:', error);
        }
    }

    const handleAddPhotos = async (e) => {
        e.preventDefault();
        try {
            // Upload photos to S3 and get the URLs
            const photoUrls = await saveToS3(newPhotos, folder.title);

            // Update the folder object with the photo URLs
            const updatedFolder = { ...folder, photos: [...folder.photos, ...photoUrls] };

            // Send the updated folder object to the backend
            await axios.put(`http://localhost:5000/folders/${id}`, updatedFolder);

            // Update the folder state with the new photos
            setFolder(updatedFolder);
            setNewPhotos([]); // Clear the newPhotos state
        } catch (error) {
            console.error('Error adding photos:', error);
        }
    };


    const handleDeletePhoto = (photoId) => {
        setFolder(prevFolder => ({
            ...prevFolder,
            photos: prevFolder.photos.filter(photo => photo._id !== photoId)
        }));
    }

    return (
        <div style={{ border: '1px solid black', padding: '20px', borderRadius: '5px' }}>
            <h2>{"Edit " + folder.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <form onSubmit={handleSubmit} style={{ width: '70%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={folder.title} onChange={(e) => setFolder({ ...folder, title: e.target.value })} style={{ width: '30%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" name="location" value={folder.location} onChange={(e) => setFolder({ ...folder, location: e.target.value })} style={{ width: '30%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label htmlFor="startDate">Start Date:</label>
                        <input type="text" id="startDate" name="startDate" value={folder.startDate} onChange={(e) => setFolder({ ...folder, startDate: e.target.value })} style={{ width: '30%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label htmlFor="endDate">End Date:</label>
                        <input type="text" id="endDate" name="endDate" value={folder.endDate} onChange={(e) => setFolder({ ...folder, endDate: e.target.value })} style={{ width: '30%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={folder.description} onChange={(e) => setFolder({ ...folder, description: e.target.value })} style={{ width: '30%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label htmlFor="favorite">Favorite:</label>
                        <input
                            type="checkbox"
                            id="favorite"
                            name="favorite"
                            checked={folder.isFavorite || false}
                            onChange={(e) => setFolder({ ...folder, isFavorite: e.target.checked })}
                            style={{ width: '30%' }}
                        />
                    </div>

                    <button type="submit">Save</button>
                </form>

                <form onSubmit={handleAddPhotos} style={{ width: '30%' }}>
                    <h3>Add Photo</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label htmlFor="file">Choose a file:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            style={{ width: '30%' }}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {loading ? (<p>Loading...</p>) : (
                    folder.photos.map(photo => (
                        <div key={photo._id} style={{ width: '25%', padding: '10px' }}>
                            <EditPhotoCard folderId={id} photoId={photo._id} onDelete={handleDeletePhoto} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}