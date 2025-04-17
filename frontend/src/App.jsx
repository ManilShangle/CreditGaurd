import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Main from './pages/Main/Main.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import UploadData from './pages/UploadData/UploadData.jsx';
import Settings from './pages/Settings/Settings.jsx';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        
        <div className={`app-body ${showSidebar ? 'with-sidebar' : 'no-sidebar'}`}>
          {showSidebar && <Sidebar />}
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadData />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
