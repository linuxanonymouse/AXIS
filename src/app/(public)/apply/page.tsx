"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DiagnosticFlow from "./DiagnosticFlow";
import DeploymentFlow from "./DeploymentFlow";
import OperatorFlow from "./OperatorFlow";
import "./apply.css";

export default function ApplyAccessPage() {
  const [flow, setFlow] = useState<"none" | "diagnostic" | "deployment" | "operator">("none");
  const [settings, setSettings] = useState({ diagnosticEnabled: true, deploymentEnabled: true, operatorEnabled: true });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content">
        {flow === "none" && (
          <div className="apply-shell" style={{ maxWidth: "700px", margin: "4rem auto" }}>
            <div className="apply-header" style={{ textAlign: "center", borderBottom: "none", marginBottom: "0", paddingBottom: "2rem" }}>
              <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", color: "#ededed", marginBottom: "1rem" }}>
                Select Intake Pathway
              </h1>
              <p style={{ color: "#888", fontSize: "1.125rem", lineHeight: 1.6 }}>
                Choose the appropriate operational track for your organization.
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
                    border: "1px solid #1a1a1a",
                    borderRadius: "4px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#d4af37";
                    e.currentTarget.style.background = "#0a0a0a";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.background = "#050505";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#d4af37" }} />
                    <h3 style={{ fontSize: "1.25rem", color: "#ededed", letterSpacing: "0.05em", textTransform: "uppercase" }}>Axis Strategic Diagnostic</h3>
                  </div>
                  <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    This diagnostic is used to identify structural constraints within your organization and determine where Axis is applied. Designed for organizations operating with existing revenue seeking structured scale.
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
                    <h3 style={{ fontSize: "1.25rem", color: "#ededed", letterSpacing: "0.05em", textTransform: "uppercase" }}>Axis Studio Deployment Request</h3>
                  </div>
                  <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    Submit a structured deployment request for Axis Studio execution. Used to define system requirements and initiate build operations.
                  </p>
                </button>
              )}

              {settings.operatorEnabled && (
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
                    e.currentTarget.style.borderColor = "#2ecc71";
                    e.currentTarget.style.background = "#0a0a0a";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.background = "#050505";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2ecc71" }} />
                    <h3 style={{ fontSize: "1.25rem", color: "#ededed", letterSpacing: "0.05em", textTransform: "uppercase" }}>Axis Operator Application</h3>
                  </div>
                  <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    Apply to the Axis Studio Operator System. Limited access based on experience, active client portfolio, and professional alignment.
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
    </main>
  );
}
