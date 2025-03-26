import Layout from "./components/Layout";
import Incidents from "./pages/Incidents";
import Chatbot from "./pages/Chatbot";
import Telemetry from "./pages/Telemetry";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/telemetry" element={<Telemetry />} /> {/* ✅ Define Route */}
        </Routes>
    </Layout>
  );
}

export default App;
