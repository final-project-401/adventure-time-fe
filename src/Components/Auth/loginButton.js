import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();


  const handleLogin = async (email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/user`, {
        email: email,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      handleLogin(user.email);
    }
  }, [isAuthenticated, user]);

  async function handleLogin(email) {
    loginWithRedirect();
    // try {
    //   if (isAuthenticated && user) {
    //     let config = {
    //       baseUrl: 'postgres://localhost:5432/adventure-time',
    //       url: '/api/user',
    //       method: 'post',
    //       data: user.email,
    //     }
    //     const response = await axios.post(config)
    //     console.log(response.data);
    //   }
    // }
  }


  return (
    !isAuthenticated && (
      <button onClick={() => {
        loginWithRedirect();
      }}>
        Sign in
      </button>
    )
  );
};

export default LoginButton;
