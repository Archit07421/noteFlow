import { Navigate } from "react-router-dom";

/**
 * Only renders children when a JWT exists in localStorage.
 * Otherwise redirects to login (same behavior as backend: no token → 401).
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
