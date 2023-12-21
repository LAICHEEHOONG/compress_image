import React from "react";
import { useNavigate } from "react-router-dom";

const FourOFour = () => {
    const navigate = useNavigate();

    const toHomePage = () => {
        navigate('/')
    }

  return (
    <div className="flex flex-col items-center mt-12 h-screen">
      <h1 className="text-3xl text-center text-red-500 font-bold mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-center text-gray-600 leading-loose mb-4">
        Oops! The page you were looking for doesn't seem to exist.
      </p>
      <div className="flex justify-center">
        <button 
        className="rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 mr-4"
        onClick={toHomePage}
        >
          Go Home
        </button>
        {/* <button className="rounded-md px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300">
          Browse Products
        </button> */}
      </div>
    </div>
  );
};

export default FourOFour;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const HomeButton = () => {
//   const navigate = useNavigate();

//   const goToHomePage = () => {
//     navigate('/');
//   };

//   return (
//     <button onClick={goToHomePage}>Go to Home</button>
//   );
// };

// export default HomeButton;
