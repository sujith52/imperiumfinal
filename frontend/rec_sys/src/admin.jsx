import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Database,
  Activity,
  AlertTriangle,
  TrendingUp,
  Play,
} from "lucide-react";
import axios from "axios";
import "./admin.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const data = [
  { name: "Jan", value: 90 },
  { name: "Feb", value: 95 },
  { name: "Mar", value: 85 },
  { name: "Apr", value: 70 },
  { name: "May", value: 90 },
  { name: "Jun", value: 90 },
];

const Admin = () => {
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");
  const [isRetraining, setIsRetraining] = useState(false);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/metrics/summary`)
      .then((res) => {
        setMetrics(res.data);
      })
      .catch((err) => {
        console.error("Error fetching metrics:", err);
      });
  }, []);

  const handleRetrain = async () => {
  try {
    setIsRetraining(true);
    setStatus("⏳ Retraining started...");
    setOutput("");

    const response = await axios.post(`${API_BASE_URL}/retrain`);

    setStatus(response.data.message || "✅ Training completed");
    setOutput(
      (response.data.output || "No output") +
        (response.data.error ? `\nERRORS:\n${response.data.error}` : "")
    );
  } catch (error) {
    let errorMsg = "❌ Network/Server Error";
    if (error.response) {
      errorMsg = `❌ ${error.response.data?.message || "Training failed"}`;
      setOutput(JSON.stringify(error.response.data, null, 2));
    }
    setStatus(errorMsg);
  } finally {
    setIsRetraining(false);
  }
 };


  const MetricCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    change,
    changeType,
  }) => (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon">
          <Icon />
        </div>
        {change && (
          <span className={`metric-change ${changeType}`}>
            {changeType === "positive" ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
      <div>
        <h3 className="metric-title">{title}</h3>
        <p className="metric-value">{value}</p>
        <p className="metric-subtitle">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <div className="header-icon">
              <Database />
            </div>
            <div>
              <h1>ML Dashboard</h1>
              <p className="header-subtitle">Real-time analytics & insights</p>
            </div>
          </div>
          <div className="admin-badge">Admin</div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* ✅ Metrics From Backend */}
        <div className="metrics-grid">
          {metrics ? (
            <>
              <MetricCard
                icon={Users}
                title="Total Users"
                value={metrics.total_users}
                subtitle="Active community"
                change="12.5"
                changeType="positive"
              />
              <MetricCard
                icon={Database}
                title="Total Items"
                value={metrics.total_items}
                subtitle="Movies & shows"
                change="8.3"
                changeType="positive"
              />
              <MetricCard
                icon={Activity}
                title="Interactions"
                value={metrics.total_interactions}
                subtitle="All time engagement"
                change="21.7"
                changeType="positive"
              />
              <MetricCard
                icon={AlertTriangle}
                title="Cold Start"
                value={metrics.cold_start_count}
                subtitle="Need attention"
                change="15.2"
                changeType="negative"
              />
            </>
          ) : (
            <p>Loading metrics...</p>
          )}
        </div>

        {/* Training Section */}
        <div className="training-section">
          <div className="training-header">
            <div className="training-info">
              <h2>Model Training</h2>
              <p>Retrain the recommendation model with latest data</p>
            </div>
            <button
              className="retrain-button"
              onClick={handleRetrain}
              disabled={isRetraining}
            >
              <Play />
              {isRetraining ? "Training..." : "Start Retraining"}
            </button>
          </div>

          {status && (
            <div className="status-display">
              <p className="status-text">{status}</p>
            </div>
          )}

          {output && (
            <div className="output-console">
              <h4>Training Output:</h4>
              <pre>{output}</pre>
            </div>
          )}
        </div>

        {/* Charts & Performance */}
        <div className="chart-metrics-grid">
          <div className="chart-container">
            <div className="chart-header">
              <TrendingUp />
              <h3 className="chart-title">CTR Score Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#60A5FA" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="performance-metrics">
            <h3 className="performance-title">Performance Metrics</h3>
            <div className="performance-list">
              <div className="performance-item">
                <div className="performance-header">
                  <span className="performance-label">Precision@K</span>
                  <span className="performance-value">0.89</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill emerald"
                    style={{ width: "89%" }}
                  ></div>
                </div>
              </div>

              <div className="performance-item">
                <div className="performance-header">
                  <span className="performance-label">Recall@K</span>
                  <span className="performance-value">0.76</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill blue"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </div>

              <div className="performance-item">
                <div className="performance-header">
                  <span className="performance-label">RMSE</span>
                  <span className="performance-value">0.94</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill orange"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>

              <div className="performance-item">
                <div className="performance-header">
                  <span className="performance-label">MAE</span>
                  <span className="performance-value">0.63</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill purple"
                    style={{ width: "63%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;