import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    toast.error("Oops! You need to be logged in first.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
