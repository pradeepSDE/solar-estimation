import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the result image URL from your server endpoint
      setImageUrl(`https://solar-estimation-server.vercel.app/images/result.png`);
   
  }, []);

  return (
    <div>
      <h1>Area available</h1>
      {imageUrl && <img src={imageUrl} alt="Processed Result" />}
    </div>
  );
}

export default Results;
