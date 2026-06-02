import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ApplicationsPage() {
  const [diagnostics, deployments, operators] = await Promise.all([
    prisma.diagnosticApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.deploymentRequest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.operatorApplication.findMany({ orderBy: { createdAt: "desc" } })
  ]);

  const allSubmissions = [
    ...diagnostics.map(d => ({ ...d, _type: "diagnostic" as const })),
    ...deployments.map(d => ({ ...d, _type: "deployment" as const })),
    ...operators.map(d => ({ ...d, _type: "operator" as const }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", marginBottom: "0.5rem" }}>
          Intake Queue
        </h1>
        <p style={{ color: "#a0a0a0", fontSize: "1rem" }}>
          Internal review queue for Axis Strategic Diagnostics and Studio Deployment Requests.
        </p>
      </header>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {allSubmissions.map((sub) => {
          if (sub._type === "diagnostic") {
            const statusColor = sub.internalReviewStatus === "Aligned" ? "#d4af37" 
              : sub.internalReviewStatus === "Potential Fit" ? "#fff" 
              : "#666";
            
            return (
              <Link key={sub.id} href={`/admin/applications/${sub.id}`} style={{ textDecoration: "none" }}>
                <div className="admin-card" style={{ 
                  padding: "1.5rem 2rem", border: "1px solid #1a1a1a", borderRadius: "2px", 
                  backgroundColor: "#050505", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                  alignItems: "center", gap: "2rem", transition: "border-color 0.3s ease"
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#d4af37" }} />
                      <h3 style={{ fontSize: "1.125rem", color: "#ededed", fontFamily: "var(--font-cormorant)" }}>{sub.organizationName}</h3>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#666" }}>Diagnostic &middot; {sub.applicantName}</p>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Stage</p>
                    <p style={{ fontSize: "0.875rem", color: "#a0a0a0", textTransform: "capitalize" }}>{sub.businessStage || " "}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Alignment Score</p>
                    <p style={{ fontSize: "1rem", color: sub.overallAlignmentScore ? "#d4af37" : "#666", fontFamily: "var(--font-cormorant)" }}>
                      {sub.overallAlignmentScore ? `${sub.overallAlignmentScore}/100` : "Pending"}
                    </p>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Status</p>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: statusColor }} />
                      <span style={{ fontSize: "0.875rem", color: "#a0a0a0" }}>{sub.internalReviewStatus || "Awaiting processing"}</span>
                    </div>
                  </div>

                  <div style={{ color: "#444", fontSize: "0.875rem" }}>
                    {new Date(sub.createdAt).toLocaleDateString()} &rarr;
                  </div>
                </div>
              </Link>
            );
          } else if (sub._type === "deployment") {
            // Deployment Request
            return (
              <Link key={sub.id} href={`/admin/deployments/${sub.id}`} style={{ textDecoration: "none" }}>
                <div className="admin-card" style={{ 
                  padding: "1.5rem 2rem", border: "1px solid #1a1a1a", borderRadius: "2px", 
                  backgroundColor: "#050505", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                  alignItems: "center", gap: "2rem", transition: "border-color 0.3s ease"
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4a8fe8" }} />
                      <h3 style={{ fontSize: "1.125rem", color: "#ededed", fontFamily: "var(--font-cormorant)" }}>{sub.projectName}</h3>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#666" }}>Deployment &middot; {sub.email}</p>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Category</p>
                    <p style={{ fontSize: "0.875rem", color: "#a0a0a0", textTransform: "capitalize" }}>{sub.requestCategory || " "}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Priority</p>
                    <p style={{ fontSize: "0.875rem", color: sub.priority === "High" ? "#e84a4a" : "#a0a0a0" }}>
                      {sub.priority}
                    </p>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Status</p>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: sub.status === "Pending" ? "#666" : "#4a8fe8" }} />
                      <span style={{ fontSize: "0.875rem", color: "#a0a0a0" }}>{sub.status}</span>
                    </div>
                  </div>

                  <div style={{ color: "#444", fontSize: "0.875rem" }}>
                    {new Date(sub.createdAt).toLocaleDateString()} &rarr;
                  </div>
                </div>
              </Link>
            );
          } else {
            // Operator Application
            return (
              <Link key={sub.id} href={`/admin/operators/${sub.id}`} style={{ textDecoration: "none" }}>
                <div className="admin-card" style={{ 
                  padding: "1.5rem 2rem", border: "1px solid #1a1a1a", borderRadius: "2px", 
                  backgroundColor: "#050505", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                  alignItems: "center", gap: "2rem", transition: "border-color 0.3s ease"
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2ecc71" }} />
                      <h3 style={{ fontSize: "1.125rem", color: "#ededed", fontFamily: "var(--font-cormorant)" }}>{sub.name}</h3>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#666" }}>Operator &middot; {sub.email}</p>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Role</p>
                    <p style={{ fontSize: "0.875rem", color: "#a0a0a0", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub.currentRole || " "}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Revenue</p>
                    <p style={{ fontSize: "0.875rem", color: "#a0a0a0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {sub.revenueRange || " "}
                    </p>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Status</p>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: sub.status === "Pending" ? "#666" : "#2ecc71" }} />
                      <span style={{ fontSize: "0.875rem", color: "#a0a0a0" }}>{sub.status}</span>
                    </div>
                  </div>

                  <div style={{ color: "#444", fontSize: "0.875rem" }}>
                    {new Date(sub.createdAt).toLocaleDateString()} &rarr;
                  </div>
                </div>
              </Link>
            );
          }
        })}
        
        {allSubmissions.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", border: "1px dashed #1a1a1a" }}>
            <p style={{ color: "#666", fontFamily: "var(--font-cormorant)", fontSize: "1.25rem" }}>No submissions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

