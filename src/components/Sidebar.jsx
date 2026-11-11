
import { useState } from "react";
import {
  LayoutDashboard,
  Car,
  Users,
  MapPin,
  CalendarDays,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
  LogOut,
  Truck,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Vehicles", icon: Car },
  { name: "Drivers", icon: Users },
  { name: "Trips & Routes", icon: MapPin },
  { name: "Bookings", icon: CalendarDays },
  { name: "Maintenance", icon: Wrench },
  { name: "Fuel Management", icon: Fuel },
  { name: "Reports", icon: BarChart3 },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${
          collapsed ? "sidebar-collapsed" : ""
        } ${mobileOpen ? "sidebar-mobile-open" : ""}`}
      >
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">
            <Truck size={25} />
          </div>

          <div className="brand-text">
            <h2>AutoFlow</h2>
            <span>Management System</span>
          </div>

          <button
            className="sidebar-collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}
          </button>
        </div>

        {/* Main menu */}
        <div className="menu-label">MAIN MENU</div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                title={collapsed ? item.name : ""}
                className={`menu-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="sidebar-bottom">
          <button
            title={collapsed ? "Settings" : ""}
            className={`menu-item ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => handleNavigation("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="sidebar-profile">
            <div className="avatar">AD</div>

            <div className="profile-info">
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>

            <LogOut
              size={17}
              className="sidebar-logout-icon"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
