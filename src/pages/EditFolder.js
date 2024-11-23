import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import EditPhotoCard from '../components/EditPhotoCard';
import { set } from 'mongoose';

export default function EditFolder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [folder, setFolder] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        isFavorite: false,
        photos: [],
    });
    const [photoUrlsTuples, setPhotoUrlsTuples] = useState([]);
    const [loading, setLoading] = useState(true);
    // This should eventually be an array of photos
    const [newPhotos, setNewPhotos] = useState([]);

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setNewPhotos(files);
    };

    const fetchFolder = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/folders/${id}`);
            setFolder(response.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
        setLoading(false);
    }

    const fetchPhotoUrls = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/folders/${id}/photos`);
            setPhotoUrlsTuples(response.data.photoUrlTuples);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    }

    const uploadPhotosToBackend = async (files) => {
        const formData = new FormData();
        for (let file of files) {
            const newFileName = file.name.replace(/\s+/g, '-');
            const newFile = new File([file], newFileName, { type: file.type });
            formData.append('photos', newFile);
        }

        try {
            const response = await axios.post(`${process.env.SERVER_URL}/folders/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Uploaded photos:', response.data.urls);
            return response.data.urls;
        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    };

    useEffect(() => {
        fetchFolder();
        fetchPhotoUrls();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFolder = { ...folder, isFavorite: folder.isFavorite || false };

            console.log('Updated folder handleSubmit:', updatedFolder);

            await axios.put(`${process.env.SERVER_URL}/folders/${id}`, updatedFolder); // this line is not updating the favorite field to True

            console.log('Folder updated successfully');
        } catch (error) {
            console.error('Error updating folder:', error);
        }
    }

    const handleAddPhotos = async (e) => {
        e.preventDefault();
        try {
            // Upload photos to S3 and get the URLs
            const photoUrls = await uploadPhotosToBackend(newPhotos);
            console.log('Photo URLs:', photoUrls);

            if (!Array.isArray(photoUrls)) {
                throw new Error('Invalid response format');
            }

            // Update the folder object with the photo URLs
            const updatedFolder = { ...folder, photos: [...folder.photos, ...photoUrls] };
            delete updatedFolder.__v;

            console.log('Updated folder:', updatedFolder);

            // Send the updated folder object to the backend
            const addedFolder = await axios.put(`${process.env.SERVER_URL}/folders/${id}`, updatedFolder);

            // Update the folder state with the new photos
            setFolder(addedFolder);
            setNewPhotos([]); // Clear the newPhotos state
            fetchPhotoUrls();
        } catch (error) {
            console.error('Error adding photos:', error);
        }
    };


    const handleDeletePhoto = (photoId) => {
        setFolder(prevFolder => ({
            ...prevFolder,
            photos: prevFolder.photos.filter(photo => photo !== photoId)
        }));
        setPhotoUrlsTuples(prevTuples => prevTuples.filter(tuple => tuple[0] !== photoId));
    }

    return (
        <div style={{ border: '1px solid black', padding: '20px', borderRadius: '5px' }}>
            <h2>{`Edit Folder`}</h2>
            <button onClick={() => navigate(`/folders/${id}`)}>Back to Folder</button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <form onSubmit={handleSubmit} style={{ width: '50%' }}>
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

                            onChange={(e) => {
                                console.log('Checkbox checked:', e.target.checked); // Log the checked status
                                setFolder({ ...folder, isFavorite: e.target.checked });
                            }}
                        />
                    </div>

                    <button type="submit">Save</button>
                </form>

                <form onSubmit={handleAddPhotos} style={{ width: '50%' }}>
                    <h3>Add Photos</h3>
                    <p>You can select multiple photos by holding ctrl while clicking the files.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <input
                            type="file"
                            id="file"
                            name="photos"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {loading ? (<p>Loading...</p>) : (
                    photoUrlsTuples.map(tuple => (
                        <div key={tuple[0]} style={{ width: '25%', padding: '10px' }}>
                            <EditPhotoCard signedPhotoUrl={tuple[1]} photoUrl={tuple[0]} folderId={id} onDelete={handleDeletePhoto} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}