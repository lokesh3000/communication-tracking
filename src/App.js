import React, { useState } from "react";
import './App.css'; 
import AdminModule from './AdminModule';
import UserModule from './UserModule';

function App () {
  const [activeModule, setActiveModule] = useState("admin");

  return (
    <div>
      <header className="header">
        <div className="logo">LOGO</div>
        <div className="title">Communication Tracking</div>
      </header>
      <div className="main-content">
        <div className="module-navigation">
          <button onClick={() => setActiveModule("admin")}>Admin</button>
          <button onClick={() => setActiveModule("user")}>User</button>
          <button onClick={() => setActiveModule("reporting")}>Reporting and Analytics</button>
        </div>

        <div className="module-content">
          {activeModule === "admin" && <AdminModule />}
          {activeModule === "user" && <UserModule />}
          {activeModule === "reporting" && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default App;
