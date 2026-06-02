import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function OperatorOutputPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await prisma.operatorApplication.findUnique({
    where: { id },
  });

  if (!app) notFound();

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "4rem" }}>
      <Link href="/admin/applications" className="admin-back-link" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#888", textDecoration: "none", marginBottom: "2rem", fontSize: "0.875rem", transition: "color 0.2s" }}>
        <ArrowLeft size={16} /> Back to Queue
      </Link>
      
      <header style={{ marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <p style={{ color: "#2ecc71", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.5rem" }}>Operator Application &middot; {new Date(app.createdAt).toLocaleDateString()}</p>
            <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", marginBottom: "0.5rem" }}>
              {app.name}
            </h1>
            <p style={{ color: "#888", fontSize: "1rem" }}>
              {app.email} &middot; Role: {app.currentRole}
            </p>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "2px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: app.status === "Pending" ? "#666" : "#2ecc71" }} />
            <span style={{ color: "#ededed", fontSize: "0.875rem", fontWeight: 500 }}>{app.status}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <StatBox label="Experience" value={app.experienceDuration} />
          <StatBox label="Revenue Range" value={app.revenueRange} />
          <StatBox label="Timeline" value={app.timeline} />
        </div>
      </header>

      <div style={{ display: "grid", gap: "3rem" }}>
        <section>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "1.5rem" }}>Client Portfolio</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <DataField label="Active Clients" value={app.activeClients} />
            <DataField label="Acquisition Method" value={app.clientAcquisition} />
            <DataField label="Realistic New Clients (30-60 days)" value={app.realisticClients} />
            <DataField label="In position to bring clients?" value={app.bringClients} />
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "1.5rem" }}>Operations</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <DataField label="Primary Limitation" value={app.primaryLimitation} />
            <DataField label="Delivery Method" value={app.deliveryMethod} />
            <DataField label="Relationship Management" value={app.relationshipManagement} />
            <DataField label="White Label Comfort" value={app.whiteLabelComfort} />
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "1.5rem" }}>Alignment & Details</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <DataField label="Why interested?" value={app.interestReason} />
            {app.portfolioUrl && (
              <div>
                <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.5rem" }}>Website / Portfolio</h3>
                <a href={app.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: "#2ecc71", textDecoration: "underline" }}>
                  {app.portfolioUrl}
                </a>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | null }) {
  return (
    <div style={{ padding: "1rem", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a" }}>
      <p style={{ color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.65rem", marginBottom: "0.25rem" }}>{label}</p>
      <p style={{ color: "#ededed", fontSize: "0.875rem", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value || " "}</p>
    </div>
  );
}

function DataField({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.5rem" }}>{label}</h3>
      <div style={{ padding: "1.5rem", backgroundColor: "#050505", border: "1px solid #111", borderRadius: "2px" }}>
        <p style={{ color: "#c8c8c8", fontSize: "1rem", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
          {value || "Not provided."}
        </p>
      </div>
    </div>
  );
}
