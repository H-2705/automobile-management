
import { useMemo, useState } from "react";
import {
  FileText,
  Download,
  Car,
  Users,
  Route,
  CalendarCheck,
  Wrench,
  Fuel,
  TrendingUp,
  IndianRupee,
  Filter,
  Search,
  FileSpreadsheet,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const reportCategories = [
  { name: "All Reports", icon: FileText },
  { name: "Vehicle Reports", icon: Car },
  { name: "Driver Reports", icon: Users },
  { name: "Trip Reports", icon: Route },
  { name: "Booking Reports", icon: CalendarCheck },
  { name: "Maintenance Reports", icon: Wrench },
  { name: "Fuel Reports", icon: Fuel },
];

const sampleReports = [
  {
    id: "RPT001",
    title: "Monthly Vehicle Performance",
    category: "Vehicle Reports",
    date: "2026-11-02",
    records: 48,
    status: "Completed",
    amount: 0,
  },
  {
    id: "RPT002",
    title: "Driver Activity Summary",
    category: "Driver Reports",
    date: "2026-11-03",
    records: 25,
    status: "Completed",
    amount: 0,
  },
  {
    id: "RPT003",
    title: "Trip Revenue Analysis",
    category: "Trip Reports",
    date: "2026-11-04",
    records: 126,
    status: "Completed",
    amount: 185000,
  },
  {
    id: "RPT004",
    title: "Booking Overview",
    category: "Booking Reports",
    date: "2026-11-05",
    records: 86,
    status: "Completed",
    amount: 95000,
  },
  {
    id: "RPT005",
    title: "Vehicle Maintenance Expenses",
    category: "Maintenance Reports",
    date: "2026-11-06",
    records: 18,
    status: "Completed",
    amount: 42500,
  },
  {
    id: "RPT006",
    title: "Fuel Consumption Analysis",
    category: "Fuel Reports",
    date: "2026-11-07",
    records: 64,
    status: "Completed",
    amount: 68000,
  },
  {
    id: "RPT007",
    title: "Weekly Trip Summary",
    category: "Trip Reports",
    date: "2026-11-08",
    records: 92,
    status: "Processing",
    amount: 125000,
  },
];

const monthlyData = [
  { month: "Jun", trips: 65, expenses: 42000 },
  { month: "Jul", trips: 82, expenses: 51000 },
  { month: "Aug", trips: 75, expenses: 47000 },
  { month: "Sep", trips: 95, expenses: 59000 },
  { month: "Oct", trips: 110, expenses: 64000 },
  { month: "Nov", trips: 126, expenses: 68000 },
];

const expenseData = [
  { name: "Fuel", value: 42 },
  { name: "Maintenance", value: 25 },
  { name: "Driver", value: 18 },
  { name: "Other", value: 15 },
];

const chartColors = ["#3478e5", "#20a477", "#f0a33b", "#8863d9"];

function Reports() {
  const [activeCategory, setActiveCategory] = useState("All Reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredReports = useMemo(() => {
    return sampleReports.filter((report) => {
      const matchesCategory =
        activeCategory === "All Reports" ||
        report.category === activeCategory;

      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFrom = !fromDate || report.date >= fromDate;
      const matchesTo = !toDate || report.date <= toDate;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [activeCategory, searchTerm, fromDate, toDate]);

  const downloadCSV = () => {
    const headers = [
      "Report ID",
      "Report Title",
      "Category",
      "Generated Date",
      "Records",
      "Status",
      "Amount",
    ];

    const rows = filteredReports.map((report) => [
      report.id,
      report.title,
      report.category,
      report.date,
      report.records,
      report.status,
      report.amount,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "autoflow-reports.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const totalRecords = filteredReports.reduce(
    (sum, report) => sum + report.records,
    0
  );

  const totalAmount = filteredReports.reduce(
    (sum, report) => sum + report.amount,
    0
  );

  return (
    <div className="reports-page">
      <div className="reports-heading">
        <div>
          <h2>Reports & Analytics</h2>
          <p>
            Monitor vehicle operations, trips, bookings and expenses.
          </p>
        </div>

        <button
          className="reports-export-button"
          onClick={downloadCSV}
        >
          <Download size={17} />
          Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="reports-stats">
        <div className="reports-stat-card">
          <div className="reports-stat-icon blue">
            <FileText size={22} />
          </div>
          <div>
            <span>Total Reports</span>
            <h3>{filteredReports.length}</h3>
            <small>Available reports</small>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon green">
            <TrendingUp size={22} />
          </div>
          <div>
            <span>Total Records</span>
            <h3>{totalRecords}</h3>
            <small>Across filtered reports</small>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon orange">
            <IndianRupee size={22} />
          </div>
          <div>
            <span>Reported Amount</span>
            <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
            <small>Sample report amounts</small>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon purple">
            <FileSpreadsheet size={22} />
          </div>
          <div>
            <span>Completed Reports</span>
            <h3>
              {
                filteredReports.filter(
                  (report) => report.status === "Completed"
                ).length
              }
            </h3>
            <small>Successfully generated</small>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="reports-charts">
        <div className="reports-chart-panel">
          <div className="reports-panel-heading">
            <div>
              <h3>Monthly Trip Performance</h3>
              <p>Trips completed over the last six months</p>
            </div>
          </div>

          <div className="reports-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf0f5"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8992a2", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8992a2", fontSize: 12 }}
                />
                <Tooltip />
                <Bar
                  dataKey="trips"
                  fill="#3478e5"
                  radius={[5, 5, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="reports-chart-panel">
          <div className="reports-panel-heading">
            <div>
              <h3>Expense Distribution</h3>
              <p>Sample operational expense breakdown</p>
            </div>
          </div>

          <div className="reports-pie-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Report categories */}
      <div className="reports-category-panel">
        <div className="reports-panel-heading">
          <div>
            <h3>Report Categories</h3>
            <p>Select a category to view its reports</p>
          </div>
        </div>

        <div className="reports-category-list">
          {reportCategories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className={`reports-category-item ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <Icon size={17} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reports table */}
      <div className="reports-table-panel">
        <div className="reports-panel-heading">
          <div>
            <h3>Generated Reports</h3>
            <p>
              Browse and export your operational reports.
            </p>
          </div>

          <span className="reports-count">
            {filteredReports.length} reports
          </span>
        </div>

        <div className="reports-filters">
          <div className="reports-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search report name or ID..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="reports-date-filter">
            <Filter size={16} />
            <label>From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>

          <div className="reports-date-filter">
            <label>To</label>
            <input
              type="date"
              value={toDate}
              min={fromDate || undefined}
              onChange={(event) => setToDate(event.target.value)}
            />
          </div>

          <button
            className="reports-clear-button"
            onClick={() => {
              setSearchTerm("");
              setFromDate("");
              setToDate("");
              setActiveCategory("All Reports");
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Report Name</th>
                <th>Category</th>
                <th>Generated Date</th>
                <th>Records</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td className="reports-id">{report.id}</td>
                    <td className="reports-title">{report.title}</td>
                    <td>{report.category}</td>
                    <td>{report.date}</td>
                    <td>{report.records}</td>
                    <td>
                      {report.amount
                        ? `₹${report.amount.toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                    <td>
                      <span
                        className={`reports-status ${
                          report.status === "Completed"
                            ? "completed"
                            : "processing"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="reports-empty">
                    No reports found. Try changing your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
