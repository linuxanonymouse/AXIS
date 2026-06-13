"use client";

import { useState } from "react";
import { Link2, Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function OperatorTokensPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setGeneratedLink("");

    try {
      const res = await fetch("/api/admin/operators/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate token");

      setSuccess(true);
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      setGeneratedLink(`${origin}/apply?flow=operator&token=${data.token.token}`);
      setEmail("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#ededed", marginBottom: "2rem" }}>
        Generate Operator Access Token
      </h1>
      <p style={{ color: "#888", marginBottom: "2rem" }}>
        Enter a client's email address below. The system will securely generate a single-use token and automatically dispatch an invitation email to them.
      </p>

      <div style={{ background: "#050505", border: "1px solid #1a1a1a", padding: "2rem", borderRadius: "8px", maxWidth: "600px" }}>
        <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#aaa" }}>Client Email</label>
            <div style={{ position: "relative" }}>
              <Mail style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#555" }} size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                style={{
                  width: "100%",
                  background: "#000",
                  border: "1px solid #333",
                  color: "#fff",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  borderRadius: "4px",
                  outline: "none"
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#ededed",
              color: "#000",
              border: "none",
              padding: "0.75rem",
              borderRadius: "4px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "0.5rem"
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Generate & Send Token"}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(255,0,0,0.1)", color: "#ff4444", borderRadius: "4px", border: "1px solid rgba(255,0,0,0.2)" }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(0,255,0,0.05)", border: "1px solid rgba(0,255,0,0.1)", borderRadius: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80", marginBottom: "0.5rem" }}>
              <CheckCircle2 size={18} />
              <span style={{ fontWeight: 500 }}>Token Generated & Email Sent</span>
            </div>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              The client has been notified. You can also manually copy the secure link below:
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#000", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333" }}>
              <Link2 size={14} color="#555" />
              <input 
                type="text" 
                readOnly 
                value={generatedLink}
                style={{ background: "transparent", border: "none", color: "#aaa", width: "100%", outline: "none", fontSize: "0.85rem" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
