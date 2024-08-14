import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import VideoGamesPage from './pages/Games';
import ContactPage from './pages/Contact';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
        <Box className="gameContainer" sx={{ p: 4 }}>
          <NavBar/>
        {/* <AppBar position="static" sx={{ backgroundColor: '#1A1A2E' }}>
          <Toolbar>
            <Button component={Link} to="/" sx={{ color: '#fff' }}>
              VIDEO GAMES
            </Button>
            <Button component={Link} to="/contact" sx={{ color: '#fff', ml: 2 }}>
              CONTACT
            </Button>
          </Toolbar>
        </AppBar> */}
        <Routes>
          <Route path="/" element={<VideoGamesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
