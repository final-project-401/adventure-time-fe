import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  async function handleLogin(email) {
    loginWithRedirect();
    try {
      if (isAuthenticated && user) {
        let config = {
          baseUrl: 'postgres://localhost:5432/adventure-time',
          url: '/api/user',
          method: 'post',
          data: user.email,
        }
        const response = await axios.post(config)
        console.log(response.data);
      }
    }
  }

  return (
    !isAuthenticated && (
      <button onClick={() => handleLogin()}>
        Sign in
      </button>
    )

  )
}

export default LoginButton;
