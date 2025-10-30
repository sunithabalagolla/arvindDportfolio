import { Navigate } from 'react-router-dom';
import { verifyAdminToken } from '../../utils/admin/adminApi'; 

const ProtectedRoute = ({ children }) => {
  // ✅ Use utility function to verify
  if (!verifyAdminToken()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;