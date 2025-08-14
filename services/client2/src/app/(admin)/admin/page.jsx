"use client";

import { useRouter } from "next/navigation";
import {
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaBoxOpen,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4780 },
  { name: "May", sales: 5890 },
  { name: "Jun", sales: 4390 },
];

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
  // Example: Clear auth data
  localStorage.removeItem("token");
  router.push("/"); // Redirect to login page
};

  return (
    <div className="flex flex-col justify-center p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Orders"
          value="1,245"
          icon={<FaShoppingCart className="text-blue-500 text-3xl" />}
        />
        <StatCard
          title="Revenue"
          value="$58,245"
          icon={<FaDollarSign className="text-green-500 text-3xl" />}
        />
        <StatCard
          title="Customers"
          value="845"
          icon={<FaUsers className="text-purple-500 text-3xl" />}
        />
        <StatCard
          title="Products"
          value="320"
          icon={<FaBoxOpen className="text-orange-500 text-3xl" />}
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
