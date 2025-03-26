import React, { useEffect, useState } from "react";
import { Paper, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// ✅ Register required Chart.js elements
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Telemetry = () => {
  const [incidentTrends, setIncidentTrends] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [metrics, setMetrics] = useState("");
  const [parsedMetrics, setParsedMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("resolved"); // Default: Resolved Incidents

  useEffect(() => {
    fetchIncidentTrends();
  }, [selectedMetric]);

  useEffect(() => {
    axios.get("http://localhost:8000/incident-categories")
      .then(response => setCategoryCounts(response.data))
      .catch(error => console.error("Error fetching incident categories:", error));

    axios.get("http://localhost:8000/metrics")
      .then(response => {
        setMetrics(response.data);
        setParsedMetrics(parseMetrics(response.data));
      })
      .catch(error => console.error("Error fetching metrics:", error))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Fetch incident trends dynamically based on selection
  const fetchIncidentTrends = () => {
    setLoading(true);
    axios.get(`http://localhost:8000/incident-trends/`, { params: { type: selectedMetric } })
      .then(response => setIncidentTrends(response.data))
      .catch(error => console.error("Error fetching incident trends:", error))
      .finally(() => setLoading(false));
  };

  // ✅ Parse Prometheus Metrics
  const parseMetrics = (data) => {
    const lines = data.split("\n");
    const apiRequests = [];

    lines.forEach(line => {
      if (line.startsWith("api_requests_total")) {
        const match = line.match(/api_requests_total\{endpoint="([^"]+)"\} ([0-9.]+)/);
        if (match) {
          apiRequests.push({ endpoint: match[1], count: parseFloat(match[2]) });
        }
      }
    });

    return apiRequests;
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <h2>Telemetry Metrics</h2>

      {/* Dropdown to Select Incident Trends Type */}
      <TextField
        select
        label="Select Metric"
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        sx={{ marginBottom: 2, width: 250 }}
      >
        <MenuItem value="created">No. of Incidents Created</MenuItem>
        <MenuItem value="resolved">No. of Incidents Resolved</MenuItem>
      </TextField>

      {loading ? <CircularProgress /> : (
        <>
          {/* 📈 Incident Trends (Line Chart) */}
          <h3>Incident Trends</h3>
          <Line
            data={{
              labels: incidentTrends.map(d => d.date),
              datasets: [{
                label: selectedMetric === "created" ? "No. of Incidents Created" : "No. of Incidents Resolved",
                data: incidentTrends.map(d => d.count),
                borderColor: selectedMetric === "created" ? "blue" : "green",
                pointRadius: 5,
                fill: false,
              }]
            }}
          />

          {/* 📊 Incident Categories (Bar Chart) */}
          <h3>Incident Categories</h3>
          <Bar
            data={{
              labels: Object.keys(categoryCounts),
              datasets: [{
                label: "Incident Count",
                data: Object.values(categoryCounts),
                backgroundColor: "green",
              }]
            }}
          />

          {/* 🔢 API Request Metrics Table */}
          <h3>API Request Trends</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>API Endpoint</strong></TableCell>
                <TableCell><strong>Request Count</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parsedMetrics.map((metric, index) => (
                <TableRow key={index}>
                  <TableCell>{metric.endpoint}</TableCell>
                  <TableCell>{metric.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Paper>
  );
};

export default Telemetry;
