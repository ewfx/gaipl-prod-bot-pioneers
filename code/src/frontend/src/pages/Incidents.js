import React, { useEffect, useState, useCallback } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, MenuItem, TablePagination, Button, CircularProgress } from "@mui/material";
import axios from "axios";

const columns = [
  "number", "incident_state", "active", "reassignment_count", "reopen_count", "sys_mod_count", "made_sla", "caller_id",
  "opened_by", "opened_at", "sys_created_by", "sys_created_at", "sys_updated_by", "sys_updated_at", "contact_type", "location",
  "category", "subcategory", "u_symptom", "cmdb_ci", "impact", "urgency", "priority", "assignment_group", "assigned_to",
  "knowledge", "u_priority_confirmation", "notify", "problem_id", "rfc", "vendor", "caused_by", "resolved_by",
  "resolved_at", "closed_at"
];

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [filterColumn, setFilterColumn] = useState("number");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);  // ✅ Show loading indicator
    axios.get(`http://localhost:8000/incidents/`, {
      params: { 
        page: page + 1, 
        rows_per_page: rowsPerPage, 
        filter_column: filterColumn, 
        filter_value: filterValue 
      }
    })
    .then(response => {
      console.log("API Response:", response.data);  // ✅ Debugging
      setIncidents(response.data.incidents);
      setTotalRecords(response.data.total_records);
    })
    .catch(error => console.error("Error fetching incidents:", error))
    .finally(() => setLoading(false)); // ✅ Hide loading indicator
  }, [page, rowsPerPage, filterColumn, filterValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (e) => setFilterColumn(e.target.value);
  const handleValueChange = (e) => setFilterValue(e.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <h2>Incident List</h2>

      {/* Filter Dropdown & Search Bar */}
      <TextField
        select
        label="Filter By"
        value={filterColumn}
        onChange={handleFilterChange}
        sx={{ marginRight: 2, width: 200 }}
      >
        {columns.map(col => (
          <MenuItem key={col} value={col}>{col}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Enter Value"
        value={filterValue}
        onChange={handleValueChange}
        sx={{ width: 300, marginRight: 2 }}
      />

      

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Table sx={{ minWidth: 650, border: "1px solid #ccc", marginTop: 2 }}>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.length > 0 ? (
              incidents.map((incident, rowIndex) => (
                <TableRow key={`${incident.number}-${rowIndex}`}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={`${incident.number}-${colIndex}`}>
                      {incident[col] !== undefined ? incident[col].toString() : "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">No Data Available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Incidents;
