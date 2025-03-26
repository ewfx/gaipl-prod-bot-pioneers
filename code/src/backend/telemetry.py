from prometheus_client import Counter, Gauge, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response
import pandas as pd

# Telemetry Metrics
API_REQUEST_COUNT = Counter("api_requests_total", "Total API requests", ["endpoint"])
ACTIVE_INCIDENTS = Gauge("active_incidents", "Number of active incidents")
RESPONSE_TIME_HISTOGRAM = Histogram("response_time_seconds", "Response time in seconds", ["endpoint"])

# Function to update active incidents count
def update_active_incidents(df):
    ACTIVE_INCIDENTS.set(len(df[df["active"] == True]))

# Middleware for tracking API metrics
async def track_metrics(request, call_next):
    response = await call_next(request)
    API_REQUEST_COUNT.labels(endpoint=request.url.path).inc()
    return response

# Incident Trends (Daily Resolutions)
def get_incident_trends(df, trend_type="resolved"):
    """
    Get the number of incidents created or resolved per day.
    
    Args:
        df (pd.DataFrame): The incident dataset.
        trend_type (str): "created" for incidents opened, "resolved" for incidents closed.
    
    Returns:
        list: List of dictionaries containing date and count.
    """
    API_REQUEST_COUNT.labels(endpoint="incident-trends").inc()

    # Make a copy of the DataFrame to avoid inplace modification
    df = df.copy()

    # Select the appropriate date column
    if trend_type == "created":
        date_column = "opened_at"
    else:  # Default to "resolved"
        date_column = "resolved_at"

    # Convert date column to datetime and drop NaN values
    df[date_column] = pd.to_datetime(df[date_column], errors="coerce")
    df = df.dropna(subset=[date_column])

    # Extract only the date (without time)
    df["date"] = df[date_column].dt.date

    # Count incidents per day
    trends = df.groupby("date").size().reset_index(name="count")

    return trends.to_dict(orient="records")

# Incident Categories Breakdown
def get_incident_categories(df):
    API_REQUEST_COUNT.labels(endpoint="incident-categories").inc()
    return df["category"].value_counts().to_dict()

# Prometheus Metrics Endpoint
def metrics(df):
    update_active_incidents(df)
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

