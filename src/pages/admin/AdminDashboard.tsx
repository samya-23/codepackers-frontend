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
import jsPDF from "jspdf";
import "jspdf-autotable";


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

  const filterVisitors = (query: string, source: string) => {
  const lowerQuery = query.toLowerCase();
  return visitorData.filter((visitor) => {
    const sourceMatch = source === "all" || (visitor.source || "form") === source;
    const queryMatch =
      visitor.name.toLowerCase().includes(lowerQuery) ||
      visitor.email.toLowerCase().includes(lowerQuery);
    return sourceMatch && queryMatch;
  });
};


  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/dashboard`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data)) {
          data.sort((a, b) =>
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

  useEffect(() => {
  const escHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedVisitor(null);
  };
  document.addEventListener("keydown", escHandler);
  return () => document.removeEventListener("keydown", escHandler);
}, []);


  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("sessionExpiry");
    navigate("/admin", { replace: true });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(filterVisitors(query, selectedSource));
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
  ? new Date(curr.timestamp).toISOString().split("T")[0]
  : "Unknown";

      const existing = acc.find((item) => item.date === date);
      if (existing) existing.count += 1;
      else acc.push({ date, count: 1 });
      return acc;
    },
    []
  );
  const handleExportPDF = () => {
  if (!selectedVisitor) return;

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Query Details", 10, 10);
  doc.setFontSize(12);
  doc.text(`Name: ${selectedVisitor.name}`, 10, 20);
  doc.text(`Email: ${selectedVisitor.email}`, 10, 30);
  doc.text(`Phone: ${selectedVisitor.phone}`, 10, 40);
  doc.text(`Submitted At: ${new Date(selectedVisitor.timestamp || "").toLocaleString()}`, 10, 50);
  doc.text(`Query ID: ${selectedVisitor.queryId || "—"}`, 10, 60);
  doc.text(`Query Method: ${selectedVisitor.queryMethod?.join(", ") || "—"}`, 10, 70);

  const lines = doc.splitTextToSize(`Message: ${selectedVisitor.message || "—"}`, 180);
  doc.text(lines, 10, 80);

  doc.save(`query_${selectedVisitor.queryId || "visitor"}.pdf`);
};
useEffect(() => {
  if (sessionExpired) {
    const timeout = setTimeout(() => {
      navigate("/admin", { replace: true });
    }, 300000); // ⏱️ 5-minute auto redirect (300,000 ms)

    return () => clearTimeout(timeout);
  }
}, [sessionExpired, navigate]);


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
          <div className="stats-box">
            👥 Total Visitors: {filteredData.length}
          </div>
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
              setFilteredData(filterVisitors(searchQuery, val));
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
                  <th>Query Method</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
  {paginatedData.map((visitor, index) => (
    <tr
      key={index}
      className={
        visitor.source === "whatsapp" ? "whatsapp-row" : ""
      }
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
      <td>{visitor.queryMethod?.join(", ") || "—"}</td>
      <td>
        {visitor.message ? (
          <span
            className="clickable-link"
            onClick={() => setSelectedVisitor(visitor)}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            Click Here
          </span>
        ) : (
          "—"
        )}
      </td>
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

      {selectedVisitor && (
        <div
  className="modal-overlay"
  onClick={(e) => {
    if (e.target === e.currentTarget) setSelectedVisitor(null);
  }}
>
  <div
    className="modal-box"
    onClick={(e) => e.stopPropagation()} // 👈 This prevents overlay click event
  >
            <h3>Query Details</h3>
            <p><strong>Name:</strong> {selectedVisitor.name}</p>
            <p><strong>Email:</strong> {selectedVisitor.email}</p>
            <p><strong>Phone:</strong> {selectedVisitor.phone}</p>
            <p><strong>Submitted At:</strong> {new Date(selectedVisitor.timestamp || "").toLocaleString()}</p>
            <p><strong>Query ID:</strong> {selectedVisitor.queryId || "—"}</p>
            <p><strong>Query Method:</strong> {selectedVisitor.queryMethod?.join(", ") || "—"}</p>
            <p><strong>Message:</strong> {selectedVisitor.message || "—"}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="modal-btn"
                onClick={() => {
                  if (selectedVisitor?.message) {
                    navigator.clipboard.writeText(selectedVisitor.message);
                    alert("Message copied!");
                  }
                }}
              >
                Copy Message
              </button>
              <button className="modal-btn" onClick={handleExportPDF}>
    Export PDF
  </button>
              <button className="modal-btn" onClick={() => setSelectedVisitor(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
