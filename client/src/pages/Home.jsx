import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Capture from "../components/CaptureImg";

const Home = () => {
  return (
    <div className=" bg-cover   bg-no-repeat bg-center  h-[100vh]">
      <div className="flex-col justify-center">

      <h1 className="text-5xl flex  justify-center m-5 p-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-300">
        Rooftop Solar Energy Potential Estimator
      </h1>
      <h2 className="text-3xl  flex  justify-center m-5 p-1 italic ">
        {" "}
        Leverage Satellite Data and AI for Accurate Solar Power Projections
      </h2>
      </div>

      <div className="flex justify-center mt-10    items-center">
        <div className="border-2 border-orange-300 flex-col justify-center items-center p-16 backdrop-blur-sm rounded-3xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex pt-4 flex-col items-center justify-center my-auto space-y-4"
            action="/"
          >
            <h2 className="text-2xl font-bold text-orange-400">Upload image</h2>
            <label
              htmlFor="profile-pic"
              className="flex items-center font-semibold space-x-2 text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.5 13.5A1.5 1.5 0 0 1 4 12v-6a1.5 1.5 0 0 1 3 0v6h4a1.5 1.5 0 0 1 1.5 1.5l-1.5 1.5v5a1.5 1.5 0 0 1-3 0v-5zM6 11.5c.41 0 .75-.34 1-.75h2c.25.41.5.75 1 .75h2c.41 0 .75-.34 1-.75v-2c-.25.41-.5.75-1 .75h-2c-.25.41-.5.75-1 .75v2z" />
              </svg>
              <span>Add Image</span>
            </label>

            <input
              type="file"
              style={{ display: "none" }}
              required
              id="profile-pic"
              name="profile-pic"
              className="block w-full bg-gray-200 border border-gray-300 p-2 rounded-md cursor-pointer focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-md shadow-md"
            >
              Upload
            </button>
          </form>
          <hr className="mt-2" />
          <h2 className="text-2xl flex justify-center p-1 font-bold text-orange-400">
            OR
          </h2>
          <div className="flex justify-center">
            <Link
              to={"/capture"}
              type="submit"
              className="bg-orange-700  flex justify-center items-center hover:bg-orange-800 text-white font-bold py-2 px-4   rounded-md shadow-md"
            >
              Capture
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
