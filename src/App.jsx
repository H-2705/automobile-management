
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Vehicle from "./pages/Vehicle";
import Driver from "./pages/Driver";
import Trips from "./pages/Trips";
import Bookings from "./pages/Bookings";
import Maintenance from "./pages/Maintenance";
import Fuel from "./pages/Fuel";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard onNavigate={setActivePage} />;

      case "Vehicles":
        return <Vehicle />;

      case "Drivers":
        return <Driver />;

      case "Trips & Routes":
        return <Trips />;

      case "Bookings":
        return <Bookings />;

      case "Maintenance":
        return <Maintenance />;

      case "Fuel Management":
        return <Fuel />;

      case "Reports":
        return <Reports />;

      case "Settings":
        return <Settings />;

      default:
        return (
          <div className="placeholder-page">
            <h2>{activePage}</h2>
            <p>This module will be developed next.</p>
          </div>
        );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        <Header
  title={activePage}
  onNavigate={setActivePage}
/>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
