import React from 'react';
import { useState, useEffect } from 'react';
import FolderCard from '../components/FolderCard';
import axios from 'axios';
import '../styles/FoldersPage.css';



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [home, setHome] = useState({});

  const fetchAndSetHome = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/folders/home`);
      setHome(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
    setIsLoading(false);
  }



  useEffect(() => {
    fetchAndSetHome();
  }, []);

  const footerStyle = {
    backgroundColor: '#f1f1f1', // Light grey background color
    textAlign: 'center',
    padding: '10px',
    marginTop: 'auto', // Pushes the footer to the bottom of the page
    borderTop: '1px solid #ddd', // Optional: adds a border at the top of the footer
    width: '100%',
    position: 'relative', // Ensures the footer is positioned correctly within its container
    bottom: '0', // Sticks the footer to the bottom
  };


  return (
    <div>
      {isLoading ? <p>Loading...</p> :
        <div>
          <div style={{ flex: 1 }}>
            <img src={home.photoUrl} alt={home.photoUrl} style={{ width: '100%', height: '100%' }} />
          </div>
          <div>

            {home.favouriteFolders && (
              <div style={{ border: "10px solid white" }}>
                <h2 style={{ textAlign: 'center' }}>Family Favorites</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', }}>
                  <div className="scrollable-row-container">
                    <div className="scrollable-row">
                      {home.favouriteFolders.map(folderId => (
                        <FolderCard className="scrollable-item" folderId={folderId} key={folderId} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }



      <footer style={footerStyle}>
        <p>This website was created by Edsard Grisel</p>
      </footer>

    </div>
  );
}



{/* <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', border: "10px solid white" }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ flex: 1 }}>
              <img src={image1.url} alt={image1.title} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1 style={{ textAlign: 'center' }}>Welcome To The Grisel Family Website!</h1>
            </div>
            <div style={{ flex: 1 }}>
              <img src={image2.url} alt={image2.title} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ flex: 1 }}>
              <img src={image3.url} alt={image3.title} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <img src={image4.url} alt={image4.title} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <img src={image5.url} alt={image5.title} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div> */}







// function fetchImage() {
//   try {
//     const response = await axios.get(`http://localhost:5000/folders/${tempId}`);
//     setFolder(response.data);
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching photos:', error);
//   }
//   setLoading(false);



//   // return [
//   //   { id: 1, url: "images/family-photo-mock.jpg", title: "Image 1", date: "2023-07-29", location: "Sample Location 1" },
//   //   { id: 2, url: "images/family-photo-mock.jpg", title: "Image 2", date: "2023-07-29", location: "Sample Location 2" },
//   //   { id: 3, url: "images/family-photo-mock.jpg", title: "Image 3", date: "2023-07-29", location: "Sample Location 3" },
//   //   { id: 4, url: "images/family-photo-mock.jpg", title: "Image 4", date: "2023-07-29", location: "Sample Location 4" },
//   //   { id: 5, url: "images/family-photo-mock.jpg", title: "Image 5", date: "2023-07-29", location: "Sample Location 5" },
//   //   { id: 6, url: "images/family-photo-mock2.jpg", title: "Summer 2024", date: "2023-07-29", location: "Sample Location 6" },
//   //   { id: 7, url: "images/family-photo-mock.jpg", title: "Easter 2024", date: "2023-07-29", location: "Sample Location 7" },
//   //   { id: 8, url: "images/family-photo-mock.jpg", title: "Christmas 2023", date: "2023-07-29", location: "Sample Location 8" }
//   // ];
// }