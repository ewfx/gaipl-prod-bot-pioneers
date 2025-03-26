import pandas as pd
from transformers import pipeline
import pickle
import os

# Ensure 'data' directory exists
os.makedirs("data", exist_ok=True)

print("Loading dataset...")
df = pd.read_csv("data/incident_event_log.csv", nrows=5000)

# Ensure necessary columns exist
REQUIRED_COLUMNS = [
    "number", "incident_state", "active", "reassignment_count", "reopen_count", "sys_mod_count", "made_sla", "caller_id",
    "opened_by", "opened_at", "sys_created_by", "sys_created_at", "sys_updated_by", "sys_updated_at", "contact_type", "location",
    "category", "subcategory", "u_symptom", "cmdb_ci", "impact", "urgency", "priority", "assignment_group", "assigned_to",
    "knowledge", "u_priority_confirmation", "notify", "problem_id", "rfc", "vendor", "caused_by", "resolved_by",
    "resolved_at", "closed_at"
]

print("Validating columns...")
for col in REQUIRED_COLUMNS:
    if col not in df.columns:
        raise ValueError(f"Missing required column: {col}")

# Prepare Data
print("Processing dataset...")
filtered_df = df.dropna(subset=REQUIRED_COLUMNS)
filtered_df["text"] = filtered_df.apply(lambda row: " | ".join([f"{col}: {row[col]}" for col in REQUIRED_COLUMNS]), axis=1)

# Save processed dataset
filtered_df.to_pickle("data/processed_incidents.pkl")
print("Processed dataset saved.")

# Initialize Chatbot Pipeline with GPT-Neo
print("Initializing chatbot model (this may take a while)...")
chatbot = pipeline("text-generation", model="EleutherAI/gpt-neo-125M", device="cpu")
print("Chatbot model loaded.")

# Save chatbot model
with open("data/chatbot_model.pkl", "wb") as model_file:
    pickle.dump(chatbot, model_file)

print("Model and processed dataset saved successfully.")
