## FoodSnap Backend Service
This repository contains the backend service for the FoodSnap application. The backend service is built with Node.js, Express, and deployed on Google Cloud App Engine. It handles user authentication, food prediction, and history tracking.

#### Table of Content
1. Prerequisites
2. Installation
3. Running the Application Locally
4. Deployment
5. API Endpoints
6. Environment Variables

#### Prerequisites
* Node.js (14 or higher)
* npm (6 or higher)
* Google Cloud Project with App Engine, Cloud Storage, Firestore enabled

#### Installation
1. Clone the repository
   ```
   git clone https://github.com/your-username/foodsnap-backend.git
   cd foodsnap-backend
   ```
2. Install Dependencies
   ```
   npm install
   ```
3. Create a .env file in the root directory and add the following environment variables
   ```
   GCLOUD_PROJECT_ID=your_gcloud_project_id
   GCLOUD_KEY_FILE=/path/to/serviceAccountKey.json
   GCLOUD_STORAGE_BUCKET=your_gcloud_storage_bucket_name
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

#### Running the Application Locally
1. Start the application
   ```
   npm run start
   ```
2. Access the application
   Open your browser and navigate to http://localhost:8080

#### Deployment
1. Activate Cloud App Engine
2. Create app.yaml file
3. Deploy using Google Cloud CLI
   ```
   gcloud app deploy
   ```

#### API Endpoints

##### Auth
* POST /signup - Register a new user
* POST /login - Authenticate a user and return a token

##### User
* GET /profile - Get the user profile
* PUT /edit-profile - Update the user profile
* PUT /change-password - Change the user password

##### Food
* GET /food - Get the list of food
* GET /food/{id} - Get Food Detail with id

##### Predict
* POST /predict - Preduct the food image and return food data

##### History
* GET /history - Get the user's food history
* POST /save - Save the prediction result to history

#### Environment Variables
Make sure to set the following environment variables in your .env file or through your deployment platform:
* GCLOUD_PROJECT_ID : your Google Cloud Project ID
* GCLOUD_KEY_FILE : Path to your Google Cloud Service Account Key
* GCLOUD_STORAGE_BUCKET: Name of your Google Cloud Storage Bucket
* JWT_SECRET : Secret key for JWT authentication
* PORT : Port in which the app will run (default is 8080)
