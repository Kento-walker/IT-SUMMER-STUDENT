# Candidate Flagging System

A system for evaluating medical candidates based on various criteria and managing flags.

## Features

- Evaluate candidates based on multiple criteria
- Generate and manage flags for various conditions
- Override or acknowledge flags
- Persistent storage of flag states
- Real-time validation and feedback

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:8000

## System Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Evaluation Criteria

The system evaluates candidates based on:
1. NAC Exam Score (passing threshold: 50)
2. MCCQE1 Result (passing threshold: 60)
3. Canadian Experience (minimum: 1 year)
4. Practice Gaps (maximum: 2 years)

## Flag Management

Flags can be:
- Acknowledged: Mark a flag as reviewed
- Overridden: Override a flag's significance
- These states are mutually exclusive

## Technologies Used

- Backend:
  - Node.js
  - TypeScript
  - Express
  - CORS

- Frontend:
  - AngularJS
  - PrimeNG
  - HTML5/CSS3 