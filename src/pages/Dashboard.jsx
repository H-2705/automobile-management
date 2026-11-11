
import {
  Car,
  Users,
  Route,
  Wrench,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  Fuel,
  Plus,
  MoreHorizontal,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  {
    title: "Total Vehicles",
    value: "1,250",
    change: "+12.5%",
    trend: "up",
    icon: Car,
    color: "blue",
  },
  {
    title: "Active Drivers",
    value: "320",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "purple",
  },
  {
    title: "Total Trips",
    value: "8,420",
    change: "+18.4%",
    trend: "up",
    icon: Route,
    color: "green",
  },
  {
    title: "Maintenance Due",
    value: "45",
    change: "-4.5%",
    trend: "down",
    icon: Wrench,
    color: "orange",
  },
];

const monthlyData = [
  { month: "Jan", trips: 320, revenue: 240 },
  { month: "Feb", trips: 450, revenue: 320 },
  { month: "Mar", trips: 380, revenue: 290 },
  { month: "Apr", trips: 520, revenue: 390 },
  { month: "May", trips: 480, revenue: 350 },
  { month: "Jun", trips: 620, revenue: 450 },
  { month: "Jul", trips: 580, revenue: 420 },
  { month: "Aug", trips: 700, revenue: 520 },
  { month: "Sep", trips: 650, revenue: 480 },
  { month: "Oct", trips: 780, revenue: 580 },
  { month: "Nov", trips: 720, revenue: 540 },
  { month: "Dec", trips: 850, revenue: 650 },
];

const vehicleData = [
  { name: "Active", value: 980, color: "#2563eb" },
  { name: "In Maintenance", value: 45, color: "#f59e0b" },
  { name: "Available", value: 180, color: "#10b981" },
  { name: "Inactive", value: 45, color: "#94a3b8" },
];

const trips = [
  {
    id: "TRP-1001",
    vehicle: "Toyota Innova",
    driver: "Rahul Kumar",
    route: "Bangalore → Mysore",
    status: "In Progress",
  },
  {
    id: "TRP-1002",
    vehicle: "Tata Nexon",
    driver: "Arun Sharma",
    route: "Bangalore → Chennai",
    status: "Completed",
  },
  {
    id: "TRP-1003",
    vehicle: "Mahindra XUV",
    driver: "Kiran Reddy",
    route: "Bangalore → Hubli",
    status: "Pending",
  },
  {
    id: "TRP-1004",
    vehicle: "Hyundai Creta",
    driver: "Suresh Patil",
    route: "Bangalore → Mangalore",
    status: "Completed",
  },
];

const maintenance = [
  {
    vehicle: "KA 05 AB 1234",
    model: "Toyota Innova",
    task: "Oil Change",
    due: "Today",
    priority: "High",
  },
  {
    vehicle: "KA 03 CD 5678",
    model: "Tata Nexon",
    task: "Brake Inspection",
    due: "Tomorrow",
    priority: "Medium",
  },
  {
    vehicle: "KA 01 EF 9012",
    model: "Mahindra XUV",
    task: "General Service",
    due: "14 Nov",
    priority: "Low",
  },
];

function StatCard({ item }) {
  const Icon = item.icon;
  const TrendIcon =
    item.trend === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon ${item.color}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="stat-title">{item.title}</p>

      <h2>{item.value}</h2>

      <div className="stat-footer">
        <span
          className={`change ${
            item.trend === "down" ? "down" : "up"
          }`}
        >
          <TrendIcon size={15} />
          {item.change}
        </span>

        <span>vs last month</span>
      </div>
    </div>
  );
}

function CustomChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="dashboard-chart-tooltip">
      <strong>{label}</strong>

      {payload.map((item) => (
        <div key={item.dataKey}>
          <span
            className="tooltip-dot"
            style={{ background: item.color }}
          />
          {item.name === "trips" ? "Trips" : "Revenue"}:{" "}
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard({ onNavigate }) {
  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="dashboard-content">

      {/* Dashboard heading */}
      <div className="dashboard-welcome">
        <div>
          <h2>Fleet Overview</h2>
          <p>
            Monitor your vehicles, drivers and transportation operations.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => handleNavigation("Vehicles")}
        >
          <Plus size={17} />
          Add New Vehicle
        </button>
      </div>

      {/* Summary cards */}
      <div className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">

        {/* Trips and revenue */}
        <div className="panel revenue-panel">
          <div className="panel-heading">
            <div>
              <h3>Trips & Revenue Overview</h3>
              <p>Monthly transportation performance</p>
            </div>

            <select defaultValue="2026" aria-label="Report year">
              <option value="2026">2026</option>
            </select>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-blue"></i>
              Trips
            </span>

            <span>
              <i className="legend-green"></i>
              Revenue
            </span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="tripGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                      stopOpacity={0.22}
                    />
                    <stop
                      offset="95%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#10b981"
                      stopOpacity={0.18}
                    />
                    <stop
                      offset="95%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e9edf3"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8992a2", fontSize: 11 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8992a2", fontSize: 11 }}
                />

                <Tooltip content={<CustomChartTooltip />} />

                <Area
                  type="monotone"
                  dataKey="trips"
                  name="trips"
                  stroke="#2563eb"
                  fill="url(#tripGradient)"
                  strokeWidth={2.5}
                  activeDot={{ r: 5 }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="revenue"
                  stroke="#10b981"
                  fill="url(#revenueGradient)"
                  strokeWidth={2.5}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle status */}
        <div className="panel vehicle-panel">
          <div className="panel-heading">
            <div>
              <h3>Vehicle Status</h3>
              <p>Current fleet distribution</p>
            </div>

            <MoreHorizontal size={22} color="#8992a2" />
          </div>

          <div className="donut-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  stroke="none"
                >
                  {vehicleData.map((item) => (
                    <Cell
                      key={item.name}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-center">
              <strong>1,250</strong>
              <span>Total Fleet</span>
            </div>
          </div>

          <div className="vehicle-legend">
            {vehicleData.map((item) => (
              <div
                className="vehicle-legend-item"
                key={item.name}
              >
                <span>
                  <i style={{ background: item.color }}></i>
                  {item.name}
                </span>

                <strong>{item.value.toLocaleString("en-IN")}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent trips and maintenance */}
      <div className="bottom-grid">

        {/* Recent trips */}
        <div className="panel trips-panel">
          <div className="panel-heading">
            <div>
              <h3>Recent Trips</h3>
              <p>Latest vehicle trip activities</p>
            </div>

            <button
              className="text-button"
              onClick={() => handleNavigation("Trips & Routes")}
            >
              View All
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>TRIP ID</th>
                  <th>VEHICLE</th>
                  <th>DRIVER</th>
                  <th>ROUTE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id}>
                    <td className="trip-id">{trip.id}</td>
                    <td>{trip.vehicle}</td>
                    <td>{trip.driver}</td>
                    <td>{trip.route}</td>

                    <td>
                      <span
                        className={`status ${
                          trip.status
                            .toLowerCase()
                            .replace(" ", "-")
                        }`}
                      >
                        {trip.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Maintenance alerts */}
        <div className="panel maintenance-panel">
          <div className="panel-heading">
            <div>
              <h3>Maintenance Alerts</h3>
              <p>Upcoming service schedules</p>
            </div>

            <Wrench size={21} color="#f59e0b" />
          </div>

          {maintenance.map((item) => (
            <div
              className="maintenance-item"
              key={item.vehicle}
            >
              <div className="maintenance-icon">
                <Wrench size={19} />
              </div>

              <div className="maintenance-info">
                <strong>{item.model}</strong>
                <span>{item.vehicle}</span>
                <small>{item.task}</small>
              </div>

              <div className="maintenance-due">
                <span
                  className={`priority ${item.priority.toLowerCase()}`}
                >
                  {item.priority}
                </span>

                <small>
                  <Clock size={12} />
                  {item.due}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <span>
          <MapPin size={14} />
          Fleet operations overview
        </span>

        <span>
          <Fuel size={14} />
          Sample demonstration data
        </span>
      </div>
    </div>
  );
}
