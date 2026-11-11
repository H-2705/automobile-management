
import { useState } from "react";
import {
  Plus, Search, Car, Pencil, Trash2,
  Eye, X, Filter, Fuel, Calendar
} from "lucide-react";

const initialVehicles = [
  {
    id: 1,
    number: "KA 05 AB 1234",
    model: "Toyota Innova",
    type: "SUV",
    fuel: "Diesel",
    year: "2024",
    status: "Active"
  },
  {
    id: 2,
    number: "KA 03 CD 5678",
    model: "Tata Nexon",
    type: "Car",
    fuel: "Petrol",
    year: "2023",
    status: "Available"
  },
  {
    id: 3,
    number: "KA 01 EF 9012",
    model: "Mahindra XUV700",
    type: "SUV",
    fuel: "Diesel",
    year: "2022",
    status: "Maintenance"
  },
  {
    id: 4,
    number: "KA 02 GH 3456",
    model: "Hyundai Creta",
    type: "Car",
    fuel: "Petrol",
    year: "2024",
    status: "Active"
  },
  {
    id: 5,
    number: "KA 04 IJ 7890",
    model: "Tata Ace",
    type: "Truck",
    fuel: "Diesel",
    year: "2021",
    status: "Inactive"
  }
];

const emptyForm = {
  number: "",
  model: "",
  type: "Car",
  fuel: "Petrol",
  year: "2026",
  status: "Available"
};

export default function Vehicle() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.number.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || vehicle.status === statusFilter;

    const matchesType =
      typeFilter === "All" || vehicle.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (vehicle) => {
    setEditingId(vehicle.id);
    setFormData({
      number: vehicle.number,
      model: vehicle.model,
      type: vehicle.type,
      fuel: vehicle.fuel,
      year: vehicle.year,
      status: vehicle.status
    });
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      setVehicles((current) =>
        current.map((vehicle) =>
          vehicle.id === editingId
            ? { ...vehicle, ...formData }
            : vehicle
        )
      );
    } else {
      const newVehicle = {
        id: Date.now(),
        ...formData
      };

      setVehicles((current) => [newVehicle, ...current]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const deleteVehicle = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (confirmed) {
      setVehicles((current) =>
        current.filter((vehicle) => vehicle.id !== id)
      );
    }
  };

  const activeCount = vehicles.filter(
    (v) => v.status === "Active"
  ).length;

  const availableCount = vehicles.filter(
    (v) => v.status === "Available"
  ).length;

  const maintenanceCount = vehicles.filter(
    (v) => v.status === "Maintenance"
  ).length;

  return (
    <div className="vehicle-page">

      {/* PAGE HEADING */}

      <div className="vehicle-heading">
        <div>
          <h2>Vehicle Management</h2>
          <p>Manage and monitor your complete vehicle inventory.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div className="vehicle-stats">
        <div className="vehicle-stat-card">
          <div className="vehicle-stat-icon blue">
            <Car size={22} />
          </div>
          <span>Total Vehicles</span>
          <h2>{vehicles.length}</h2>
        </div>

        <div className="vehicle-stat-card">
          <div className="vehicle-stat-icon green">
            <Car size={22} />
          </div>
          <span>Active Vehicles</span>
          <h2>{activeCount}</h2>
        </div>

        <div className="vehicle-stat-card">
          <div className="vehicle-stat-icon purple">
            <Car size={22} />
          </div>
          <span>Available Vehicles</span>
          <h2>{availableCount}</h2>
        </div>

        <div className="vehicle-stat-card">
          <div className="vehicle-stat-icon orange">
            <Fuel size={22} />
          </div>
          <span>Under Maintenance</span>
          <h2>{maintenanceCount}</h2>
        </div>
      </div>

      {/* VEHICLE TABLE */}

      <div className="vehicle-table-panel">

        <div className="vehicle-table-heading">
          <div>
            <h3>All Vehicles</h3>
            <p>View, search and manage your registered vehicles.</p>
          </div>

          <span className="vehicle-count">
            {filteredVehicles.length} Records
          </span>
        </div>

        {/* SEARCH AND FILTERS */}

        <div className="vehicle-filters">

          <div className="vehicle-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search vehicle number or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-control">
            <Filter size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="filter-control">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Car">Car</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
              <option value="Bus">Bus</option>
            </select>
          </div>

        </div>

        {/* TABLE */}

        <div className="table-wrapper">
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>VEHICLE</th>
                <th>REGISTRATION NUMBER</th>
                <th>TYPE</th>
                <th>FUEL TYPE</th>
                <th>YEAR</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <div className="vehicle-name">
                      <div className="vehicle-row-icon">
                        <Car size={19} />
                      </div>
                      <strong>{vehicle.model}</strong>
                    </div>
                  </td>

                  <td className="vehicle-number">
                    {vehicle.number}
                  </td>

                  <td>{vehicle.type}</td>
                  <td>{vehicle.fuel}</td>
                  <td>{vehicle.year}</td>

                  <td>
                    <span
                      className={`vehicle-status ${vehicle.status.toLowerCase()}`}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td>
                    <div className="vehicle-actions">
                      <button
                        title="View"
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit"
                        onClick={() => openEditForm(vehicle)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete"
                        className="delete-action"
                        onClick={() => deleteVehicle(vehicle.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredVehicles.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-vehicles">
                    No vehicles found. Try another search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div className="modal-overlay">
          <div className="vehicle-modal">

            <div className="modal-heading">
              <div>
                <h2>{editingId ? "Edit Vehicle" : "Add New Vehicle"}</h2>
                <p>Enter the vehicle information below.</p>
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
                  <label>Registration Number *</label>
                  <input
                    required
                    value={formData.number}
                    placeholder="KA 05 AB 1234"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        number: e.target.value.toUpperCase()
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Model *</label>
                  <input
                    required
                    value={formData.model}
                    placeholder="Toyota Innova"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        model: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value
                      })
                    }
                  >
                    <option>Car</option>
                    <option>SUV</option>
                    <option>Truck</option>
                    <option>Van</option>
                    <option>Bus</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Fuel Type</label>
                  <select
                    value={formData.fuel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fuel: e.target.value
                      })
                    }
                  >
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>CNG</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Manufacturing Year</label>
                  <input
                    type="number"
                    min="1990"
                    max="2026"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value
                      })
                    }
                  >
                    <option>Available</option>
                    <option>Active</option>
                    <option>Maintenance</option>
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
                  {editingId ? "Save Changes" : "Add Vehicle"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* VIEW VEHICLE DETAILS */}

      {selectedVehicle && (
        <div className="modal-overlay">
          <div className="vehicle-modal details-modal">

            <div className="modal-heading">
              <div>
                <h2>Vehicle Details</h2>
                <p>Complete vehicle information.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setSelectedVehicle(null)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="vehicle-details">
              <div className="vehicle-detail-icon">
                <Car size={35} />
              </div>

              <h3>{selectedVehicle.model}</h3>
              <p>{selectedVehicle.number}</p>

              <div className="detail-grid">
                <div>
                  <span>Vehicle Type</span>
                  <strong>{selectedVehicle.type}</strong>
                </div>

                <div>
                  <span>Fuel Type</span>
                  <strong>{selectedVehicle.fuel}</strong>
                </div>

                <div>
                  <span>Manufacturing Year</span>
                  <strong>{selectedVehicle.year}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{selectedVehicle.status}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
