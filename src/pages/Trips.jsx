
import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Route,
  CheckCircle,
  Clock,
  PlayCircle,
  X,
} from "lucide-react";

const initialTrips = [
  {
    id: 1,
    tripId: "TRP-1001",
    customer: "Rahul Enterprises",
    pickup: "Bengaluru",
    destination: "Mysuru",
    date: "2026-11-11",
    time: "09:00",
    driver: "Rahul Kumar",
    vehicle: "Toyota Innova",
    amount: 3500,
    status: "Completed",
  },
  {
    id: 2,
    tripId: "TRP-1002",
    customer: "Priya Sharma",
    pickup: "Electronic City",
    destination: "Airport",
    date: "2026-11-11",
    time: "10:30",
    driver: "Arun Sharma",
    vehicle: "Tata Nexon",
    amount: 1800,
    status: "In Progress",
  },
  {
    id: 3,
    tripId: "TRP-1003",
    customer: "Global Tech Pvt Ltd",
    pickup: "Whitefield",
    destination: "MG Road",
    date: "2026-11-12",
    time: "08:00",
    driver: "Kiran Reddy",
    vehicle: "Mahindra XUV700",
    amount: 2200,
    status: "Scheduled",
  },
  {
    id: 4,
    tripId: "TRP-1004",
    customer: "Amit Kumar",
    pickup: "Jayanagar",
    destination: "Kempegowda Airport",
    date: "2026-11-12",
    time: "14:00",
    driver: "Suresh Patil",
    vehicle: "Hyundai Creta",
    amount: 1600,
    status: "Scheduled",
  },
  {
    id: 5,
    tripId: "TRP-1005",
    customer: "City Logistics",
    pickup: "Peenya",
    destination: "Tumakuru",
    date: "2026-11-10",
    time: "07:30",
    driver: "Manoj Kumar",
    vehicle: "Tata Nexon",
    amount: 2800,
    status: "Cancelled",
  },
];

const emptyForm = {
  customer: "",
  pickup: "",
  destination: "",
  date: "",
  time: "",
  driver: "",
  vehicle: "",
  amount: "",
  status: "Scheduled",
};

