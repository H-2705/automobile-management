
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle,
  Wrench,
  CalendarCheck,
  X,
} from "lucide-react";

const pages = [
  "Dashboard",
  "Vehicles",
  "Drivers",
  "Trips & Routes",
  "Bookings",
  "Maintenance",
  "Fuel Management",
  "Reports",
  "Settings",
];

const notifications = [
  {
    id: 1,
    title: "Vehicle maintenance reminder",
    message: "A vehicle is due for scheduled maintenance.",
    time: "10 minutes ago",
    icon: Wrench,
  },
  {
    id: 2,
    title: "New booking received",
    message: "A new vehicle booking has been added.",
    time: "30 minutes ago",
    icon: CalendarCheck,
  },
  {
    id: 3,
    title: "Trip completed",
    message: "A scheduled trip has been completed.",
    time: "1 hour ago",
    icon: CheckCircle,
  },
];

export default function Header({ title, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [readNotifications, setReadNotifications] = useState([]);

  const searchRef = useRef(null);
  const headerRef = useRef(null);

  const filteredPages = pages.filter((page) =>
    page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = notifications.length - readNotifications.length;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
        setShowSearch(true);
        setShowNotifications(false);
        setShowProfile(false);
      }

      if (event.key === "Escape") {
        setShowSearch(false);
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }

    setSearchTerm("");
    setShowSearch(false);
    setShowNotifications(false);
    setShowProfile(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
    setShowSearch(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
    setShowSearch(false);
  };

  const markAllAsRead = () => {
    setReadNotifications(notifications.map((item) => item.id));
  };

  return (
    <header className="top-header" ref={headerRef}>
      <div className="page-heading">
        <h1>{title}</h1>
        <p>Welcome back! Here's what's happening with your fleet.</p>
      </div>

      <div className="header-actions">
        {/* Search */}
        <div className="header-search-container">
          <div className="search-box">
            <Search size={18} />

            <input
              ref={searchRef}
              value={searchTerm}
              placeholder="Search pages..."
              onFocus={() => {
                setShowSearch(true);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setShowSearch(true);
              }}
            />

            {searchTerm ? (
              <button
                className="search-clear-button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            ) : (
              <kbd>Ctrl K</kbd>
            )}
          </div>

          {showSearch && (
            <div className="header-dropdown search-dropdown">
              <div className="dropdown-heading">
                <span>Quick Navigation</span>
              </div>

              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <button
                    key={page}
                    className={`search-result ${
                      page === title ? "current" : ""
                    }`}
                    onClick={() => navigateTo(page)}
                  >
                    <Search size={15} />
                    <span>{page}</span>
                    {page === title && <small>Current</small>}
                  </button>
                ))
              ) : (
                <div className="dropdown-empty">
                  No matching pages found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="header-dropdown-container">
          <button
            className="notification-button"
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-dot">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="header-dropdown notification-dropdown">
              <div className="dropdown-heading notification-heading">
                <div>
                  <strong>Notifications</strong>
                  <span>{unreadCount} unread notifications</span>
                </div>

                <button onClick={markAllAsRead}>
                  Mark all read
                </button>
              </div>

              <div className="notification-list">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  const isRead = readNotifications.includes(
                    notification.id
                  );

                  return (
                    <div
                      key={notification.id}
                      className={`notification-item ${
                        isRead ? "read" : ""
                      }`}
                    >
                      <div className="notification-icon">
                        <Icon size={17} />
                      </div>

                      <div className="notification-content">
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>

                      {!isRead && (
                        <span className="unread-indicator" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="notification-footer">
                <span>You're all caught up!</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="header-dropdown-container">
          <button
            className="header-user"
            onClick={toggleProfile}
            aria-expanded={showProfile}
          >
            <div className="avatar">AD</div>

            <div className="header-user-info">
              <strong>Admin</strong>
              <span>Super Admin</span>
            </div>

            <ChevronDown
              size={16}
              className={showProfile ? "chevron-rotated" : ""}
            />
          </button>

          {showProfile && (
            <div className="header-dropdown profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="avatar">AD</div>
                <div>
                  <strong>Admin User</strong>
                  <span>admin@autoflow.com</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <button
                onClick={() => navigateTo("Settings")}
              >
                <User size={17} />
                My Profile
              </button>

              <button
                onClick={() => navigateTo("Settings")}
              >
                <Settings size={17} />
                Settings
              </button>

              <div className="profile-dropdown-divider" />

              <button
                className="logout-option"
                onClick={() =>
                  alert("Logout functionality will be connected later.")
                }
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
