import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const location = useLocation();

  if (token) {
    if (location.pathname === "/") {
      return <Navigate to={location.state?.from || "/dashboard"} replace />;
    }

    return children;
  }

  return children;
};

export default PublicRoute;
