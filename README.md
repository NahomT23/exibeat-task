# 🎧 Exibeat Task

A full-stack music collaboration platform facilitating track submissions from producers to DJs. Built with NestJS and MongoDB on the backend, and a Next.js frontend using ShadCN, TailwindCSS, and TypeScript.

---
## 📖 Introduction

- Has a good chat adn track submission flow between a prodcuer and a DJ
---

## ✨ Features

- **Track Submissions**: Producers can submit tracks to DJs with accompanying messages.
- **Threaded Messaging**: Ongoing conversations between producers and DJs within submission threads.
- **User Management**: Unique UUIDs for producers and DJs to manage identities.
- **Filtering**: Retrieve submissions filtered by producer or DJ IDs.

---

## 🛠️ Tech Stack

### Backend

- **Framework**: NestJS
- **Database**: MongoDB
- **Language**: TypeScript

### Frontend

- **Framework**: Next.js
- **Styling**: TailwindCSS
- **UI Components**: ShadCN
- **Language**: TypeScript

---

## 🧰 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/NahomT23/exibeat-task.git
cd exibeat-task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## 📡 API Endpoints

### 1. Create a New Submission

- **Method**: `POST`
- **Endpoint**: `/submissions`
- **Description**: Creates a new submission from a producer to a DJ.

**Request Body**:

```json
{
  "producerId": "uuid-string",
  "djId": "uuid-string",
  "trackTitle": "string",
  "trackDescription": "optional string",
  "initialMessage": "optional string"
}
```

### 2. Create a Message in a Submission Thread

- **Method**: `POST`
- **Endpoint**: `/messages`
- **Description**: Sends a message in an existing submission thread.

**Request Body**:

```json
{
  "senderId": "uuid-string",
  "text": "string"
}
```

### 3. Get All Submissions

- **Method**: `GET`
- **Endpoint**: `/submissions`
- **Description**: Retrieves a list of all submissions. Can be filtered by `producerId` or `djId`.

### 4. Get a Specific Submission

- **Method**: `GET`
- **Endpoint**: `/submissions/{id}`
- **Description**: Fetches a specific submission by its unique ID.

---

## 🚀 Usage

1. **Start Backend Server**

   ```bash
   cd backend
   npm run start: dev
   ```

2. **Start Frontend Server**

   ```bash
   cd ../frontend
   npm run dev
   ```

3. **Access Application**

   Open your browser and navigate to `http://localhost:3000` to use the application.

---

## ⚙️ Configuration

### Backend `.env` File

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string

```

### Frontend `.env` File

Create a `.env` file in the `frontend` directory with the following variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

*Ensure that the backend server is running on the specified `PORT`.*

---

## 🧪 Examples

### Creating a New Submission

```bash
curl -X POST http://localhost:4000/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "producerId": "123e4567-e89b-12d3-a456-426614174000",
    "djId": "123e4567-e89b-12d3-a456-426614174001",
    "trackTitle": "Summer Vibes",
    "trackDescription": "An upbeat summer track.",
    "initialMessage": "Hope you enjoy this track!"
}'
```

### Sending a Message in a Submission Thread

```bash
curl -X POST http://localhost:4000/messages \
  -H "Content-Type: application/json" \
  -d '{
    "senderId": "123e4567-e89b-12d3-a456-426614174000",
    "text": "Looking forward to your feedback!"
}'
```

---

## 🛠️ Troubleshooting

- **MongoDB Connection Errors**: Ensure that your `MONGO_URI` in the `.env` file is correct and that MongoDB is running.

```
