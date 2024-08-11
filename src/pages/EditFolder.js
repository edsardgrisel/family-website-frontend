import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function EditFolder() {
    const { id } = useParams();
    const [folder, setFolder] = useState({});
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchFolder();
    }, []);

    return (
        <div>
            <h2>{"Edit " + folder.title}</h2>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={folder.title} onChange={(e) => setFolder({ ...folder, title: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={folder.location} onChange={(e) => setFolder({ ...folder, location: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="text" id="startDate" name="startDate" value={folder.startDate} onChange={(e) => setFolder({ ...folder, startDate: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input type="text" id="endDate" name="endDate" value={folder.endDate} onChange={(e) => setFolder({ ...folder, endDate: e.target.value })} />
                </div>

                <button type="submit" >Save</button>
            </form>
        </div>
    );

}