
import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Fuel as FuelIcon,
  IndianRupee,
  Droplet,
  Gauge,
  X,
} from "lucide-react";

const initialFuelRecords = [
  {
    id: 1,
    recordId: "FUEL-1001",
    vehicle: "Toyota Innova",
    registration: "KA-01-AB-1234",
    fuelType: "Diesel",
    quantity: 45,
    pricePerLitre: 92,
    totalCost: 4140,
    station: "Indian Oil - Bengaluru",
    date: "2026-11-10",
    odometer: 45200,
  },
  {
    id: 2,
    recordId: "FUEL-1002",
    vehicle: "Tata Nexon",
    registration: "KA-03-CD-5678",
    fuelType: "Petrol",
    quantity: 35,
    pricePerLitre: 103,
    totalCost: 3605,
    station: "HP Petrol Pump",
    date: "2026-11-11",
    odometer: 28750,
  },
  {
    id: 3,
    recordId: "FUEL-1003",
    vehicle: "Mahindra XUV700",
    registration: "KA-05-EF-9012",
    fuelType: "Diesel",
    quantity: 50,
    pricePerLitre: 92,
    totalCost: 4600,
    station: "Bharat Petroleum",
    date: "2026-11-11",
    odometer: 32100,
  },
  {
    id: 4,
    recordId: "FUEL-1004",
    vehicle: "Hyundai Creta",
    registration: "KA-02-GH-3456",
    fuelType: "Petrol",
    quantity: 30,
    pricePerLitre: 103,
    totalCost: 3090,
    station: "Indian Oil - Mysuru Road",
    date: "2026-11-12",
    odometer: 19800,
  },
  {
    id: 5,
    recordId: "FUEL-1005",
    vehicle: "Tata Nexon",
    registration: "KA-04-IJ-7890",
    fuelType: "Diesel",
    quantity: 40,
    pricePerLitre: 92,
    totalCost: 3680,
    station: "Shell Fuel Station",
    date: "2026-11-12",
    odometer: 36500,
  },
];

const emptyForm = {
  vehicle: "",
  registration: "",
  fuelType: "Diesel",
  quantity: "",
  pricePerLitre: "",
  station: "",
  date: "",
  odometer: "",
};

