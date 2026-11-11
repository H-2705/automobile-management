
import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Wrench,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
} from "lucide-react";

const initialMaintenance = [
  {
    id: 1,
    maintenanceId: "MNT-1001",
    vehicle: "Toyota Innova",
    registration: "KA-01-AB-1234",
    serviceType: "Regular Service",
    serviceDate: "2026-11-10",
    nextService: "2026-12-10",
    provider: "ABC Auto Services",
    cost: 5500,
    status: "Completed",
    description: "Engine oil and filter replacement",
  },
  {
    id: 2,
    maintenanceId: "MNT-1002",
    vehicle: "Tata Nexon",
    registration: "KA-03-CD-5678",
    serviceType: "Brake Repair",
    serviceDate: "2026-11-11",
    nextService: "2026-12-11",
    provider: "City Motors",
    cost: 3200,
    status: "In Progress",
    description: "Brake pad inspection and replacement",
  },
  {
    id: 3,
    maintenanceId: "MNT-1003",
    vehicle: "Mahindra XUV700",
    registration: "KA-05-EF-9012",
    serviceType: "General Inspection",
    serviceDate: "2026-11-13",
    nextService: "2027-02-13",
    provider: "Prime Vehicle Care",
    cost: 1800,
    status: "Scheduled",
    description: "Full vehicle inspection",
  },
  {
    id: 4,
    maintenanceId: "MNT-1004",
    vehicle: "Hyundai Creta",
    registration: "KA-02-GH-3456",
    serviceType: "Tyre Replacement",
    serviceDate: "2026-11-09",
    nextService: "2027-05-09",
    provider: "Wheel Care Center",
    cost: 8500,
    status: "Completed",
    description: "Replacement of two tyres",
  },
  {
    id: 5,
    maintenanceId: "MNT-1005",
    vehicle: "Tata Nexon",
    registration: "KA-04-IJ-7890",
    serviceType: "Battery Repair",
    serviceDate: "2026-11-14",
    nextService: "2026-12-14",
    provider: "Battery World",
    cost: 2500,
    status: "Scheduled",
    description: "Battery health check and maintenance",
  },
];

const emptyForm = {
  vehicle: "",
  registration: "",
  serviceType: "Regular Service",
  serviceDate: "",
  nextService: "",
  provider: "",
  cost: "",
  status: "Scheduled",
  description: "",
};

