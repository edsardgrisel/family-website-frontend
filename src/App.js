import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Folders from './pages/Folders';
import Folder from './pages/Folder';
import EditFolder from './pages/EditFolder';
import AddFolder from "./pages/AddFolder";
import SetHomePhoto from "./pages/SetHomePhoto";
import CalendarPage from "./pages/CalendarPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading state until authentication is checked
  }

  return (
    <Router>
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/folders/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Folder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/folders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Folders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditFolder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-folder"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddFolder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-home-photo"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SetHomePhoto />
            </ProtectedRoute>
          }

        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CalendarPage />
            </ProtectedRoute>
          }

        />
      </Routes>
    </Router>
  );
}

export default App;
