import React, { useState } from "react";
import { TextField, Button, Paper, Typography, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleChat = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`http://localhost:8000/chatbot/?query=${encodeURIComponent(query)}`);
      setResponse(res.data.response);
    } catch (error) {
      setResponse("Error fetching response. Please try again.");
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "blue",
          color: "white",
          "&:hover": { backgroundColor: "darkblue" },
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat Window */}
      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 70,
            right: 20,
            width: 300,
            padding: 2,
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">AI Chatbot</Typography>
          <TextField
            label="Ask a question"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ marginY: 1 }}
          />
          <Button variant="contained" onClick={handleChat} fullWidth>
            Send
          </Button>
          {response && (
            <Paper sx={{ marginTop: 2, padding: 1, backgroundColor: "#f5f5f5" }}>
              <Typography variant="body2"><b>AI:</b> {response}</Typography>
            </Paper>
          )}
        </Paper>
      )}
    </>
  );
};

export default Chatbot;
