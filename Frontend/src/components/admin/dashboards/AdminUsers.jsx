import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../api.js/axios.js";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();

  // ===============================
  // FETCH USERS
  // ===============================
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
      applyFilters(res.data);
    } catch (err) {
      setError("Admin not logged in or session expired");
    }
  };

  // ===============================
  // FILTER LOGIC
  // ===============================
  const applyFilters = (data) => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");
    const role = params.get("role");

    let result = [...data];

    if (filter === "pending") {
      result = result.filter((u) => u.status === 0);
    }

    if (filter === "active") {
      result = result.filter((u) => u.blockActiveStatus === 1);
    }

    if (filter === "blocked") {
      result = result.filter((u) => u.blockActiveStatus === -1);
    }

    if (role === "client") {
      result = result.filter((u) => u.roleId === 2);
    }

    if (role === "freelancer") {
      result = result.filter((u) => u.roleId === 3);
    }

    setFilteredUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters(users);
  }, [location.search]);

  // ===============================
  // APPROVE / REJECT USER
  // ===============================
  const updateApprovalStatus = async (userId, action) => {
    const url =
      action === "approve"
        ? "/admin/users/approve"
        : "/admin/users/reject";

    try {
      await api.put(url, {
        userId,
        status: action === "approve" ? 1 : -1,
      });
      fetchUsers();
    } catch {
      alert("Failed to update approval status");
    }
  };

  // ===============================
  // BLOCK / UNBLOCK USER
  // ===============================
  const toggleBlockUser = async (userId, currentStatus) => {
    const newStatus = currentStatus === -1 ? 1 : -1;

    try {
      await api.put("/admin/users/block", {
        userId,
        status: newStatus,
      });
      fetchUsers();
    } catch {
      alert("Failed to update user status");
    }
  };

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-users">
      <h2>Users</h2>

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Approval</th>
              <th>Account</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.uid}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>

                <td>
                  {u.roleId === 2
                    ? "Client"
                    : u.roleId === 3
                    ? "Freelancer"
                    : "Admin"}
                </td>

                <td>
                  {u.status === 0
                    ? "Pending"
                    : u.status === 1
                    ? "Approved"
                    : "Rejected"}
                </td>

                <td>
                  {u.blockActiveStatus === -1 ? "Blocked" : "Active"}
                </td>

                <td>
                  {u.status === 0 && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateApprovalStatus(u.uid, "approve")
                        }
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateApprovalStatus(u.uid, "reject")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {u.status === 1 && u.blockActiveStatus === -1 && (
                    <button
                      className="unblock-btn"
                      onClick={() =>
                        toggleBlockUser(u.uid, u.blockActiveStatus)
                      }
                    >
                      Unblock
                    </button>
                  )}

                  {u.status === 1 && u.blockActiveStatus !== -1 && (
                    <span className="active-text">Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
