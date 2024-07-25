import axios from "axios";
import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const CaptureImg = () => {
  const [picture, setPicture] = useState("");
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);

  const submitPicture = () => {
    // Add your submit logic here
    console.log("Picture submitted:", picture);
    axios.post("/capture", { image: picture }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="align-items-center  flex-col  justify-center items-center ">
      <h2 className="mb-5 text-2xl flex justify-center items-center ">
        Capture the image
      </h2>
      <div className=" flex   justify-center">
        {picture === "" ? (
          <Webcam
            className=" rounded-lg "
            audio={false}
            height={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            width={500}
          />
        ) : (
          <img src={picture} alt="Captured" />
        )}
      </div>
      <div className="align-items-center flex justify-center  ">
        {picture !== "" ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPicture("");
              }}
              className="btn btn-primary bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold mt-2  py-2 px-4 rounded"
            >
              Retake
            </button>
            <button
              onClick={submitPicture}
              className="btn btn-success bg-green-500 m-2 hover:bg-green-700 text-white font-bold mt-2  py-2 px-4 rounded"
            >
              Submit
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="btn btn-danger bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 m-2 py-2 px-4 rounded"
          >
            Capture
          </button>
        )}
      </div>
      {/* <div className="flex justify-center">

        <Link to={'/'}  className=' mt-5 hover:bg-green-700 px-5 py-3 bg-green-500 text-white text-lg rounded-lg font-semibold  '>Back to home </Link>
      </div> */}
    </div>
  );
};

export default CaptureImg;
