import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const HandleUnknownRoute = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const allowedRoutes = [
      "/dashboard", "/support", "/terms", "/settings",
      "/privacy", "/users", "/add", "/list", "/orders"
    ];

    if (!token) {
      // Not logged in → redirect to login
      navigate("/", { replace: true });
    } else if (!allowedRoutes.includes(location.pathname)) {
      // Connected & unknown route → prevent navigation & show toast
      toast.error("404 Not Found. The page does not exist!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
      // Redirect to 404 page after short delay
      setTimeout(() => {
        navigate("/404-not-found", { replace: true });
      }, 500); // 0.5s 
    }
  }, [token, location.pathname, navigate]);

  return null;
};

export default HandleUnknownRoute;
