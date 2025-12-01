import './App.css'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchData } from './api/base.js'; 

import Navbar from './assets/elements/Navbar.jsx'
import Loader from './assets/elements/Loader.jsx'

import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/error.jsx';
import NotFound from './pages/404.jsx';
import SignUp from './pages/SignUp.jsx';


function App() {

  const [serverOk, setServerOk] =  useState(null);

  useEffect(() => {
    async function checkServer() {
      const json = await fetchData();

      if (json.status === "ok") {
        setServerOk(true);
      } else {
        setServerOk(false);
      }
    }

    checkServer();
  }, []);

  //while being checked
  if (serverOk === null) {
    return <Loader />;
  }
  
  //backend down
  if (serverOk === false) {
    return <ErrorPage error="Cannot connect to the server. Please try again later." />;
  }

  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
    
    </>
  );
}

export default App
