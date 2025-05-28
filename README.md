# Image-Moderation-FastAPI
Image Moderation API built in FastAPI. To be done as part of the screening Test for Maida.co Internship
# Image-Moderation-FastAPI
Image Moderation API built in FastAPI. To be done as part of the screening Test for Maida.co Internship
I have used SightEngine for Image Moderation. Have included moderation for the following:
nudity, weapon, offensive, text-content, gore, violence, self-harm.

# Database
Used MongoDB

# Backend
Used FastAPI with token based authentication and authorization

# Frontend
Used Vite+React

# Requirements
For the back end I have provided a dedicated requirements.txt. Nevertheless, I have used Python 3.9.12 for it


# Running the Project

## Running the Backend

1. Setup the environment. I have used conda environment and have provided the relevant .yml file for it. I have also provided requirements.txt incase for pip.

2. Ensure you have the MongoDB setup.

3. I have used API keys for accessing the AI APIs. Please create your .env files for it.

4. Please ensure you have an `.env.` file in the `./backend-fastAPI` with the required API keys.

5. From the root directoty cd to the `./backend-fastAPI/app/` directory.

6. Open the terminal in the current directory, and run 

`fastapi dev main.py`

7. The backend server will start at `http://127.0.0.1:8000`

8. IMPORTANT: It will output an Admin Token at the start. Save it for creating more tokens later on. If forgotten find it in the MongoDB `auth_db` database, in the collection `tokens` .

## Running the Frontend

1. Ensure you have npm installed

2. Go to the `./image-moderation-frontend/` directory and run the following command in terminal to install the relevant the dependencies.

`npm install`

3. From the root directoty cd to the `./image-moderation-frontend/src` directory.

4. Open the terminal in the current directory, and run 

`npm run dev`

5. The frontend will start at `http://localhost:5173/`

6. The frontend is quite basic but does the job.

## Dockerization
I have provided the relevant files for the dockerization of the backend.
Again it is pertinent to note the initial token displayed whent the backend runs for the first time, else there will be a slight incovenience, which I will address in the upcoming steps.
For running the backned in a docker container follow the steps as:

1. Ensure you have Docker installed on your system and is running. I used DockerDesktop personally.

1. From the root directoty cd to the ./backend-fastAPI/ directory.

2. Open terminal in the current directory.

3. Run the command 

`docker-compose up --build`

4. The container will start. With `Uvicorn running on http://0.0.0.0:8000`

5. Access the backend normally as you would without containerization.

6. Now, if you missed the inital admin token do as following:

    a. Open the terminal, in any directory and run the following command:
    `docker ps`. It will show the container running on your device.
    b. Find the container based off of the image `mongo:6.0/<version>`. Find its corresponding name. Most likely it will be `mongo-db`.
    c. Now, using the name of the container, connect to it
    `docker exec -it <container-name> mongosh`.
    d. Use the relevant databse. Which for us will be `use auth_db`.
    e. Now, find a token in the relevant collection. Which will be ` db.tokens.find().pretty()`.
    f. The list of tokens in the system will be displayed for you to read.

## Important:
This project uses API keys to access the SightEngine API for Image Moderation. I have set them in my .env files not uploaded on GitHub. Please add yours.


