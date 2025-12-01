import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/elements/Navbar.jsx'
import './App.css'
import './index.css'
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/error.jsx';
import NotFound from './pages/404.jsx';

function App() {
  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
    
    </>
  );
}

export default App
