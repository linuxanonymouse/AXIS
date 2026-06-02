import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export default async function DiagnosticOutputPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await prisma.diagnosticApplication.findUnique({
    where: { id },
  });

  if (!app) notFound();

  const isProcessed = app.isProcessed;
  
  const statusColor = app.internalReviewStatus === "Aligned" ? "#d4af37" 
    : app.internalReviewStatus === "Potential Fit" ? "#fff" 
    : "#666";

  const scores = [
    { label: "Infrastructure", value: app.infrastructureScore },
    { label: "Distribution", value: app.distributionScore },
    { label: "Intelligence", value: app.intelligenceScore },
    { label: "Monetization", value: app.monetizationScore },
    { label: "Expansion", value: app.expansionScore },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Link href="/admin/applications" className="admin-back-link" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#888", textDecoration: "none", marginBottom: "2rem", fontSize: "0.875rem", transition: "color 0.2s" }}>
        <ArrowLeft size={16} /> Back to Queue
      </Link>
      
      <header style={{ marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <p style={{ color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.5rem" }}>Diagnostic Output &middot; {new Date(app.createdAt).toLocaleDateString()}</p>
            <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", marginBottom: "0.5rem" }}>
              {app.organizationName}
            </h1>
            <p style={{ color: "#888", fontSize: "1rem" }}>
              {app.applicantName} {app.role} &middot; {app.email}
            </p>
          </div>
          
          {isProcessed ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "2px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: statusColor }} />
              <span style={{ color: "#ededed", fontSize: "0.875rem", fontWeight: 500 }}>{app.internalReviewStatus}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem", backgroundColor: "#1a1600", border: "1px solid #332b00", borderRadius: "2px" }}>
              <AlertCircle size={16} color="#d4af37" />
              <span style={{ color: "#d4af37", fontSize: "0.875rem", fontWeight: 500 }}>Processing...</span>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          <StatBox label="Stage" value={app.businessStage} />
          <StatBox label="Revenue" value={app.revenueRange} />
          <StatBox label="Team Size" value={app.teamSize} />
          <StatBox label="Model" value={app.businessModel} />
        </div>
      </header>

      {isProcessed ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "1.5rem" }}>Alignment Scorecard</h2>
            <div style={{ marginBottom: "2rem", padding: "2rem", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a", textAlign: "center" }}>
              <p style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.5rem" }}>Overall Alignment</p>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "4rem", color: app.overallAlignmentScore! >= 70 ? "#d4af37" : "#fff", lineHeight: 1 }}>{app.overallAlignmentScore}</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {scores.map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid #111" }}>
                  <span style={{ color: "#a0a0a0", fontSize: "0.875rem" }}>{s.label}</span>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.75rem" }}>Primary Constraint</h3>
              <div style={{ padding: "1.5rem", backgroundColor: "#0a0a0a", borderLeft: "2px solid #d4af37" }}>
                <p style={{ color: "#fff", fontSize: "1.125rem", marginBottom: "0.5rem" }}>{app.primaryConstraint}</p>
                <p style={{ color: "#a0a0a0", fontSize: "0.875rem", lineHeight: 1.6 }}>{app.primaryConstraintExplanation}</p>
              </div>
            </div>

            <div>
              <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.75rem" }}>Axis Pathway</h3>
              <p style={{ color: "#ededed", fontSize: "1rem" }}>{app.recommendedAxisPathway}</p>
            </div>
            
            <div>
              <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.75rem" }}>Strategic Insight</h3>
              <p style={{ color: "#a0a0a0", fontSize: "0.9rem", lineHeight: 1.6 }}>{app.strategicInsight}</p>
            </div>
            
            <div>
              <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "0.75rem" }}>Next Step</h3>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#111", border: "1px solid #222", borderRadius: "2px" }}>
                <CheckCircle2 size={16} color="#d4af37" />
                <span style={{ color: "#ededed", fontSize: "0.875rem" }}>{app.nextStepRecommendation}</span>
              </div>
            </div>
          </section>

          <section style={{ gridColumn: "1 / -1", marginTop: "1rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
            <h3 style={{ color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", marginBottom: "1rem" }}>Client Facing Summary (Generated)</h3>
            <div style={{ padding: "2rem", backgroundColor: "#050505", border: "1px solid #111", borderRadius: "2px" }}>
              <p style={{ color: "#a0a0a0", fontSize: "1rem", lineHeight: 1.6, fontStyle: "italic" }}>
                "{app.clientFacingSummary}"
              </p>
            </div>
          </section>
        </div>
      ) : (
        <div style={{ padding: "4rem", textAlign: "center", backgroundColor: "#0a0a0a", border: "1px dashed #1a1a1a" }}>
          <AlertTriangle size={32} color="#666" style={{ margin: "0 auto 1rem" }} />
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "#ededed", marginBottom: "0.5rem" }}>Processing...</h2>
          <p style={{ color: "#888", maxWidth: "400px", margin: "0 auto" }}>
            The AI diagnostic engine has not yet finished analyzing this application.
          </p>
        </div>
      )}
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
