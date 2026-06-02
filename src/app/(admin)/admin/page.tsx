import { prisma } from "@/lib/prisma";
import DashboardCharts from "./DashboardCharts";

export default async function AdminDashboard() {
  const applicationsCount = await prisma.diagnosticApplication.count();
  const contactsCount = await prisma.contactSubmission.count();
  const subscribersCount = await prisma.newsletterSubscriber.count();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", marginBottom: "0.5rem" }}>
          Dashboard Overview
        </h1>
        <p style={{ color: "#a0a0a0", fontSize: "1rem" }}>
          System telemetry and incoming data streams.
        </p>
      </header>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        
        <div style={{ padding: "2rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #d4af37, transparent)", opacity: 0.3 }} />
          <h3 style={{ color: "#888", marginBottom: "1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Diagnostic Applications</h3>
          <p style={{ fontSize: "3rem", fontWeight: 300, color: "#fff", fontFamily: "var(--font-cormorant)" }}>{applicationsCount}</p>
        </div>

        <div style={{ padding: "2rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #fff, transparent)", opacity: 0.1 }} />
          <h3 style={{ color: "#888", marginBottom: "1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact Submissions</h3>
          <p style={{ fontSize: "3rem", fontWeight: 300, color: "#fff", fontFamily: "var(--font-cormorant)" }}>{contactsCount}</p>
        </div>

        <div style={{ padding: "2rem", border: "1px solid #1a1a1a", borderRadius: "2px", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #fff, transparent)", opacity: 0.1 }} />
          <h3 style={{ color: "#888", marginBottom: "1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Brief Subscribers</h3>
          <p style={{ fontSize: "3rem", fontWeight: 300, color: "#fff", fontFamily: "var(--font-cormorant)" }}>{subscribersCount}</p>
        </div>

      </div>

      <DashboardCharts 
        applicationsCount={applicationsCount} 
        contactsCount={contactsCount} 
        subscribersCount={subscribersCount} 
      />
    </div>
  );
}
