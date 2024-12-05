// import React from 'react';
// import { Navigate } from 'react-router-dom';

// // Check if the user is authenticated (token exists in localStorage)
// const PrivateRoute = ({ element, ...rest }) => {
//   const token = localStorage.getItem('authToken'); // You might use sessionStorage or cookies too

//   // If there's no token or the token is invalid (expired), redirect to the login page
//   if (!token || isTokenExpired(token)) {
//     return <Navigate to="/login" />;
//   }

//   // If token exists and is valid, allow access to the protected route
//   return element;
// };

// // Function to check if token is expired
// const isTokenExpired = (token) => {
//   const decodedToken = jwt.decode(token);
//   if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
//     return true;
//   }
//   return false;
// };

import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';  // Correct import style

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');  // Make sure the key matches the one used in Signup

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return element;
};

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt_decode(token);  // Decode token using jwt_decode
    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;  // Treat any error as expired
  }
};

export default PrivateRoute;





