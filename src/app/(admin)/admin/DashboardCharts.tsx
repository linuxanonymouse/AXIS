"use client";

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
  Legend
} from "recharts";

const data = [
  { name: "Mon", applications: 4, contacts: 2, subscribers: 5 },
  { name: "Tue", applications: 7, contacts: 3, subscribers: 8 },
  { name: "Wed", applications: 5, contacts: 1, subscribers: 12 },
  { name: "Thu", applications: 11, contacts: 4, subscribers: 15 },
  { name: "Fri", applications: 9, contacts: 2, subscribers: 10 },
  { name: "Sat", applications: 14, contacts: 5, subscribers: 22 },
  { name: "Sun", applications: 18, contacts: 7, subscribers: 30 },
];

const COLORS = ["#CDA464", "#ffffff", "#4a4a4a"];

export default function DashboardCharts({
  applicationsCount,
  contactsCount,
  subscribersCount
}: {
  applicationsCount: number;
  contactsCount: number;
  subscribersCount: number;
}) {
  const pieData = [
    { name: "Diagnostic Applications", value: applicationsCount || 1 },
    { name: "Contact Submissions", value: contactsCount || 1 },
    { name: "Brief Subscribers", value: subscribersCount || 1 },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginTop: "2rem" }}>
      
      {/* Area Chart */}
      <div style={{ padding: "1.5rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a" }}>
        <h3 style={{ color: "#888", marginBottom: "1.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Weekly Engagement Activity</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CDA464" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#CDA464" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
              <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#111", borderColor: "#333", borderRadius: "2px", color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Area type="monotone" dataKey="applications" stroke="#CDA464" fillOpacity={1} fill="url(#colorApps)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ padding: "1.5rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column" }}>
        <h3 style={{ color: "#888", marginBottom: "1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Submission Distribution</h3>
        <div style={{ width: "100%", flex: 1, minHeight: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#111", borderColor: "#333", borderRadius: "2px", color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px", color: "#888" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
