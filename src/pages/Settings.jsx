
import { useState } from "react";
import {
  Building2,
  Settings as SettingsIcon,
  Bell,
  User,
  ShieldCheck,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

const settingsTabs = [
  { name: "Company Profile", icon: Building2 },
  { name: "General Settings", icon: SettingsIcon },
  { name: "Notifications", icon: Bell },
  { name: "My Profile", icon: User },
  { name: "Security", icon: ShieldCheck },
];

function Settings() {
  const [activeTab, setActiveTab] = useState("Company Profile");
  const [showPassword, setShowPassword] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const [company, setCompany] = useState({
    name: "AutoFlow Transportation Pvt. Ltd.",
    email: "contact@autoflow.com",
    phone: "+91 98765 43210",
    address: "Bengaluru, Karnataka, India",
    website: "www.autoflow.com",
    timezone: "Asia/Kolkata",
  });

  const [general, setGeneral] = useState({
    language: "English",
    dateFormat: "DD/MM/YYYY",
    currency: "INR (₹)",
    timeFormat: "12 Hours",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    tripUpdates: true,
    maintenanceAlerts: true,
    fuelAlerts: false,
    bookingUpdates: true,
    weeklyReports: false,
  });

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@autoflow.com",
    phone: "+91 98765 43210",
    role: "Administrator",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const updateCompany = (field, value) => {
    setCompany((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateGeneral = (field, value) => {
    setGeneral((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateProfile = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleNotification = (field) => {
    setNotifications((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleSave = () => {
    if (
      activeTab === "Security" &&
      password.newPassword !== password.confirm
    ) {
      setSavedMessage("New password and confirmation do not match.");
      return;
    }

    setSavedMessage(`${activeTab} saved successfully!`);

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const renderCompanyProfile = () => (
    <>
      <div className="settings-section-heading">
        <h3>Company Information</h3>
        <p>Manage your organization's basic information.</p>
      </div>

      <div className="settings-form-grid">
        <div className="settings-field">
          <label>Company Name</label>
          <input
            value={company.name}
            onChange={(e) => updateCompany("name", e.target.value)}
            placeholder="Enter company name"
          />
        </div>

        <div className="settings-field">
          <label>Company Email</label>
          <input
            type="email"
            value={company.email}
            onChange={(e) => updateCompany("email", e.target.value)}
            placeholder="Enter company email"
          />
        </div>

        <div className="settings-field">
          <label>Phone Number</label>
          <input
            value={company.phone}
            onChange={(e) => updateCompany("phone", e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div className="settings-field">
          <label>Website</label>
          <input
            value={company.website}
            onChange={(e) => updateCompany("website", e.target.value)}
            placeholder="Enter website"
          />
        </div>

        <div className="settings-field full-width">
          <label>Company Address</label>
          <input
            value={company.address}
            onChange={(e) => updateCompany("address", e.target.value)}
            placeholder="Enter company address"
          />
        </div>

        <div className="settings-field">
          <label>Timezone</label>
          <select
            value={company.timezone}
            onChange={(e) => updateCompany("timezone", e.target.value)}
          >
            <option value="Asia/Kolkata">India Standard Time (IST)</option>
            <option value="Asia/Dubai">Gulf Standard Time</option>
            <option value="Europe/London">Greenwich Mean Time</option>
            <option value="America/New_York">Eastern Time</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderGeneralSettings = () => (
    <>
      <div className="settings-section-heading">
        <h3>General Preferences</h3>
        <p>Customize how information is displayed in AutoFlow.</p>
      </div>

      <div className="settings-form-grid">
        <div className="settings-field">
          <label>Language</label>
          <select
            value={general.language}
            onChange={(e) => updateGeneral("language", e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Kannada</option>
          </select>
        </div>

        <div className="settings-field">
          <label>Date Format</label>
          <select
            value={general.dateFormat}
            onChange={(e) => updateGeneral("dateFormat", e.target.value)}
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="settings-field">
          <label>Currency</label>
          <select
            value={general.currency}
            onChange={(e) => updateGeneral("currency", e.target.value)}
          >
            <option>INR (₹)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>

        <div className="settings-field">
          <label>Time Format</label>
          <select
            value={general.timeFormat}
            onChange={(e) => updateGeneral("timeFormat", e.target.value)}
          >
            <option>12 Hours</option>
            <option>24 Hours</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderNotifications = () => {
    const notificationItems = [
      {
        key: "emailAlerts",
        title: "Email Notifications",
        description: "Receive important system alerts through email.",
      },
      {
        key: "tripUpdates",
        title: "Trip Updates",
        description: "Get notified when trip status changes.",
      },
      {
        key: "maintenanceAlerts",
        title: "Maintenance Alerts",
        description: "Receive reminders for upcoming vehicle servicing.",
      },
      {
        key: "fuelAlerts",
        title: "Fuel Alerts",
        description: "Get notifications about fuel consumption and expenses.",
      },
      {
        key: "bookingUpdates",
        title: "Booking Updates",
        description: "Receive updates about new and modified bookings.",
      },
      {
        key: "weeklyReports",
        title: "Weekly Reports",
        description: "Receive a weekly operational summary.",
      },
    ];

    return (
      <>
        <div className="settings-section-heading">
          <h3>Notification Preferences</h3>
          <p>Choose which notifications you want to receive.</p>
        </div>

        <div className="settings-notification-list">
          {notificationItems.map((item) => (
            <div className="settings-notification-item" key={item.key}>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>

              <button
                type="button"
                className={`settings-toggle ${
                  notifications[item.key] ? "enabled" : ""
                }`}
                onClick={() => toggleNotification(item.key)}
                aria-label={`Toggle ${item.title}`}
                aria-pressed={notifications[item.key]}
              >
                <span />
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderProfile = () => (
    <>
      <div className="settings-section-heading">
        <h3>My Profile</h3>
        <p>Manage your personal account information.</p>
      </div>

      <div className="settings-profile-card">
        <div className="settings-profile-avatar">AU</div>
        <div>
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
        </div>
      </div>

      <div className="settings-form-grid">
        <div className="settings-field">
          <label>Full Name</label>
          <input
            value={profile.name}
            onChange={(e) => updateProfile("name", e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        <div className="settings-field">
          <label>Email Address</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => updateProfile("email", e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="settings-field">
          <label>Phone Number</label>
          <input
            value={profile.phone}
            onChange={(e) => updateProfile("phone", e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div className="settings-field">
          <label>Role</label>
          <input value={profile.role} disabled />
        </div>
      </div>
    </>
  );

  const renderSecurity = () => (
    <>
      <div className="settings-section-heading">
        <h3>Security Settings</h3>
        <p>Update your account password and security preferences.</p>
      </div>

      <div className="settings-security-notice">
        <ShieldCheck size={22} />
        <div>
          <strong>Account Security</strong>
          <p>Use a strong password to protect your account.</p>
        </div>
      </div>

      <div className="settings-form-grid security-grid">
        <div className="settings-field full-width">
          <label>Current Password</label>
          <div className="settings-password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password.current}
              onChange={(e) =>
                setPassword((previous) => ({
                  ...previous,
                  current: e.target.value,
                }))
              }
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div className="settings-field">
          <label>New Password</label>
          <input
            type="password"
            value={password.newPassword}
            onChange={(e) =>
              setPassword((previous) => ({
                ...previous,
                newPassword: e.target.value,
              }))
            }
            placeholder="Enter new password"
          />
        </div>

        <div className="settings-field">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={password.confirm}
            onChange={(e) =>
              setPassword((previous) => ({
                ...previous,
                confirm: e.target.value,
              }))
            }
            placeholder="Confirm new password"
          />
        </div>
      </div>
    </>
  );

  const renderActiveContent = () => {
    switch (activeTab) {
      case "Company Profile":
        return renderCompanyProfile();
      case "General Settings":
        return renderGeneralSettings();
      case "Notifications":
        return renderNotifications();
      case "My Profile":
        return renderProfile();
      case "Security":
        return renderSecurity();
      default:
        return renderCompanyProfile();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <h2>Settings</h2>
          <p>Manage your company, preferences and account settings.</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                className={`settings-tab ${
                  activeTab === tab.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(tab.name);
                  setSavedMessage("");
                }}
              >
                <Icon size={18} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="settings-content">
          {renderActiveContent()}

          {savedMessage && (
            <div
              className={`settings-message ${
                savedMessage.includes("do not match") ? "error" : ""
              }`}
            >
              {savedMessage.includes("do not match") ? (
                <Lock size={17} />
              ) : (
                <CheckCircle size={17} />
              )}
              {savedMessage}
            </div>
          )}

          <div className="settings-footer">
            <button
              className="settings-save-button"
              onClick={handleSave}
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
