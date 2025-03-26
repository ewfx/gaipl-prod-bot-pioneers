import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Left-Aligned Button */}
          <Button color="inherit" component={Link} to="/">Home</Button>

          {/* ✅ Centered Title */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              GEN AI Platform Support Management
            </Typography>
          </Box>

          {/* Right-Aligned Telemetry Button */}
          <Button color="inherit" component={Link} to="/telemetry">Telemetry</Button>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </>
  );
};

export default Layout;
