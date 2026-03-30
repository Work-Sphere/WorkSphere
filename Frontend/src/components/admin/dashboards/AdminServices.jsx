import { useEffect, useState } from "react";
import api from "../../../api.js/axios.js";
import { useSearch } from "../../../context/SearchContext";
import "./AdminServices.css";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const { searchQuery } = useSearch();

  // ===============================
  // FETCH SERVICES
  // ===============================
  const fetchServices = async () => {
    try {
      const res = await api.get("/admin/services");
      setServices(res.data);
    } catch (err) {
      setError("Admin not logged in or session expired");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ===============================
  // ADD / UPDATE SERVICE
  // ===============================
  const saveService = async () => {
    if (!name.trim()) {
      alert("Service name is required");
      return;
    }

    const url = editId
      ? `/admin/services/${editId}`
      : "/admin/services";

    try {
      if (editId) {
        await api.put(url, {
          serviceName: name,
          description: desc,
        });
      } else {
        await api.post(url, {
          serviceName: name,
          description: desc,
        });
      }

      setName("");
      setDesc("");
      setEditId(null);
      fetchServices();
    } catch (err) {
      alert("Failed to save service");
    }
  };

  // ===============================
  // DEACTIVATE SERVICE
  // ===============================
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this service?"))
      return;

    try {
      await api.delete(`/admin/services/${id}`);
      fetchServices();
    } catch (err) {
      alert("Failed to deactivate service");
    }
  };

  if (error) return <p className="error">{error}</p>;

  /* 🔹 FILTER SERVICES */
  // Filter by navbar search OR by current name in the "Add" form (to see if it exists)
  const filteredServices = services.filter((s) => {
    const matchesGlobal = s.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesForm = name.trim() && s.serviceName.toLowerCase().includes(name.toLowerCase());
    return matchesGlobal || matchesForm;
  });

  return (
    <div className="admin-services">
      <h2>Services</h2>

      {/* ADD / UPDATE FORM */}
      <div className="service-form">
        <input
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={saveService}>
          {editId ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* SERVICES LIST */}
      {filteredServices.length === 0 && <p>No services found</p>}

      <ul>
        {filteredServices.map((s) => (
          <li key={s.serviceId} className={name.trim() && s.serviceName.toLowerCase().includes(name.toLowerCase()) ? "highlight-match" : ""}>
            <strong>{s.serviceName}</strong>
            <p>{s.description}</p>

            <button
              onClick={() => {
                setEditId(s.serviceId);
                setName(s.serviceName);
                setDesc(s.description || "");
              }}
            >
              Edit
            </button>

            <button onClick={() => deleteService(s.serviceId)}>
              Deactivate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServices;
