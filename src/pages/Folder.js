import React from 'react';
import { useParams } from 'react-router-dom';

export default function Folder() {
    const { id } = useParams();
    const [folder, setFolder] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const fetchFolder = async () => {
        setFolder({
            title: "Summer 2024", 
            images: [
                { id: 1, url: "/images/family-photo-mock.jpg", date: "2023-07-29", location: "Sample Location 1" },
                { id: 2, url: "/images/family-photo-mock.jpg", date: "2022-07-29", location: "Sample Location 2" },
                { id: 3, url: "/images/family-photo-mock.jpg", date: "2021-07-29", location: "Sample Location 3" },
                { id: 4, url: "/images/family-photo-mock.jpg", date: "2020-01-15", location: "Sample Location 4" },
                { id: 5, url: "/images/family-photo-mock.jpg", date: "2020-01-15", location: "Sample Location 5" },
                { id: 6, url: "/images/family-photo-mock2.jpg", date: "2024-05-22", location: "Sample Location 6" },
                { id: 7, url: "/images/family-photo-mock.jpg", date: "2024-04-12", location: "Sample Location 7" },
                { id: 8, url: "/images/family-photo-mock.jpg", date: "2023-12-25", location: "Sample Location 8" }
            ],
        });
        setLoading(false);

    };

    React.useEffect(() => {
        fetchFolder();
    }, []);

    return (
        <div>
            {loading ? (<p>Loading...</p>) : (
                <div>
                    <h1>{folder.title}</h1>
                    {folder.images.map(image => (
                    <img onError={(e) => console.log(e)} key={image.id} src={image.url} alt={image.url} />
                ))}
                </div>
                )}
        </div>
    );
}