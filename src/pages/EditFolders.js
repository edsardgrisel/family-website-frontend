import React from 'react';
import { Link } from 'react-router-dom';

export default function EditFolders () {

  const folders = [
    { id: 1, name: 'Folder 1' },
    { id: 2, name: 'Folder 2' },
    { id: 3, name: 'Folder 3' },
  ];
  return (
      <div>
        <h2>Edit Folders</h2>
            <ul>
                {folders.map(folder => (
                    <li key={folder.id}>
                        <Link to={`/edit/${folder.id}`}>{"Edit " + folder.name}</Link>
                    </li>
                ))}
            </ul>
      </div>
    );
  }