function Fuel() {
  const [records, setRecords] = useState(initialFuelRecords);
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const totalQuantity = records.reduce(
    (total, record) => total + Number(record.quantity),
    0
  );

  const totalExpense = records.reduce(
    (total, record) => total + Number(record.totalCost),
    0
  );

  const dieselCount = records.filter(
    (record) => record.fuelType === "Diesel"
  ).length;

  const petrolCount = records.filter(
    (record) => record.fuelType === "Petrol"
  ).length;

  const filteredRecords = records.filter((record) => {
    const searchText = search.toLowerCase();

    const matchesSearch = [
      record.recordId,
      record.vehicle,
      record.registration,
      record.station,
      record.fuelType,
    ].some((value) => value.toLowerCase().includes(searchText));

    const matchesFuel =
      fuelFilter === "All" || record.fuelType === fuelFilter;

    return matchesSearch && matchesFuel;
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
      quantity: String(record.quantity),
      pricePerLitre: String(record.pricePerLitre),
      odometer: String(record.odometer),
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

    const quantity = Number(formData.quantity);
    const pricePerLitre = Number(formData.pricePerLitre);

    const calculatedCost = quantity * pricePerLitre;

    const updatedRecord = {
      ...formData,
      quantity,
      pricePerLitre,
      totalCost: calculatedCost,
      odometer: Number(formData.odometer),
    };

    if (editingRecord) {
      setRecords((previous) =>
        previous.map((record) =>
          record.id === editingRecord.id
            ? {
                ...record,
                ...updatedRecord,
              }
            : record
        )
      );
    } else {
      const newRecord = {
        ...updatedRecord,
        id: Date.now(),
        recordId: `FUEL-${Date.now().toString().slice(-6)}`,
      };

      setRecords((previous) => [newRecord, ...previous]);
    }

    setShowModal(false);
    setEditingRecord(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this fuel record?")) {
      setRecords((previous) =>
        previous.filter((record) => record.id !== id)
      );
    }
  };

  return (
    <div className="fuel-page">
      <div className="fuel-heading">
        <div>
          <h2>Fuel Management</h2>
          <p>Monitor vehicle fuel consumption and expenses.</p>
        </div>

        <button className="primary-button" onClick={openAddModal}>
          <Plus size={18} />
          Add Fuel Record
        </button>
      </div>

      <div className="fuel-stats">
        <div className="fuel-stat-card">
          <div className="fuel-stat-icon blue">
            <FuelIcon size={22} />
          </div>
          <div>
            <p>Total Fuel Records</p>
            <h3>{records.length}</h3>
          </div>
        </div>

        <div className="fuel-stat-card">
          <div className="fuel-stat-icon green">
            <Droplet size={22} />
          </div>
          <div>
            <p>Total Fuel Used</p>
            <h3>{totalQuantity.toLocaleString("en-IN")} L</h3>
          </div>
        </div>

        <div className="fuel-stat-card">
          <div className="fuel-stat-icon orange">
            <IndianRupee size={22} />
          </div>
          <div>
            <p>Total Fuel Expenses</p>
            <h3>₹{totalExpense.toLocaleString("en-IN")}</h3>
          </div>
        </div>

        <div className="fuel-stat-card">
          <div className="fuel-stat-icon purple">
            <Gauge size={22} />
          </div>
          <div>
            <p>Diesel / Petrol Records</p>
            <h3>{dieselCount} / {petrolCount}</h3>
          </div>
        </div>
      </div>

      <div className="fuel-table-panel">
        <div className="fuel-table-heading">
          <div>
            <h3>Fuel Records</h3>
            <p>View and manage vehicle-wise fuel purchases.</p>
          </div>

          <span className="fuel-count">
            {filteredRecords.length} Records
          </span>
        </div>

        <div className="fuel-filters">
          <div className="fuel-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search vehicle, registration or fuel station..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="fuel-filter-select"
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
          >
            <option value="All">All Fuel Types</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="fuel-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Vehicle</th>
                <th>Registration</th>
                <th>Fuel Type</th>
                <th>Quantity</th>
                <th>Price / Litre</th>
                <th>Total Cost</th>
                <th>Fuel Station</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="fuel-id">{record.recordId}</td>
                    <td>{record.vehicle}</td>
                    <td>{record.registration}</td>
                    <td>
                      <span
                        className={`fuel-type ${record.fuelType.toLowerCase()}`}
                      >
                        {record.fuelType}
                      </span>
                    </td>
                    <td>{record.quantity} L</td>
                    <td>₹{record.pricePerLitre}</td>
                    <td>
                      ₹{Number(record.totalCost).toLocaleString("en-IN")}
                    </td>
                    <td>{record.station}</td>
                    <td>{record.date}</td>
                    <td>
                      <div className="fuel-actions">
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
                  <td colSpan="10" className="empty-fuel">
                    No fuel records found.
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
            className="vehicle-modal fuel-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2>
                  {editingRecord ? "Edit Fuel Record" : "Add Fuel Record"}
                </h2>
                <p>Enter vehicle fuel purchase details.</p>
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
                  <label>Fuel Type *</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity (Litres) *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price Per Litre (₹) *</label>
                  <input
                    type="number"
                    name="pricePerLitre"
                    value={formData.pricePerLitre}
                    onChange={handleChange}
                    placeholder="Enter price per litre"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Fuel Station *</label>
                  <input
                    name="station"
                    value={formData.station}
                    onChange={handleChange}
                    placeholder="Enter fuel station"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Purchase Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Odometer Reading (KM) *</label>
                  <input
                    type="number"
                    name="odometer"
                    value={formData.odometer}
                    onChange={handleChange}
                    placeholder="Enter odometer reading"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="fuel-cost-preview">
                <span>Calculated Fuel Cost</span>
                <strong>
                  ₹
                  {(
                    Number(formData.quantity || 0) *
                    Number(formData.pricePerLitre || 0)
                  ).toLocaleString("en-IN")}
                </strong>
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
                  {editingRecord ? "Save Changes" : "Add Fuel Record"}
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
                <h2>Fuel Record Details</h2>
                <p>{selectedRecord.recordId}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedRecord(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="fuel-detail-grid">
              <div>
                <span>Vehicle</span>
                <strong>{selectedRecord.vehicle}</strong>
              </div>
              <div>
                <span>Registration</span>
                <strong>{selectedRecord.registration}</strong>
              </div>
              <div>
                <span>Fuel Type</span>
                <strong>{selectedRecord.fuelType}</strong>
              </div>
              <div>
                <span>Quantity</span>
                <strong>{selectedRecord.quantity} L</strong>
              </div>
              <div>
                <span>Price Per Litre</span>
                <strong>₹{selectedRecord.pricePerLitre}</strong>
              </div>
              <div>
                <span>Total Cost</span>
                <strong>
                  ₹{Number(selectedRecord.totalCost).toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Fuel Station</span>
                <strong>{selectedRecord.station}</strong>
              </div>
              <div>
                <span>Purchase Date</span>
                <strong>{selectedRecord.date}</strong>
              </div>
              <div>
                <span>Odometer Reading</span>
                <strong>{selectedRecord.odometer} KM</strong>
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

export default Fuel;
