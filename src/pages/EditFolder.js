import React from 'react';
import { useParams } from 'react-router-dom';

export default function EditFolder () {
    const {id} = useParams();

    return (
        <div>
            <h2>{"Edit Folder " + id}</h2>
        </div>
    );
        
  }