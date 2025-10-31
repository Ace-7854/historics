import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/elements/Navbar.jsx'
import './App.css'
import ChatPage from './pages/ChatPage.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
    </Router>
    
    </>
  );
}

export default App
