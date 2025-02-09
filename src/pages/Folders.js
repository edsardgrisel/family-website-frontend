import React, { useState, useEffect } from 'react';
import FolderCard from '../components/FolderCard'; // Adjust the path as needed
import '../styles/FoldersPage.css'; // Import the CSS file
import axios from 'axios';

export default function Folders() {
  const [years, setYears] = useState([]);
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndSetFolders = async () => {
    try {
      console.log(`Url: ${process.env.REACT_APP_SERVER_URL}/folders/`);
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/folders/`);
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching photos in folder card:', error);
    }
  };

  const findAndSetYears = () => {
    const years = folders.map(folder => new Date(folder.startDate).getFullYear());
    const uniqueYears = [...new Set(years)];
    const sortedYears = uniqueYears.sort((a, b) => b - a);
    setYears(sortedYears);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchAndSetFolders();
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // useEffect to update years when folders change
  useEffect(() => {
    if (folders.length > 0) {
      findAndSetYears();
    }
  }, [folders]);

  return (
    <div className="folders-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        years.map(year => (
          <div className="scrollable-row-container" key={year}>
            <h2>{year}</h2>
            <div className="scrollable-row">
              {folders
                .filter(folder => new Date(folder.startDate).getFullYear() === year)
                .map(folder => (
                  <FolderCard className="scrollable-item" folderId={folder._id} key={folder._id} />
                ))}
            </div>
          </div>
        ))
      )}
      {folders.length === 0 && !isLoading && <p>No folders found.</p>}
    </div>
  );
}