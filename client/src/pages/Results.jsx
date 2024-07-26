import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the result image URL from your server endpoint
      // setImageUrl(`https://solar-estimation-server.vercel.app/images/result.png`);
     

        axios.get('/images/result.png').then((response) => { 
          
          const blob =  response.blob();
          console.log(blob)
          const imageUrl = URL.createObjectURL(blob);
          console.log(imageUrl)
          setImageUrl(imageUrl);

          
          
          // setImageUrl(response.data);
          // console.log(response);
        });
      
   
  }, []);

  return (
    <div>
      <h1>Area available</h1>
      {imageUrl && <img src={imageUrl} alt="Processed Result" />}
    </div>
  );
}

export default Results;
