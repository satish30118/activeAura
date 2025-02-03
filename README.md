# ActiveAura - React Native & Node.js

## Overview
ActiveAura is a mobile application built using React Native for the frontend and Node.js for the backend. It provides users with an interactive and seamless experience for tracking their activities, connecting with friends, and managing their profiles.

## Features
- User authentication (JWT-based login & signup)
- Search people and add them to the friend list
- One-to-one chat functionality
- Push notifications for messages and updates
- User profile management
- Share content with friends
- Review system for feedback
- Secure API endpoints with Express.js
- Optimized mobile performance with React Native

## Tech Stack
- **Frontend**: React Native, Redux, Expo
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT)

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Git
- React Native CLI or Expo CLI (if using Expo)

### Clone the Repository
```sh
git clone https://github.com/satish30118/activeAura.git
cd activeAura
```

### Backend Setup
1. Navigate to the `server` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `server` directory and configure:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### App UI Setup
1. Navigate to the `base` folder:
   ```sh
   cd ../
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `client` directory and configure:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the React Native app:
   ```sh
   npm start
   ```
   If using Expo:
   ```sh
   expo start
   ```

## Usage
- Open the mobile app in an emulator or physical device.
- Register/Login to access the app features.
- Search for people and send friend requests.
- Start one-to-one chats with friends.
- Receive push notifications for messages and updates..
- Manage user profile settings.
- Share content with friends.
- Leave and view reviews from other users.


## App Download
You can download the app from the following link:
[ActiveAura App](https://drive.google.com/drive/folders/1r_1QPlAmetdjb9XEDPkJeRs6hvmfyZay)


