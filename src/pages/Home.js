import React from 'react';
import { useState, useEffect } from 'react';



export default function Home () {

  const [isLoading, setIsLoading] = useState(true);
  const [image1, setImage1] = useState({});
  const [image2, setImage2] = useState({});
  const [image3, setImage3] = useState({});
  const [image4, setImage4] = useState({});
  const [image5, setImage5] = useState({});


  function fetchImage() {
    setIsLoading(false);
    return [{ id: 1, url: "images/family-photo-mock.jpg", title: "Image 1", date: "2023-07-29", location: "Sample Location 1" },
    { id: 2, url: "images/family-photo-mock.jpg", title: "Image 2", date: "2023-07-29", location: "Sample Location 2" },
    { id: 3, url: "images/family-photo-mock.jpg", title: "Image 3", date: "2023-07-29", location: "Sample Location 3" },
    { id: 4, url: "images/family-photo-mock.jpg", title: "Image 4", date: "2023-07-29", location: "Sample Location 4" },
    { id: 5, url: "images/family-photo-mock.jpg", title: "Image 5", date: "2023-07-29", location: "Sample Location 5" }]
  }

  useEffect(() => {
    const images = fetchImage();
    setImage1(images[0]);
    setImage2(images[1]);
    setImage3(images[2]);
    setImage4(images[3]);
    setImage5(images[4]);
  });

  return (
    <div>

      {isLoading ? <p>Loading...</p> :
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
        </div>
      }

      



    </div>
  );
}