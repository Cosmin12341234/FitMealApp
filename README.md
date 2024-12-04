# NenyV(itality) - Fitness Progress Tracker

## Overview
A comprehensive web application designed to help users track their fitness journey and meal preparation. This full-stack application enables users to manage their workouts and nutrition plans through an intuitive interface, allowing them to add and remove both meals and workouts while monitoring their progress. 

The application features an intelligent workout generator that creates personalized exercise routines based on user preferences. Additionally, it implements role-based access control with a dedicated administrative interface where administrators can manage user accounts and maintain the exercise database.

## Features

### Authentication
Secure sign-in and sign-up system with role-based access control.
![PhotoSignIn](https://github.com/user-attachments/assets/6d926ecf-69ac-4537-99bc-4146d113e322)
![PhotoSingUp](https://github.com/user-attachments/assets/d26fa9ca-3719-4b6f-bc5b-34c9a1fe7434)

### Daily Dashboard
Overview of your daily fitness and nutrition progress in one place.

### Workout Tracker
Add, remove, and monitor your exercise activities.

### Meal Tracker 
Create and manage your nutrition plans and daily meals.

### Workout Generator
Intelligent system creating personalized exercise routines based on your preferences.

### Profile Management
Manage your personal information and fitness goals.

### Admin Center
Administrative interface for managing user accounts and exercise database.

## Tech Stack
### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Protected routes implementation
- Responsive design

### Backend
- Spring Boot and Java
- RESTful API architecture
- Spring Security for authentication
- PostgreSQL database

## Security Features
- Password encryption
- Role-based access control
- Protected API endpoints
- Secure user authentication

## Installation

### Prerequisites
- Node.js and npm
- Java JDK
- PostgreSQL

### Recommended Tools
- IntelliJ IDEA for backend development
- VS Code or WebStorm for frontend development
- PostgreSQL GUI (like pgAdmin)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FitMealApp.git
   cd FitMealApp
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   ./gradlew bootRun
   ```

4. **Database Configuration**
   - Ensure PostgreSQL is running
   - Set up environment variables in IntelliJ IDEA:
     1. Click on the dropdown menu next to the Run button
     2. Select 'Edit Configurations...'
     3. In your Spring Boot configuration, click 'Modify Options'
     4. Select 'Environment Variables'
     5. Add the following environment variables:
        ```properties
        DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_DB_name;DATASOURCE_USER=DB_username;DATASOURCE_PASS=DB_password
        ```

## Usage

1. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000` for the frontend.
   - Backend API is available at `http://localhost:8080`.

2. **Register or Sign In**
   - Create a new account or log in with existing credentials.

3. **Explore Features**
   - Use the dashboard to track your daily progress.
   - Add workouts and meals to your tracker.
   - Generate personalized workout routines.
   - Manage your profile and settings.
