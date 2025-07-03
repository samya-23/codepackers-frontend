import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";

interface Visitor {
  name: string;
  email: string;
  phone: string;
  timestamp?: string;
  source?: string;
  queryMethod?: string[];
  message?: string;
  queryId?: string;
}

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [visitorData, setVisitorData] = useState<Visitor[]>([]);
  const [filteredData, setFilteredData] = useState<Visitor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [selectedSource, setSelectedSource] = useState("all");
  const rowsPerPage = 5;

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const expiry = localStorage.getItem("sessionExpiry");
    if (expiry) {
      const interval = setInterval(() => {
        if (Date.now() > Number(expiry)) {
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("sessionExpiry");
          setSessionExpired(true);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/visitors`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data)) {
          data.sort(
            (a, b) =>
              new Date(b.timestamp || 0).getTime() -
              new Date(a.timestamp || 0).getTime()
          );
          setVisitorData(data);
          setFilteredData(data);
        } else throw new Error("Invalid format");
      } catch (err) {
        console.warn("⚠️ Backend unreachable. Showing dummy data.");
        setVisitorData([]);
        setFilteredData([]);
        setError("⚠️ Backend not connected.");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("sessionExpiry");
    navigate("/admin", { replace: true });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = visitorData.filter(
      (v) =>
        v.name.toLowerCase().includes(query) ||
        v.email.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `visitors_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const chartData = filteredData.reduce<{ date: string; count: number }[]>(
    (acc, curr) => {
      const date = curr.timestamp
        ? new Date(curr.timestamp).toLocaleDateString()
        : "Unknown";
      const existing = acc.find((item) => item.date === date);
      if (existing) existing.count += 1;
      else acc.push({ date, count: 1 });
      return acc;
    },
    []
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 Visitor Submissions</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="table-wrapper">
        <div className="dashboard-tools">
          <div className="stats-box">👥 Total Visitors: {filteredData.length}</div>
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            value={selectedSource}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedSource(val);
              const filtered = visitorData
                .filter((v) => (val === "all" ? true : (v.source || "form") === val))
                .filter(
                  (v) =>
                    v.name.toLowerCase().includes(searchQuery) ||
                    v.email.toLowerCase().includes(searchQuery)
                );
              setFilteredData(filtered);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Sources</option>
            <option value="form">Form</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          <button onClick={downloadCSV}>Export CSV</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredData.length === 0 ? (
          <p>No visitors found.</p>
        ) : (
          <>
            <table className="visitor-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Submitted At</th>
                  <th>Query ID</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((visitor, index) => (
                  <tr
                    key={index}
                    className={visitor.source === "whatsapp" ? "whatsapp-row" : ""}
                  >
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{visitor.name}</td>
                    <td>{visitor.email}</td>
                    <td>{visitor.phone}</td>
                    <td>
                      {visitor.timestamp
                        ? new Date(visitor.timestamp).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>{visitor.queryId || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#007BFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {sessionExpired && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Session Expired</h3>
            <p>Your session has expired. Please log in again.</p>
            <button className="modal-btn" onClick={() => navigate("/admin")}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
