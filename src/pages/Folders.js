import React from 'react';
import FolderCard from '../components/FolderCard'; // Adjust the path as needed
import '../styles/FoldersPage.css'; // Import the CSS file

export default function Folders() {

    const [years, setYears] = React.useState([]);

    const folders = [
        { id: 1, url: "images/family-photo-mock.jpg", title: "Summer", date: "2023-07-29", location: "Sample Location 1" },
        { id: 2, url: "images/family-photo-mock.jpg", title: "Summer", date: "2022-07-29", location: "Sample Location 2" },
        { id: 3, url: "images/family-photo-mock.jpg", title: "Summer", date: "2021-07-29", location: "Sample Location 3" },
        { id: 4, url: "images/family-photo-mock.jpg", title: "New 2020", date: "2020-01-15", location: "Sample Location 4" },
        { id: 5, url: "images/family-photo-mock.jpg", title: "Summer", date: "2020-01-15", location: "Sample Location 5" },
        { id: 6, url: "images/family-photo-mock2.jpg", title: "Summer", date: "2024-05-22", location: "Sample Location 6" },
        { id: 7, url: "images/family-photo-mock.jpg", title: "Easter", date: "2024-04-12", location: "Sample Location 7" },
        { id: 8, url: "images/family-photo-mock.jpg", title: "Christmas", date: "2023-12-25", location: "Sample Location 8" }
    ];

    function getYears() {
        const years = folders.map(folder => new Date(folder.date).getFullYear());
        const uniqueYears = [...new Set(years)];
        const sortedYears = uniqueYears.sort((a, b) => b - a);
        setYears(sortedYears); // Remove duplicates
    }

    React.useEffect(() => {
        getYears();
    }, []);

    return (
        <div className="folders-page">
            
                {console.log(years)}
                {years.map(year => (
                    <div className="scrollable-row-container" key={year}>
                        <h2>{year}</h2>
                        <div className="scrollable-row">
                            {folders.filter(folder => new Date(folder.date).getFullYear() === year).map(folder => (
                                    <FolderCard className="scrollable-item" folder={folder} />
                            ))}
                        </div>
                    </div>
                    )
                )}  
        </div>
    );
}
