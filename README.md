# Historics - Shakespeare Chatbot

A conversational AI chatbot designed to help university students studying Shakespearean literature by providing an immersive experience conversing with "Shakespeare" himself. The bot communicates in Early Modern English to help students adapt to the language while allowing them to respond in either modern or old English.

## 📚 Project Overview

This application was developed as part of a university coursework project. It provides students with an interactive way to engage with Shakespearean language and literature through natural conversation, making the learning experience more engaging and accessible.

### Key Features

- **Bilingual Conversation**: Responds in Early Modern English while accepting both modern and Shakespearean English from users
- **Persistent Chat History**: Save and recall previous conversations to continue learning sessions
- **Local Account System**: User authentication stored locally via JSON (no database required)
- **Google Gemini Integration**: Powered by Google's Gemini API for intelligent, contextual responses
- **Built-in System Prompt**: Custom-configured to maintain Shakespeare's character and speaking style
- **Client-Server Architecture**: Separate frontend and backend following proper separation of concerns

## 🛠️ Tech Stack

**Frontend:**
- React
- Vite
- CSS

**Backend:**
- Node.js
- Express.js
- JSON file storage

**AI:**
- Google Gemini API

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- A Google Gemini API key ([Get one here](https://ai.google.dev/))

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ace-7854/historics.git
cd historics
```

### 2. Install Dependencies

**Install frontend dependencies:**
```bash
npm install
```

**Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder with your Google Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

⚠️ **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## 🏃 Running the Application

This application requires **two separate terminal windows** to run both the server and client simultaneously.

### Terminal 1 - Backend Server

Navigate to the backend folder and start the server:

```bash
cd backend
node --env-file=.env server.js
```

The server will typically run on `http://localhost:3000` (or the port specified in your server configuration).

### Terminal 2 - Frontend Client

From the root directory (where `.gitignore` is located), start the development server:

```bash
npm run dev
```

The client will typically run on `http://localhost:5173` and will open automatically in your browser.

## 📁 Project Structure

```
historics/
├── backend/              # Server-side code
│   ├── server.js        # Main server file
│   ├── .env             # Environment variables (create this)
│   └── ...              # Other backend files
├── src/                 # React frontend source code
├── public/              # Static assets
├── package.json         # Frontend dependencies
├── vite.config.js       # Vite configuration
├── index.html           # Entry HTML file
└── README.md            # This file
```

## 💾 Data Storage

- **User Accounts**: Stored locally in JSON files (no SQL database)
- **Chat History**: Conversations are saved locally and can be recalled in future sessions
- **No External Database**: All data persistence is file-based for simplicity

## 🎨 Design Philosophy

The user interface intentionally maintains a simple, student-friendly aesthetic rather than a polished professional look. This design choice creates a comfortable, educational environment suitable for the target audience of literature students.

## 🔄 API Communication

The application demonstrates extensive client-server communication patterns:
- RESTful API endpoints for user authentication
- Chat message processing and response generation
- Conversation history retrieval and storage
- Real-time communication between frontend and backend

## 🤝 Contributing

This project was developed collaboratively by:
- [Edison (Edi) Ford](https://github.com/Ace-7854)
- [H. Wooll](https://github.com/ZyfamX)
- [JamesM2908](https://github.com/JamesM2908)

## 📝 License

This project is for educational purposes as part of university coursework.

## 🐛 Troubleshooting

**Server won't start:**
- Ensure you've created the `.env` file in the `backend` folder
- Verify your Gemini API key is valid
- Check that the required port isn't already in use

**Client won't connect to server:**
- Make sure both terminals are running
- Verify the server started successfully before launching the client
- Check that the API endpoint URLs match between client and server

**Dependencies issues:**
- Try deleting `node_modules` folders and `package-lock.json` files, then run `npm install` again

## 📧 Contact

For questions or issues, please open an issue on the GitHub repository.

---

*"The web of our life is of a mingled yarn, good and ill together." - All's Well That Ends Well*