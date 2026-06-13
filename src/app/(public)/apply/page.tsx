"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DiagnosticFlow from "./DiagnosticFlow";
import DeploymentFlow from "./DeploymentFlow";
import OperatorFlow from "./OperatorFlow";
import "./apply.css";

function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flowParam = searchParams.get("flow");
  
  const flow = flowParam === "diagnostic" || flowParam === "deployment" || flowParam === "operator" ? flowParam : "none";
  
  const [settings, setSettings] = useState({ diagnosticEnabled: true, deploymentEnabled: true, operatorEnabled: true });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error(err));
  }, []);

  const setFlow = (newFlow: "none" | "diagnostic" | "deployment" | "operator") => {
    if (newFlow === "none") {
      router.push("/apply");
    } else {
      router.push(`/apply?flow=${newFlow}`);
    }
  };

  return (
    <div className="axis-page__content">
      {flow === "none" && (
        <div className="apply-shell" style={{ maxWidth: "700px", margin: "4rem auto" }}>
          <div className="apply-header" style={{ textAlign: "center", borderBottom: "none", marginBottom: "0", paddingBottom: "2rem" }}>
            <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", color: "#ededed", marginBottom: "1rem" }}>
              Select Alignment Pathway
            </h1>
            <p style={{ color: "#888", fontSize: "1.125rem", lineHeight: 1.6 }}>
              Choose the appropriate Axis pathway based on your organization’s stage, needs, and alignment.
            </p>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {settings.diagnosticEnabled && (
              <button
                onClick={() => setFlow("diagnostic")}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "2.5rem",
                  width: "100%",
                  background: "#050505",
                  border: "1px solid #333", // Slightly stronger border for hierarchy
                  borderRadius: "4px",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#d4af37";
                  e.currentTarget.style.background = "#0a0a0a";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.background = "#050505";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#d4af37" }} />
                  <h3 style={{ fontSize: "1.25rem", color: "#ededed", letterSpacing: "0.05em", textTransform: "uppercase" }}>Axis Strategic Diagnostic</h3>
                </div>
                <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Used to identify structural constraints, evaluate growth readiness, and determine where Axis can be applied. Designed for organizations with existing revenue seeking structured scale.
                </p>
              </button>
            )}

            {settings.deploymentEnabled && (
              <button
                onClick={() => setFlow("deployment")}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "2.5rem",
                  width: "100%",
                  background: "#050505",
                  border: "1px solid #1a1a1a",
                  borderRadius: "4px",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#4a8fe8";
                  e.currentTarget.style.background = "#0a0a0a";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                  e.currentTarget.style.background = "#050505";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4a8fe8" }} />
                  <h3 style={{ fontSize: "1.25rem", color: "#ededed", letterSpacing: "0.05em", textTransform: "uppercase" }}>Axis Studio Infrastructure Request</h3>
                </div>
                <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Used for approved infrastructure deployment through Axis Studio. This pathway defines system requirements and initiates build operations after strategic alignment is confirmed.
                </p>
              </button>
            )}

            {false && settings.operatorEnabled && (
              <button
                onClick={() => setFlow("operator")}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "2.5rem",
                  width: "100%",
                  background: "#050505",
                  border: "1px solid #1a1a1a",
                  borderRadius: "4px",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#888"; // Muted neutral grey
                  e.currentTarget.style.background = "#0a0a0a";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                  e.currentTarget.style.background = "#050505";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#888" }} />
                  <h3 style={{ fontSize: "1.25rem", color: "#ededed", letterSpacing: "0.05em", textTransform: "uppercase" }}>Axis Operator Access</h3>
                </div>
                <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Apply for limited access to the Axis Operator System. Access is based on execution capability, active portfolio, professional standards, and alignment with Axis operating requirements.
                </p>
              </button>
            )}
          </div>
        </div>
      )}

      {flow === "diagnostic" && <DiagnosticFlow onBack={() => setFlow("none")} />}
      {flow === "deployment" && <DeploymentFlow onBack={() => setFlow("none")} />}
      {flow === "operator" && <OperatorFlow onBack={() => setFlow("none")} />}
      
      <Footer />
    </div>
  );
}

export default function ApplyAccessPage() {
  return (
    <main className="axis-page">
      <Navbar />
      <Suspense fallback={<div style={{ textAlign: "center", padding: "4rem" }}>Loading...</div>}>
        <ApplyContent />
      </Suspense>
    </main>
  );
}
