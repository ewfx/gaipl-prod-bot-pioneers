import React from "react";
import Incidents from "./Incidents"; // ✅ Import Incidents Component
import Chatbot from "./Chatbot"; // ✅ Import Chatbot Component

const Home = () => {
  return (
    <div className="p-4">
      <Incidents />
      <Chatbot />
    </div>
  );
};

export default Home;
