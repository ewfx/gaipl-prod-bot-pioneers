from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pickle
import re
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from telemetry import track_metrics, metrics, get_incident_trends, get_incident_categories

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (For development)
    allow_credentials=True,
    allow_methods=["*"],   # Allow all HTTP methods
    allow_headers=["*"],   # Allow all headers
)

# Load processed dataset
filtered_df = pd.read_pickle("data/processed_incidents.pkl")

with open("./data/chatbot_model.pkl", "rb") as model_file:
    chatbot = pickle.load(model_file)


@app.get("/")
def home():
    return {"message": "IT Incident Management API is running."}

@app.get("/incidents/")
def get_incidents(page: int = 1, rows_per_page: int = 10, filter_column: str = None, filter_value: str = None):
    filtered_data = filtered_df.copy()

    if filter_column and filter_value:
        filtered_data = filtered_data[filtered_data[filter_column].astype(str).str.contains(filter_value, case=False, na=False)]
    
    total_records = len(filtered_data)
    start = (page - 1) * rows_per_page
    end = start + rows_per_page
    paginated_data = filtered_data.iloc[start:end].to_dict(orient="records")

    #print("API Response Example:", paginated_data[:3])

    return {"total_records": total_records, "incidents": paginated_data}

@app.get("/chatbot/")
def ai_chat(query: str = Query(..., title="User Query")):
    response = chatbot(query, max_length=100, num_return_sequences=1, do_sample=True, temperature=0.7)[0]["generated_text"]
    response = response.replace(query, "").strip()  # Remove the question from the response
    #response = response.split(". ")[0].strip()  # Keep only the first sentence for clarity
    response = re.sub(r"<.*?>", "", response)  # Remove HTML-like characters like <cbr>
    return {"response": response if response else "I'm sorry, I couldn't generate a response."}



# Middleware for tracking API metrics
app.middleware("http")(track_metrics)

# Telemetry Metrics Endpoint
@app.get("/metrics")
def telemetry_metrics():
    return metrics(filtered_df)

# Incident Trends API
@app.get("/incident-trends/")
def incident_trends():
    return get_incident_trends(filtered_df)

# Incident Categories API
@app.get("/incident-categories/")
def incident_categories():
    return get_incident_categories(filtered_df)

