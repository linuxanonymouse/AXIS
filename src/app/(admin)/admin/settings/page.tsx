"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type SystemSettings = {
  diagnosticEnabled: boolean;
  deploymentEnabled: boolean;
  operatorEnabled: boolean;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Add cache bursting to prevent NextJS from caching the initial load on client side
    fetch(`/api/admin/settings?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings", err));
  }, []);

  const handleToggle = (key: keyof SystemSettings) => {
    if (!settings) return;
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    
    setSaving(true);
    fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .finally(() => setSaving(false));
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", marginBottom: "0.5rem" }}>
          System Settings
        </h1>
        <p style={{ color: "#a0a0a0", fontSize: "1rem" }}>
          Global toggles and control overrides for Axis operations.
        </p>
      </header>

      {settings ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <div className="admin-card" style={{ 
            padding: "1.5rem 2rem", border: "1px solid #1a1a1a", borderRadius: "2px", 
            backgroundColor: "#050505", display: "flex", justifyContent: "space-between",
            alignItems: "center", transition: "border-color 0.3s ease"
          }}>
            <div>
              <h3 style={{ fontSize: "1.125rem", color: "#ededed", fontFamily: "var(--font-cormorant)", marginBottom: "0.25rem" }}>Strategic Diagnostic Form</h3>
              <p style={{ fontSize: "0.875rem", color: "#666" }}>Controls access to the `/apply` diagnostic path.</p>
            </div>
            <button
              onClick={() => handleToggle("diagnosticEnabled")}
              disabled={saving}
              style={{
                padding: "0.75rem 1.5rem",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                borderRadius: "2px",
                border: settings.diagnosticEnabled ? "1px solid #d4af37" : "1px solid #333",
                backgroundColor: settings.diagnosticEnabled ? "rgba(212, 175, 55, 0.1)" : "#111",
                color: settings.diagnosticEnabled ? "#d4af37" : "#666",
                cursor: saving ? "wait" : "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {settings.diagnosticEnabled ? "Active" : "Disabled"}
            </button>
          </div>

          <div className="admin-card" style={{ 
            padding: "1.5rem 2rem", border: "1px solid #1a1a1a", borderRadius: "2px", 
            backgroundColor: "#050505", display: "flex", justifyContent: "space-between",
            alignItems: "center", transition: "border-color 0.3s ease"
          }}>
            <div>
              <h3 style={{ fontSize: "1.125rem", color: "#ededed", fontFamily: "var(--font-cormorant)", marginBottom: "0.25rem" }}>Deployment Request Form</h3>
              <p style={{ fontSize: "0.875rem", color: "#666" }}>Controls access to the `/apply` deployment path.</p>
            </div>
            <button
              onClick={() => handleToggle("deploymentEnabled")}
              disabled={saving}
              style={{
                padding: "0.75rem 1.5rem",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                borderRadius: "2px",
                border: settings.deploymentEnabled ? "1px solid #d4af37" : "1px solid #333",
                backgroundColor: settings.deploymentEnabled ? "rgba(212, 175, 55, 0.1)" : "#111",
                color: settings.deploymentEnabled ? "#d4af37" : "#666",
                cursor: saving ? "wait" : "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {settings.deploymentEnabled ? "Active" : "Disabled"}
            </button>
          </div>

          <div className="admin-card" style={{ 
            padding: "1.5rem 2rem", border: "1px solid #1a1a1a", borderRadius: "2px", 
            backgroundColor: "#050505", display: "flex", justifyContent: "space-between",
            alignItems: "center", transition: "border-color 0.3s ease"
          }}>
            <div>
              <h3 style={{ fontSize: "1.125rem", color: "#ededed", fontFamily: "var(--font-cormorant)", marginBottom: "0.25rem" }}>Operator Application Form</h3>
              <p style={{ fontSize: "0.875rem", color: "#666" }}>Controls access to the `/apply` operator path.</p>
            </div>
            <button
              onClick={() => handleToggle("operatorEnabled")}
              disabled={saving}
              style={{
                padding: "0.75rem 1.5rem",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                borderRadius: "2px",
                border: settings.operatorEnabled ? "1px solid #d4af37" : "1px solid #333",
                backgroundColor: settings.operatorEnabled ? "rgba(212, 175, 55, 0.1)" : "#111",
                color: settings.operatorEnabled ? "#d4af37" : "#666",
                cursor: saving ? "wait" : "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {settings.operatorEnabled ? "Active" : "Disabled"}
            </button>
          </div>
          
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ height: "100px", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "2px" }} />
          <div style={{ height: "100px", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "2px" }} />
          <div style={{ height: "100px", backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "2px" }} />
        </div>
      )}
    </div>
  );
}

