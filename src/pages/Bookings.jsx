
import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  CalendarCheck,
  CheckCircle,
  Clock,
  XCircle,
  X,
} from "lucide-react";

const initialBookings = [
  {
    id: 1,
    bookingId: "BKG-1001",
    customer: "Rahul Enterprises",
    phone: "9876543210",
    pickup: "Bengaluru",
    destination: "Mysuru",
    date: "2026-11-11",
    time: "09:00",
    vehicle: "Toyota Innova",
    driver: "Rahul Kumar",
    amount: 3500,
    status: "Confirmed",
  },
  {
    id: 2,
    bookingId: "BKG-1002",
    customer: "Priya Sharma",
    phone: "9876543211",
    pickup: "Electronic City",
    destination: "Airport",
    date: "2026-11-12",
    time: "10:30",
    vehicle: "Tata Nexon",
    driver: "Arun Sharma",
    amount: 1800,
    status: "Pending",
  },
  {
    id: 3,
    bookingId: "BKG-1003",
    customer: "Global Tech Pvt Ltd",
    phone: "9876543212",
    pickup: "Whitefield",
    destination: "MG Road",
    date: "2026-11-13",
    time: "08:00",
    vehicle: "Mahindra XUV700",
    driver: "Kiran Reddy",
    amount: 2200,
    status: "Completed",
  },
  {
    id: 4,
    bookingId: "BKG-1004",
    customer: "Amit Kumar",
    phone: "9876543213",
    pickup: "Jayanagar",
    destination: "Airport",
    date: "2026-11-14",
    time: "14:00",
    vehicle: "Hyundai Creta",
    driver: "Suresh Patil",
    amount: 1600,
    status: "Cancelled",
  },
  {
    id: 5,
    bookingId: "BKG-1005",
    customer: "City Logistics",
    phone: "9876543214",
    pickup: "Peenya",
    destination: "Tumakuru",
    date: "2026-11-15",
    time: "07:30",
    vehicle: "Tata Nexon",
    driver: "Manoj Kumar",
    amount: 2800,
    status: "Confirmed",
  },
];

const emptyForm = {
  customer: "",
  phone: "",
  pickup: "",
  destination: "",
  date: "",
  time: "",
  vehicle: "",
  driver: "",
  amount: "",
  status: "Pending",
};

function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const filteredBookings = bookings.filter((booking) => {
    const searchText = search.toLowerCase();

    const matchesSearch = [
      booking.bookingId,
      booking.customer,
      booking.phone,
      booking.pickup,
      booking.destination,
      booking.driver,
    ].some((value) =>
      String(value).toLowerCase().includes(searchText)
    );

    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingBooking(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setFormData({
      ...booking,
      amount: String(booking.amount),
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

    if (editingBooking) {
      setBookings((previous) =>
        previous.map((booking) =>
          booking.id === editingBooking.id
            ? {
                ...booking,
                ...formData,
                amount: Number(formData.amount),
              }
            : booking
        )
      );
    } else {
      const newBooking = {
        ...formData,
        id: Date.now(),
        bookingId: `BKG-${Date.now().toString().slice(-6)}`,
        amount: Number(formData.amount),
      };

      setBookings((previous) => [newBooking, ...previous]);
    }

    setShowModal(false);
    setEditingBooking(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings((previous) =>
        previous.filter((booking) => booking.id !== id)
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "confirmed";
      case "Pending":
        return "pending";
      case "Completed":
        return "completed";
      case "Cancelled":
        return "cancelled";
      default:
        return "pending";
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-heading">
        <div>
          <h2>Bookings Management</h2>
          <p>Manage customer bookings and transportation reservations.</p>
        </div>

        <button className="primary-button" onClick={openAddModal}>
          <Plus size={18} />
          Create Booking
        </button>
      </div>

      <div className="booking-stats">
        <div className="booking-stat-card">
          <div className="booking-stat-icon blue">
            <CalendarCheck size={22} />
          </div>
          <div>
            <p>Total Bookings</p>
            <h3>{bookings.length}</h3>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon green">
            <CheckCircle size={22} />
          </div>
          <div>
            <p>Confirmed</p>
            <h3>{confirmed}</h3>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <p>Pending</p>
            <h3>{pending}</h3>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon purple">
            <CheckCircle size={22} />
          </div>
          <div>
            <p>Completed</p>
            <h3>{completed}</h3>
          </div>
        </div>
      </div>

      <div className="booking-table-panel">
        <div className="booking-table-heading">
          <div>
            <h3>All Bookings</h3>
            <p>View and manage customer reservations.</p>
          </div>

          <span className="booking-count">
            {filteredBookings.length} Bookings
          </span>
        </div>

        <div className="booking-filters">
          <div className="booking-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search booking, customer, phone or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="booking-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Pickup</th>
                <th>Destination</th>
                <th>Date & Time</th>
                <th>Vehicle</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="booking-id">{booking.bookingId}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.pickup}</td>
                    <td>{booking.destination}</td>
                    <td>
                      <div className="booking-date">
                        <span>{booking.date}</span>
                        <small>{booking.time}</small>
                      </div>
                    </td>
                    <td>{booking.vehicle}</td>
                    <td>
                      ₹{Number(booking.amount).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span
                        className={`booking-status ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="booking-actions">
                        <button
                          title="View"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => openEditModal(booking)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          title="Delete"
                          className="delete-action"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="empty-bookings">
                    No bookings found.
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
            className="vehicle-modal booking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>
                  {editingBooking ? "Edit Booking" : "Create New Booking"}
                </h2>
                <p>Enter the customer and reservation details.</p>
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
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    pattern="[0-9]{10}"
                    title="Enter a valid 10-digit phone number"
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
                  <label>Booking Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Booking Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle *</label>
                  <input
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    placeholder="Enter vehicle name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Driver *</label>
                  <input
                    name="driver"
                    value={formData.driver}
                    onChange={handleChange}
                    placeholder="Enter driver name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Booking Amount (₹) *</label>
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
                  <label>Booking Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
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
                  {editingBooking ? "Save Changes" : "Create Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedBooking && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="vehicle-modal details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>Booking Details</h2>
                <p>{selectedBooking.bookingId}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedBooking(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="booking-detail-grid">
              <div>
                <span>Customer</span>
                <strong>{selectedBooking.customer}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{selectedBooking.phone}</strong>
              </div>
              <div>
                <span>Pickup</span>
                <strong>{selectedBooking.pickup}</strong>
              </div>
              <div>
                <span>Destination</span>
                <strong>{selectedBooking.destination}</strong>
              </div>
              <div>
                <span>Vehicle</span>
                <strong>{selectedBooking.vehicle}</strong>
              </div>
              <div>
                <span>Driver</span>
                <strong>{selectedBooking.driver}</strong>
              </div>
              <div>
                <span>Date & Time</span>
                <strong>
                  {selectedBooking.date} at {selectedBooking.time}
                </strong>
              </div>
              <div>
                <span>Amount</span>
                <strong>
                  ₹{Number(selectedBooking.amount).toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedBooking.status}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setSelectedBooking(null)}
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

export default Bookings;
