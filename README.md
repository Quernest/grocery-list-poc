### 🚀 Quick Start

1. Install dependencies
```bash
npm install
```

2. Start local JSON server
```bash
npm run server:staging
```
Runs on port 3001

3. Create `.env` file
```bash
EXPO_PUBLIC_API_URL=http://10.0.2.2:3001
```
Use http://localhost:3001 for iOS

4. Run app
```bash
npm run android   # For Android
npm run ios       # For iOS
```

📌 Note:
Android uses 10.0.2.2 instead of localhost to access host machine.

### 🧪 Test Task

This is a proof of concept (POC) created to fulfill a test assignment 

- React Native app with Expo  
- Gluestack UI for layout  
- React Query with JSON Server mock API  
- Features: view, add, edit, delete items; set amount; mark bought  
- Supports staging (port 3001) and production (port 3000) APIs via env variable

### Demo

https://github.com/user-attachments/assets/4a68267e-05c8-4fd0-a2a3-49ceec0b44bb

