import { Navigate } from "react-router-dom";

/**
 * role can be:
 * - number (e.g. 1, 2, 3)
 * - array of numbers (e.g. [1, 2])
 * - undefined (means any logged-in user allowed)
 */
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = Number(localStorage.getItem("role"));

  // ❌ NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ ROLE CHECK (supports single or multiple roles)
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  // ✅ AUTHORIZED
  return children;
}
