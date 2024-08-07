import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Folder() {
    const { id } = useParams();
    const [folder, setFolder] = useState({});
    const [loading, setLoading] = useState(true);

    //////// temp
    const tempId = "66b386dc084f1c670fd79d9d";
    ////////

    const fetchFolder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/folders/${tempId}`);
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
            {loading ? (<p>Loading...</p>) : (
                <div>
                    <h1>{folder.title}</h1>
                    {folder.photos.map(image => (
                        <img onError={(e) => console.log(e)} key={image.id} src={image.url} alt={image.url} />
                    ))}
                </div>
            )}
        </div>
    );
}