import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function SetHomePhoto() {

    const [photo, setPhoto] = useState([]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        console.log(file);
    };

    const handleAddHomePhoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photos', photo);
        let photoUrl = '';

        // get current home photo
        let currentPhotoUrl = '';
        try {
            const response = await axios.get('http://localhost:5000/folders/home');
            currentPhotoUrl = response.data.photoUrl;
        } catch (error) {
            console.error('Error fetching home photo:', error);
        }

        // delete current home photo
        try {
            const photoName = currentPhotoUrl.split('/').pop();
            const response = await axios.delete(`http://localhost:5000/folders/delete/${photoName}`);
            console.log('Deleted home photo:', response.data);
        } catch (error) {
            console.error('Error deleting home photo:', error);
        }

        try {
            const response = await axios.post('http://localhost:5000/folders/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            photoUrl = response.data.urls[0];
        } catch (error) {
            console.error('Error uploading photos:', error);
        }

        try {
            const response = await axios.put('http://localhost:5000/folders/home', {
                photoUrl: photoUrl
            });
            console.log('Set home photo:', response.data);
        } catch (error) {
            console.error('Error setting home photo:', error);
        }
        window.location.href = '/';
    }


    return (
        <div>
            <h1>Set Home Photo</h1>
            <form onSubmit={handleAddHomePhoto} style={{ width: '50%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <input
                        type="file"
                        id="file"
                        name="photos"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ width: '30%' }}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
