import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import EditPhotoCard from '../components/EditPhotoCard';

export default function AddFolder() {
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
    const [loading, setLoading] = useState(true);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFolder = { ...folder, isFavorite: folder.isFavorite || false };
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/folders/`, updatedFolder); // this line is not updating the favorite field to True

            console.log('Folder updated successfully');
            console.log(response.data);
            if (response.data._id) {
                window.location.href = `/edit/${response.data._id}`;
            }
        } catch (error) {
            console.error('Error updating folder:', error);
        }
    }

    return (
        <div style={{ border: '1px solid black', padding: '20px', borderRadius: '5px' }}>
            <h2>{"Add Folder"}</h2>
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


            </div>

        </div>
    );

}