'use client';

import { useEffect, useState } from 'react';

type Dashboard = {
  totalOrdersToday: number;
  totalRevenueWeek: number;
  topProducts: { name: string; sold: number }[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Orders Today" value={data.totalOrdersToday} />
        <StatCard title="Revenue This Week" value={`$${data.totalRevenueWeek}`} />
        <StatCard title="Top Product" value={data.topProducts[0]?.name || '-'} />
      </div>

      {/* Top products */}
      <div className="border rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>

        <ul className="space-y-2">
          {data.topProducts.map((p, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{p.name}</span>
              <span className="font-medium">{p.sold} sold</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="border rounded p-6 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
