FROM python:3.9.22-slim

# Set working directory inside the container
WORKDIR /app

# Copy requirements.txt first (use Docker layer caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all remaining project files
COPY . .

# Expose port 8000 (FastAPI will run on this)
EXPOSE 8000

# Start the app using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
