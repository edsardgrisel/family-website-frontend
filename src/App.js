import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Folders from './pages/Folders';
import Folder from './pages/Folder';
import EditFolders from './pages/EditFolders';
import EditFolder from './pages/EditFolder';

// ... import other pages

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/folders" Component={Folders} />
          <Route path="/folders/:id" Component={Folder} />
          {/* ... other routes */}
          <Route path="/edit" Component={EditFolders} />
          <Route path="/edit/:id" Component={EditFolder} />
          {/* ... other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
