import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.css";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      // In future: use sessionId to fetch from backend if needed
      console.log("Stripe session ID:", sessionId);
    }
  }, [location]);

  return (
    <div className="success-page">
      <h1>🎉 Thank you for your order!</h1>
      <p>Your payment was successful.</p>
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default SuccessPage;
