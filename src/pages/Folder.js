import React from 'react';
import { useParams } from 'react-router-dom';

export default function Folder() {
    const { id } = useParams();

    const fetchFolder = async () => {
        console.log("Fetch folder to be implemented");
    };
    return (
        <div>
            <h2>{"Folder " + id}</h2>
        </div>
    );
}