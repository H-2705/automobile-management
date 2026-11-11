
import { useState } from "react";
import {
  Plus, Search, Users, Pencil, Trash2,
  Eye, X, Phone, Car, IdCard
} from "lucide-react";

const initialDrivers = [
  {
    id: 1,
    name: "Rahul Kumar",
    phone: "9876543210",
    email: "rahul@gmail.com",
    license: "KA0520240012345",
    vehicle: "Toyota Innova",
    experience: "5",
    status: "Available"
  },
  {
    id: 2,
    name: "Arun Sharma",
    phone: "9876543211",
    email: "arun@gmail.com",
    license: "KA0320230012346",
    vehicle: "Tata Nexon",
    experience: "3",
    status: "On Trip"
  },
  {
    id: 3,
    name: "Kiran Reddy",
    phone: "9876543212",
    email: "kiran@gmail.com",
    license: "KA0120220012347",
    vehicle: "Mahindra XUV700",
    experience: "7",
    status: "Available"
  },
  {
    id: 4,
    name: "Suresh Patil",
    phone: "9876543213",
    email: "suresh@gmail.com",
    license: "KA0420210012348",
    vehicle: "Hyundai Creta",
    experience: "4",
    status: "Inactive"
  },
  {
    id: 5,
    name: "Manoj Kumar",
    phone: "9876543214",
    email: "manoj@gmail.com",
    license: "KA0520200012349",
    vehicle: "Not Assigned",
    experience: "2",
    status: "Available"
  }
];

const emptyDriver = {
  name: "",
  phone: "",
  email: "",
  license: "",
  vehicle: "Not Assigned",
  experience: "",
  status: "Available"
};

export default function Driver() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData, setFormData] = useState(emptyDriver);

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.phone.includes(search) ||
      driver.license.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || driver.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const availableCount = drivers.filter(
    (d) => d.status === "Available"
  ).length;

  const onTripCount = drivers.filter(
    (d) => d.status === "On Trip"
  ).length;

  const inactiveCount = drivers.filter(
    (d) => d.status === "Inactive"
  ).length;

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyDriver);
    setShowForm(true);
  };

  const openEditForm = (driver) => {
    setEditingId(driver.id);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      email: driver.email,
      license: driver.license,
      vehicle: driver.vehicle,
      experience: driver.experience,
      status: driver.status
    });
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      setDrivers((current) =>
        current.map((driver) =>
          driver.id === editingId
            ? { ...driver, ...formData }
            : driver
        )
      );
    } else {
      setDrivers((current) => [
        { id: Date.now(), ...formData },
        ...current
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(emptyDriver);
  };

  const deleteDriver = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers((current) =>
        current.filter((driver) => driver.id !== id)
      );
    }
  };

  return (
    <div className="driver-page">

      <div className="driver-heading">
        <div>
          <h2>Driver Management</h2>
          <p>Manage driver profiles, licences and vehicle assignments.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={18} />
          Add Driver
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div className="driver-stats">
        <div className="driver-stat-card">
          <div className="driver-stat-icon blue">
            <Users size={22} />
          </div>
          <span>Total Drivers</span>
          <h2>{drivers.length}</h2>
        </div>

        <div className="driver-stat-card">
          <div className="driver-stat-icon green">
            <Users size={22} />
          </div>
          <span>Available Drivers</span>
          <h2>{availableCount}</h2>
        </div>

        <div className="driver-stat-card">
          <div className="driver-stat-icon purple">
            <Car size={22} />
          </div>
          <span>On Trip</span>
          <h2>{onTripCount}</h2>
        </div>

        <div className="driver-stat-card">
          <div className="driver-stat-icon orange">
            <IdCard size={22} />
          </div>
          <span>Inactive Drivers</span>
          <h2>{inactiveCount}</h2>
        </div>
      </div>

      {/* DRIVER TABLE */}

      <div className="driver-table-panel">

        <div className="driver-table-heading">
          <div>
            <h3>All Drivers</h3>
            <p>View and manage your registered drivers.</p>
          </div>

          <span className="driver-count">
            {filteredDrivers.length} Records
          </span>
        </div>

        <div className="driver-filters">

          <div className="driver-search">
            <Search size={18} />
            <input
              placeholder="Search name, phone or licence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="driver-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        <div className="table-wrapper">
          <table className="driver-table">
            <thead>
              <tr>
                <th>DRIVER</th>
                <th>PHONE</th>
                <th>LICENCE NUMBER</th>
                <th>ASSIGNED VEHICLE</th>
                <th>EXPERIENCE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id}>
                  <td>
                    <div className="driver-name">
                      <div className="driver-avatar">
                        {driver.name.charAt(0).toUpperCase()}
                      </div>
                      <strong>{driver.name}</strong>
                    </div>
                  </td>

                  <td>{driver.phone}</td>
                  <td className="driver-license">{driver.license}</td>
                  <td>{driver.vehicle}</td>
                  <td>{driver.experience} Years</td>

                  <td>
                    <span
                      className={`driver-status ${driver.status.toLowerCase().replace(" ", "-")}`}
                    >
                      {driver.status}
                    </span>
                  </td>

                  <td>
                    <div className="driver-actions">
                      <button
                        title="View"
                        onClick={() => setSelectedDriver(driver)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit"
                        onClick={() => openEditForm(driver)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete"
                        className="delete-action"
                        onClick={() => deleteDriver(driver.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDrivers.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-drivers">
                    No drivers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ADD / EDIT FORM */}

      {showForm && (
        <div className="modal-overlay">
          <div className="vehicle-modal">

            <div className="modal-heading">
              <div>
                <h2>{editingId ? "Edit Driver" : "Add New Driver"}</h2>
                <p>Enter driver details below.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="vehicle-form-grid">

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    required
                    value={formData.name}
                    placeholder="Enter full name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Enter a valid 10-digit phone number"
                    value={formData.phone}
                    placeholder="10-digit mobile number"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    placeholder="driver@example.com"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Driving Licence Number *</label>
                  <input
                    required
                    value={formData.license}
                    placeholder="Enter licence number"
                    onChange={(e) =>
                      setFormData({ ...formData, license: e.target.value.toUpperCase() })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Assigned Vehicle</label>
                  <input
                    value={formData.vehicle}
                    placeholder="Enter assigned vehicle"
                    onChange={(e) =>
                      setFormData({ ...formData, vehicle: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={formData.experience}
                    placeholder="Years of experience"
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Driver Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option>Available</option>
                    <option>On Trip</option>
                    <option>Inactive</option>
                  </select>
                </div>

              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  {editingId ? "Save Changes" : "Add Driver"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* DRIVER DETAILS */}

      {selectedDriver && (
        <div className="modal-overlay">
          <div className="vehicle-modal details-modal">

            <div className="modal-heading">
              <div>
                <h2>Driver Details</h2>
                <p>Complete driver information.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setSelectedDriver(null)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="vehicle-details">
              <div className="driver-detail-avatar">
                {selectedDriver.name.charAt(0).toUpperCase()}
              </div>

              <h3>{selectedDriver.name}</h3>
              <p>{selectedDriver.license}</p>

              <div className="detail-grid">
                <div>
                  <span>Phone</span>
                  <strong>{selectedDriver.phone}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{selectedDriver.email}</strong>
                </div>

                <div>
                  <span>Vehicle</span>
                  <strong>{selectedDriver.vehicle}</strong>
                </div>

                <div>
                  <span>Experience</span>
                  <strong>{selectedDriver.experience} Years</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{selectedDriver.status}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
