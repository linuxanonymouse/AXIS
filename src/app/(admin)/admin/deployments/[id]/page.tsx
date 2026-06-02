import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function DeploymentOutputPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const req = await prisma.deploymentRequest.findUnique({
    where: { id },
  });

  if (!req) notFound();

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "4rem" }}>
      <Link href="/admin/applications" className="admin-back-link" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#888", textDecoration: "none", marginBottom: "2rem", fontSize: "0.875rem", transition: "color 0.2s" }}>
        <ArrowLeft size={16} /> Back to Queue
      </Link>
      
      <header style={{ marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <p style={{ color: "#4a8fe8", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.5rem" }}>Deployment Request &middot; {new Date(req.createdAt).toLocaleDateString()}</p>
            <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", marginBottom: "0.5rem" }}>
              {req.projectName}
            </h1>
            <p style={{ color: "#888", fontSize: "1rem" }}>
              {req.email} &middot; Internal Owner: {req.internalOwner}
            </p>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "2px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: req.status === "Pending" ? "#666" : "#4a8fe8" }} />
            <span style={{ color: "#ededed", fontSize: "0.875rem", fontWeight: 500 }}>{req.status}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <StatBox label="Category" value={req.requestCategory} />
          <StatBox label="Priority" value={req.priority} />
          <StatBox label="Target Completion" value={req.completionDate} />
        </div>
      </header>

      <div style={{ display: "grid", gap: "3rem" }}>
        <section>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "1.5rem" }}>Technical Baseline</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <DataField label="Current Tech Stack" value={req.techStack} />
            <DataField label="Current Process" value={req.currentProcess} />
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "1.5rem" }}>Scope & Outcomes</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <DataField label="Problem / Bottleneck" value={req.bottleneck} />
            <DataField label="Desired Outcome" value={req.desiredOutcome} />
            <DataField label="Business Impact" value={req.businessImpact} />
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "1.5rem" }}>Logistics</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <DataField label="System Access & Credentials" value={req.systemAccess} />
            {req.supportUrl && (
              <div>
                <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.5rem" }}>Supporting Documents</h3>
                <a href={req.supportUrl} target="_blank" rel="noreferrer" style={{ color: "#4a8fe8", textDecoration: "underline" }}>
                  {req.supportUrl}
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
