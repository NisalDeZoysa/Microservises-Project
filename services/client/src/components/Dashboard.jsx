"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [recentEmails, setRecentEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [summaryRes, ordersRes, paymentsRes, emailsRes] =
          await Promise.all([
            axios.get("http://localhost:8000/dashboard/summary"),
            axios.get("http://localhost:8000/dashboard/recent-orders"),
            axios.get("http://localhost:8000/dashboard/recent-payments"),
            axios.get("http://localhost:8000/dashboard/recent-emails"),
          ]);

        setSummary(summaryRes.data);
        setRecentOrders(ordersRes.data);
        setRecentPayments(paymentsRes.data);
        setRecentEmails(emailsRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <section className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold mb-2">Total Payments</h2>
          <p className="text-xl">{summary?.totalPayments || 0}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold mb-2">Total Orders</h2>
          <p className="text-xl">{summary?.totalOrders || 0}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold mb-2">Total Emails Sent</h2>
          <p className="text-xl">{summary?.totalEmails || 0}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <ul className="space-y-2">
          {recentOrders.length === 0 ? (
            <p>No recent orders</p>
          ) : (
            recentOrders.map((order) => (
              <li
                key={order.orderId}
                className="p-2 border rounded flex justify-between"
              >
                <span>User {order.userId}</span>
                <span>Order ID: {order.orderId}</span>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Payments</h2>
        <ul className="space-y-2">
          {recentPayments.length === 0 ? (
            <p>No recent payments</p>
          ) : (
            recentPayments.map((payment, idx) => (
              <li key={idx} className="p-2 border rounded flex justify-between">
                <span>User {payment.userId}</span>
                <span>${payment.total}</span>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Emails</h2>
        <ul className="space-y-2">
          {recentEmails.length === 0 ? (
            <p>No recent emails sent</p>
          ) : (
            recentEmails.map((email, idx) => (
              <li key={idx} className="p-2 border rounded flex justify-between">
                <span>User {email.userId}</span>
                <span>Email ID: {email.emailId}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
