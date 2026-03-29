# OJT Tracking System
OJT Tracking System is a web-based application designed to help students manage and monitor their On-the-Job Training activities. It allows users to log daily attendance, record working hours, track tasks, and organize progress efficiently.

<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/f6ac744b-e287-4151-9511-07710f29eafa" />

## Stack
- React + Vite frontend
- Firebase Authentication
- Firebase Realtime Database
- Firebase Storage

## Installation

### Firebase 
```
npm firebase
```
```
npm install -g firebase-tools
```

### Tailwind CSS Documentation
https://tailwindcss.com/docs/guides/vite

```
npm create vite@latest ./ -- --template react
```
```
npm install -D tailwindcss@3.4.6 postcss autoprefixer
```
```
npx tailwindcss init -p
```

## Docker
This project now includes Docker support for the frontend. It does not start a local database container. The app continues to use your remote Firebase project through environment variables.

### 1. Prepare Firebase environment variables
Use the existing Firebase values

```bash
Copy-Item frontend/.env.example frontend/.env
```

Fill in `frontend/.env` with your Firebase configuration.

### 2. Run Docker in development mode
From the project root:

```bash
docker compose up --build
```

The app will be available at `http://localhost:8080`.
This mode uses Vite inside Docker with a bind mount, so code changes should appear automatically without rebuilding the image every time.

Use `docker compose up --build` again when:
- `package.json` or `package-lock.json` changes
- the Dockerfile changes
- you want to recreate the image from scratch

For normal source edits in `src/`, a save should be enough.

To stop it:

```bash
docker compose down
```

### 3. Run the production container
To test the production build through Nginx:

```bash
docker compose --profile prod --env-file frontend/.env up --build frontend-prod
```

The production container is exposed at `http://localhost:8081` by default.

### 4. Build the image directly
If you prefer plain Docker for the production image:

```bash
docker build `
  --build-arg VITE_FIREBASE_API_KEY=your-firebase-api-key `
  --build-arg VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com `
  --build-arg VITE_FIREBASE_PROJECT_ID=your-project-id `
  --build-arg VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.region.firebasedatabase.app `
  --build-arg VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app `
  --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id `
  --build-arg VITE_FIREBASE_APP_ID=your-app-id `
  -t ojt-tracking-system ./frontend
```

```bash
docker run --rm -p 8080:80 ojt-tracking-system
```

## Local development without Docker
```bash
cd frontend
npm install
npm run dev
```