function Maintenance() {
  const [records, setRecords] = useState(initialMaintenance);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const completed = records.filter(
    (record) => record.status === "Completed"
  ).length;

  const inProgress = records.filter(
    (record) => record.status === "In Progress"
  ).length;

  const scheduled = records.filter(
    (record) => record.status === "Scheduled"
  ).length;

  const totalCost = records.reduce(
    (total, record) => total + Number(record.cost),
    0
  );

  const filteredRecords = records.filter((record) => {
    const searchText = search.toLowerCase();

    const matchesSearch = [
      record.maintenanceId,
      record.vehicle,
      record.registration,
      record.serviceType,
      record.provider,
    ].some((value) => value.toLowerCase().includes(searchText));

    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingRecord(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);
    setFormData({
      ...record,
      cost: String(record.cost),
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

    if (editingRecord) {
      setRecords((previous) =>
        previous.map((record) =>
          record.id === editingRecord.id
            ? {
                ...record,
                ...formData,
                cost: Number(formData.cost),
              }
            : record
        )
      );
    } else {
      const newRecord = {
        ...formData,
        id: Date.now(),
        maintenanceId: `MNT-${Date.now().toString().slice(-6)}`,
        cost: Number(formData.cost),
      };

      setRecords((previous) => [newRecord, ...previous]);
    }

    setShowModal(false);
    setEditingRecord(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this maintenance record?"
      )
    ) {
      setRecords((previous) =>
        previous.filter((record) => record.id !== id)
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "In Progress":
        return "in-progress";
      default:
        return "scheduled";
    }
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-heading">
        <div>
          <h2>Maintenance Management</h2>
          <p>Track vehicle servicing, repairs and maintenance schedules.</p>
        </div>

        <button className="primary-button" onClick={openAddModal}>
          <Plus size={18} />
          Add Maintenance
        </button>
      </div>

      <div className="maintenance-stats">
        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon blue">
            <Wrench size={22} />
          </div>
          <div>
            <p>Total Records</p>
            <h3>{records.length}</h3>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon green">
            <CheckCircle size={22} />
          </div>
          <div>
            <p>Completed</p>
            <h3>{completed}</h3>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <p>In Progress</p>
            <h3>{inProgress}</h3>
          </div>
        </div>

        <div className="maintenance-stat-card">
          <div className="maintenance-stat-icon purple">
            <AlertTriangle size={22} />
          </div>
          <div>
            <p>Scheduled</p>
            <h3>{scheduled}</h3>
          </div>
        </div>
      </div>

      <div className="maintenance-cost-card">
        <div>
          <p>Total Maintenance Expenses</p>
          <h3>₹{totalCost.toLocaleString("en-IN")}</h3>
        </div>
        <div className="maintenance-cost-icon">
          <Wrench size={24} />
        </div>
      </div>

      <div className="maintenance-table-panel">
        <div className="maintenance-table-heading">
          <div>
            <h3>Maintenance Records</h3>
            <p>View and manage vehicle service history.</p>
          </div>

          <span className="maintenance-count">
            {filteredRecords.length} Records
          </span>
        </div>

        <div className="maintenance-filters">
          <div className="maintenance-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search vehicle, registration or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="maintenance-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Vehicle</th>
                <th>Registration</th>
                <th>Service Type</th>
                <th>Service Date</th>
                <th>Next Service</th>
                <th>Provider</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="maintenance-id">
                      {record.maintenanceId}
                    </td>
                    <td>{record.vehicle}</td>
                    <td>{record.registration}</td>
                    <td>{record.serviceType}</td>
                    <td>{record.serviceDate}</td>
                    <td>{record.nextService}</td>
                    <td>{record.provider}</td>
                    <td>
                      ₹{Number(record.cost).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span
                        className={`maintenance-status ${getStatusClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <div className="maintenance-actions">
                        <button
                          title="View"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => openEditModal(record)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          title="Delete"
                          className="delete-action"
                          onClick={() => handleDelete(record.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="empty-maintenance">
                    No maintenance records found.
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
            className="vehicle-modal maintenance-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>
                  {editingRecord
                    ? "Edit Maintenance"
                    : "Add Maintenance Record"}
                </h2>
                <p>Enter vehicle servicing and repair details.</p>
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
                  <label>Vehicle Name *</label>
                  <input
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    placeholder="Enter vehicle name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Registration Number *</label>
                  <input
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Regular Service">Regular Service</option>
                    <option value="Engine Repair">Engine Repair</option>
                    <option value="Brake Repair">Brake Repair</option>
                    <option value="Tyre Replacement">Tyre Replacement</option>
                    <option value="Battery Repair">Battery Repair</option>
                    <option value="General Inspection">General Inspection</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Service Provider *</label>
                  <input
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    placeholder="Enter service provider"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service Date *</label>
                  <input
                    type="date"
                    name="serviceDate"
                    value={formData.serviceDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Next Service Date *</label>
                  <input
                    type="date"
                    name="nextService"
                    value={formData.nextService}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Maintenance Cost (₹) *</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="Enter service cost"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Maintenance Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Service Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter maintenance details..."
                    rows="3"
                  />
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
                  {editingRecord ? "Save Changes" : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedRecord && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="vehicle-modal details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>Maintenance Details</h2>
                <p>{selectedRecord.maintenanceId}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedRecord(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="maintenance-detail-grid">
              <div>
                <span>Vehicle</span>
                <strong>{selectedRecord.vehicle}</strong>
              </div>
              <div>
                <span>Registration</span>
                <strong>{selectedRecord.registration}</strong>
              </div>
              <div>
                <span>Service Type</span>
                <strong>{selectedRecord.serviceType}</strong>
              </div>
              <div>
                <span>Service Provider</span>
                <strong>{selectedRecord.provider}</strong>
              </div>
              <div>
                <span>Service Date</span>
                <strong>{selectedRecord.serviceDate}</strong>
              </div>
              <div>
                <span>Next Service</span>
                <strong>{selectedRecord.nextService}</strong>
              </div>
              <div>
                <span>Cost</span>
                <strong>
                  ₹{Number(selectedRecord.cost).toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedRecord.status}</strong>
              </div>
              <div className="maintenance-description">
                <span>Description</span>
                <strong>
                  {selectedRecord.description || "No description provided"}
                </strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setSelectedRecord(null)}
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

export default Maintenance;
