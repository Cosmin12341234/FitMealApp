# NenyV(itality) - Fitness Progress Tracker

## Overview
A full-stack fitness application that helps users track their fitness journey, including workout progress and meal preparation. Through an intuitive interface, users can add and remove meals and workouts while monitoring their progress. The app features a workout generator that creates personalized routines based on user preferences, utilizing exercises from a database managed by the admin. Additionally, it includes an admin interface for managing user accounts and the exercise database.

## Features

### Authentication
Secure sign-in and sign-up system with role-based access control.
![PhotoSignIn](https://github.com/user-attachments/assets/6d926ecf-69ac-4537-99bc-4146d113e322)
![PhotoSingUp](https://github.com/user-attachments/assets/d26fa9ca-3719-4b6f-bc5b-34c9a1fe7434)

### Daily Dashboard
Overview of your daily fitness and nutrition progress in one place.
![Photo1](https://github.com/user-attachments/assets/e00c8be9-3982-4275-9d40-d953a6e0c86a)

### Workout Tracker
Add, remove, and monitor your exercise activities.
![Photo2](https://github.com/user-attachments/assets/8332ad93-4a57-4919-89d6-96ec397fc189)

### Meal Tracker 
Create and manage your nutrition plans and daily meals.
![Photo3](https://github.com/user-attachments/assets/fbfe11fb-481c-416e-a951-9b684a65861e)

### Workout Generator
Intelligent system creating personalized exercise routines based on your preferences.
![Photo5](https://github.com/user-attachments/assets/ffd32709-0e98-461a-98d6-4fab123f1be8)
![Photo6](https://github.com/user-attachments/assets/c13250f9-73e8-4dd2-9857-87d6fff9ecf5)

### Profile Management
Manage your personal information and fitness goals.
![Photo4](https://github.com/user-attachments/assets/a85730ee-8db0-4855-a7f0-02c84563eb69)

### Admin Center
Administrative interface for managing user accounts and exercise database.
![Photo7](https://github.com/user-attachments/assets/ab4dbf69-9dd0-4890-a5ae-cade32f03727)
![Photo8](https://github.com/user-attachments/assets/79fe735c-4eed-4a8d-b5c7-820d47720461)
![Photo9](https://github.com/user-attachments/assets/55a4750d-1cab-4acb-b089-60cb549cb735)

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
