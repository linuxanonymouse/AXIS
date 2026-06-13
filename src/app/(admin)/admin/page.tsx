import { prisma } from "@/lib/prisma";
import DashboardCharts from "./DashboardCharts";

export default async function AdminDashboard() {
  const applicationsCount = await prisma.diagnosticApplication.count();
  const contactsCount = await prisma.contactSubmission.count();
  const subscribersCount = await prisma.newsletterSubscriber.count();

  // Calculate the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [apps, contacts, subscribers] = await Promise.all([
    prisma.diagnosticApplication.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
    prisma.contactSubmission.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
    prisma.newsletterSubscriber.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  // Create empty template for last 7 days
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyData = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    weeklyData.push({
      name: days[d.getDay()],
      dateStr: d.toDateString(),
      applications: 0,
      contacts: 0,
      subscribers: 0,
    });
  }

  // Group data
  const groupData = (items: any[], key: string) => {
    items.forEach((item) => {
      const d = new Date(item.createdAt);
      const match = weeklyData.find((w) => w.dateStr === d.toDateString());
      if (match) {
        match[key as keyof typeof match] = (match[key as keyof typeof match] as number) + 1;
      }
    });
  };

  groupData(apps, "applications");
  groupData(contacts, "contacts");
  groupData(subscribers, "subscribers");

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", margin: "0 0 0.5rem" }}>
          Dashboard Overview
        </h1>
        <p style={{ color: "#a0a0a0", fontSize: "1rem", margin: 0 }}>
          System telemetry and incoming data streams.
        </p>
      </header>
      
      <div className="admin-kpi-grid">
        
        <div style={{ padding: "2rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #d4af37, transparent)", opacity: 0.3 }} />
          <h3 style={{ color: "#888", margin: "0 0 1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Diagnostic Applications</h3>
          <p style={{ fontSize: "3rem", margin: 0, fontWeight: 300, color: "#fff", fontFamily: "var(--font-cormorant)" }}>{applicationsCount}</p>
        </div>

        <div style={{ padding: "2rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #fff, transparent)", opacity: 0.1 }} />
          <h3 style={{ color: "#888", margin: "0 0 1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact Submissions</h3>
          <p style={{ fontSize: "3rem", margin: 0, fontWeight: 300, color: "#fff", fontFamily: "var(--font-cormorant)" }}>{contactsCount}</p>
        </div>

        <div style={{ padding: "2rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #fff, transparent)", opacity: 0.1 }} />
          <h3 style={{ color: "#888", margin: "0 0 1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Brief Subscribers</h3>
          <p style={{ fontSize: "3rem", margin: 0, fontWeight: 300, color: "#fff", fontFamily: "var(--font-cormorant)" }}>{subscribersCount}</p>
        </div>

      </div>

      <DashboardCharts 
        applicationsCount={applicationsCount} 
        contactsCount={contactsCount} 
        subscribersCount={subscribersCount} 
        weeklyData={weeklyData}
      />
    </div>
  );
}
