# 🚀 GEN AI Integrated Platform Management

---

## **📌 Features**
✅ **FastAPI Backend** with incident management APIs  
✅ **Chatbot Support** for common IT issues  
✅ **React Frontend** with an interactive dashboard  
✅ **Telemetry & Metrics** for API usage tracking  
✅ **Pagination & Filtering** for incident logs  

---

## **📂 Project Structure**
```
📁 code/src
│── 📂 backend
│   │── main.py                # FastAPI server
│   │── model.py               # Chatbot model training
│   │── telemetry.py           # Telemetry APIs
│   │── data/
│   │   ├── incident_event_log.xlsx  # Incident dataset
│   │   ├── chatbot_model.pkl       # Trained chatbot model (unable to upload in github due to size)
│── 📂 frontend
│   │── src/
│   │   ├── pages/
│   │   │   ├── Home.js        # Home page with chatbot + incidents
│   │   │   ├── Incidents.js   # Incident list with filtering
│   │   │   ├── Chatbot.js     # Floating chatbot UI
│   │   │   ├── Telemetry.js   # Metrics & trends
│   │   ├── components/
│   │   │   ├── Layout.js      # Navbar layout
│   │   ├── App.js             # Main app routing
│   │   ├── index.js           # React entry point
│   └── package.json           # Frontend dependencies
│── README.md                  # Project documentation
```

---

#### **🔹 Run FastAPI Server**
```bash
uvicorn main:app --reload
```
🚀 **Backend is live at:** `http://localhost:8000`

---

###  Frontend Setup (React)**
#### **🔹 Install Dependencies**
```bash
cd frontend
npm install
```
#### **🔹 Start React Frontend**
```bash
npm start
```
🚀 **Frontend is live at:** `http://localhost:3000`

---

## **🛠️ API Endpoints**
### **🔹 Incident Management**
| Method | Endpoint             | Description                         |
|--------|----------------------|-------------------------------------|
| `GET`  | `/incidents/`        | Get paginated incident list        |
| `GET`  | `/incident-trends/`  | Get created/resolved incidents per day |
| `GET`  | `/incident-categories/` | Get incident count by category |

### **🔹 Chatbot API**
| Method | Endpoint      | Description                     |
|--------|--------------|---------------------------------|
| `GET`  | `/chatbot/`  | Get IT support answers |

### **🔹 Telemetry & Metrics**
| Method | Endpoint    | Description                     |
|--------|------------|---------------------------------|
| `GET`  | `/metrics` | Get API usage & telemetry data |

---

## **🖥️ Frontend Features**
- **📌 Home Page:** Incidents list + Chatbot  
- **📌 Incidents Page:** Filtering, search, pagination  
- **📌 Chatbot:** Answers IT queries consistently  
- **📌 Telemetry Page:** API usage & trends visualization  

---

## **📊 Telemetry Metrics**
- **Incident Trends**: Track opened & resolved incidents  
- **API Usage**: Monitor request counts per endpoint  
- **Incident Categories**: See which issues occur most frequently  

---

## **🎥 Demo Video**
**🔗 Watch Demo Video:** Demo video is uploaded in gaipl-prod-bot-pioneers/artifacts/demo/
 
