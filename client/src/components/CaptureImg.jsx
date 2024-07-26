import axios from "axios";
import React, { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

const CaptureImg = () => {
  const [cam, setCam] = useState(false);
  const [picture, setPicture] = useState("");
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: cam ? { exact: "environment" } : "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);

  const reverseCam = () => {
    setCam((prev) => !prev);
  };

  const submitPicture = () => {
    setLoading(true);
    axios.post("/capture", { image: picture }).then((res) => {
      // console.log(res.data);
      setLoading(false);
      toast.success(res.data.message);
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
              <div className="flex justify-center items-center w-full">
                {loading ? (
                  <Oval
                    visible={true}
                    height="25"
                    width="52"
                    color="#ffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Submit"
                )}
              </div>
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
      <div className="flex justify-center">
        <button
          onClick={reverseCam}
          className=" mt-5 hover:bg-green-700 px-5 py-3 bg-green-500 text-white text-lg rounded-lg font-semibold  "
        >
          Reverse Camera{" "}
        </button>
      </div>
    </div>
  );
};

export default CaptureImg;
