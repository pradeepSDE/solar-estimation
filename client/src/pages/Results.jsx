import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
  // const [imageUrl, setImageUrl] = useState('');
  const imageUrl = 'https://solar-estimation-server.vercel.app/images/result.png';

  // useEffect(() => {
  //       // axios.get('/images/result.png').then((response) => { 
  //       //   setImageUrl(response.data);
  //       //   console.log(response);
  //       // });
   
  // }, []);

  return (
    <div>
      <h1>Area available</h1>
      {imageUrl && <img src={imageUrl} alt="Processed Result" />}
    </div>
  );
}

export default Results;