function Trips() {
  const [trips, setTrips] = useState(initialTrips);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const completed = trips.filter(
    (trip) => trip.status === "Completed"
  ).length;

  const inProgress = trips.filter(
    (trip) => trip.status === "In Progress"
  ).length;

  const scheduled = trips.filter(
    (trip) => trip.status === "Scheduled"
  ).length;

  const filteredTrips = trips.filter((trip) => {
    const searchText = search.toLowerCase();

    const matchesSearch = [
      trip.tripId,
      trip.customer,
      trip.driver,
      trip.pickup,
      trip.destination,
    ].some((value) => value.toLowerCase().includes(searchText));

    const matchesStatus =
      statusFilter === "All" || trip.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingTrip(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (trip) => {
    setEditingTrip(trip);
    setFormData({
      ...trip,
      amount: String(trip.amount),
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTrip) {
      setTrips((previous) =>
        previous.map((trip) =>
          trip.id === editingTrip.id
            ? {
                ...trip,
                ...formData,
                amount: Number(formData.amount),
              }
            : trip
        )
      );
    } else {
      const newTrip = {
        ...formData,
        id: Date.now(),
        tripId: `TRP-${Date.now().toString().slice(-6)}`,
        amount: Number(formData.amount),
      };

      setTrips((previous) => [newTrip, ...previous]);
    }

    setShowModal(false);
    setFormData(emptyForm);
    setEditingTrip(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      setTrips((previous) =>
        previous.filter((trip) => trip.id !== id)
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "In Progress":
        return "in-progress";
      case "Cancelled":
        return "cancelled";
      default:
        return "scheduled";
    }
  };

  return (
    <div className="trip-page">
      <div className="trip-heading">
        <div>
          <h2>Trips & Routes</h2>
          <p>Manage trips, routes, drivers and transportation schedules.</p>
        </div>

        <button className="primary-button" onClick={openAddModal}>
          <Plus size={18} />
          Create New Trip
        </button>
      </div>

      <div className="trip-stats">
        <div className="trip-stat-card">
          <div className="trip-stat-icon blue">
            <Route size={22} />
          </div>
          <div>
            <p>Total Trips</p>
            <h3>{trips.length}</h3>
          </div>
        </div>

        <div className="trip-stat-card">
          <div className="trip-stat-icon green">
            <CheckCircle size={22} />
          </div>
          <div>
            <p>Completed</p>
            <h3>{completed}</h3>
          </div>
        </div>

        <div className="trip-stat-card">
          <div className="trip-stat-icon orange">
            <PlayCircle size={22} />
          </div>
          <div>
            <p>In Progress</p>
            <h3>{inProgress}</h3>
          </div>
        </div>

        <div className="trip-stat-card">
          <div className="trip-stat-icon purple">
            <Clock size={22} />
          </div>
          <div>
            <p>Scheduled</p>
            <h3>{scheduled}</h3>
          </div>
        </div>
      </div>

      <div className="trip-table-panel">
        <div className="trip-table-heading">
          <div>
            <h3>All Trips</h3>
            <p>View and manage all transportation trips.</p>
          </div>

          <span className="trip-count">
            {filteredTrips.length} Trips
          </span>
        </div>

        <div className="trip-filters">
          <div className="trip-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search trip, customer, driver or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="trip-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="trip-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Customer</th>
                <th>Route</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                  <tr key={trip.id}>
                    <td className="trip-id">{trip.tripId}</td>
                    <td>{trip.customer}</td>
                    <td>
                      <div className="trip-route">
                        <span>{trip.pickup}</span>
                        <span className="route-arrow">→</span>
                        <span>{trip.destination}</span>
                      </div>
                    </td>
                    <td>{trip.driver}</td>
                    <td>{trip.vehicle}</td>
                    <td>
                      <div className="trip-date">
                        <span>{trip.date}</span>
                        <small>{trip.time}</small>
                      </div>
                    </td>
                    <td>₹{Number(trip.amount).toLocaleString("en-IN")}</td>
                    <td>
                      <span
                        className={`trip-status ${getStatusClass(
                          trip.status
                        )}`}
                      >
                        {trip.status}
                      </span>
                    </td>
                    <td>
                      <div className="trip-actions">
                        <button
                          title="View"
                          onClick={() => setSelectedTrip(trip)}
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => openEditModal(trip)}
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          title="Delete"
                          className="delete-action"
                          onClick={() => handleDelete(trip.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="empty-trips">
                    No trips found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="vehicle-modal trip-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>{editingTrip ? "Edit Trip" : "Create New Trip"}</h2>
                <p>Enter the trip and route details below.</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="vehicle-form-grid">
                <div className="form-group">
                  <label>Customer Name *</label>
                  <input
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pickup Location *</label>
                  <input
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Destination *</label>
                  <input
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Enter destination"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Driver Name *</label>
                  <input
                    name="driver"
                    value={formData.driver}
                    onChange={handleChange}
                    placeholder="Assign driver"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle *</label>
                  <input
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    placeholder="Assign vehicle"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Trip Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Trip Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Trip Amount (₹) *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Trip Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  {editingTrip ? "Save Changes" : "Create Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedTrip && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedTrip(null)}
        >
          <div
            className="vehicle-modal details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>Trip Details</h2>
                <p>{selectedTrip.tripId}</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedTrip(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="trip-detail-grid">
              <div>
                <span>Customer</span>
                <strong>{selectedTrip.customer}</strong>
              </div>
              <div>
                <span>Pickup Location</span>
                <strong>{selectedTrip.pickup}</strong>
              </div>
              <div>
                <span>Destination</span>
                <strong>{selectedTrip.destination}</strong>
              </div>
              <div>
                <span>Driver</span>
                <strong>{selectedTrip.driver}</strong>
              </div>
              <div>
                <span>Vehicle</span>
                <strong>{selectedTrip.vehicle}</strong>
              </div>
              <div>
                <span>Date & Time</span>
                <strong>
                  {selectedTrip.date} at {selectedTrip.time}
                </strong>
              </div>
              <div>
                <span>Amount</span>
                <strong>
                  ₹{Number(selectedTrip.amount).toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedTrip.status}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setSelectedTrip(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trips;
