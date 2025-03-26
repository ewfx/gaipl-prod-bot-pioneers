The frontend is built with React.js and Material-UI, providing a user-friendly interface for incident management, chatbot support, and telemetry visualization.

📌 Features

✅ Incident Management Dashboard (List, Filtering, Pagination)

✅ Integrated Chatbot for IT Support Queries

✅ Real-time API Metrics & Telemetry

✅ Dynamic Charts for Incident Trends

✅ Material-UI Design for a Clean Interface

Frontend Project Structure

📁 frontend

│── 📂 src

│   │── 📂 pages

│   │   ├── Home.js        # Home page (incidents + chatbot)

|   |   ├── Chatbot.js     # Floating chatbot UI

│   │   ├── Incidents.js   # Incident list with filtering & pagination

│   │   ├── Telemetry.js   # API metrics and incident trends

│   │── 📂 components

│   │   ├── Layout.js      # Navbar layout

│   │── App.js             # Main app routing

│   │── index.js           # React entry point

│── package.json           # Frontend dependencies

│── README.md              # Frontend documentation

📌 Available Pages

🔹 Home Page (/)

📌 Displays incidents list

📌 Integrated chatbot at bottom-right corner

🔹 Incidents Page (/incidents)

📌 List of IT Incidents with details

📌 Filtering by column & search functionality

📌 Pagination to navigate large datasets

🔹 Chatbot 

📌  Answers for IT issues

🔹 Telemetry Page (/telemetry)

📊 Incident Trends Chart (Created vs Resolved)

📈 Incident Categories Chart

🔢 API Usage Metrics Table
