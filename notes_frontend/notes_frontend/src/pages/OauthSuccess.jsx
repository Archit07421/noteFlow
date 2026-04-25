// OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/notes"); // redirect after login
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
}

export default OAuthSuccess;