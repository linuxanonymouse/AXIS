"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Setup mode check
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);
  const [isSetupMode, setIsSetupMode] = useState(false);

  useEffect(() => {
    fetch("/api/auth/setup")
      .then((res) => res.json())
      .then((data) => {
        if (data.isSetupComplete === false) {
          setIsSetupMode(true);
        }
      })
      .catch((err) => console.error("Setup check error:", err))
      .finally(() => setIsCheckingSetup(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isSetupMode ? "/api/auth/setup" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingSetup) {
    return <div className="admin-login-screen">Loading...</div>;
  }

  return (
    <div className="admin-login-screen">
      <motion.div 
        className="admin-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <h1 className="login-title">AXIS CORE</h1>
          <p className="login-subtitle">
            {isSetupMode ? "INITIALIZE MASTER ACCESS" : "AUTHORIZED PERSONNEL ONLY"}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label>IDENTIFICATION</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@axis.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>ACCESS KEY</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "AUTHENTICATING..." : (isSetupMode ? "INITIALIZE" : "ACCESS")}
          </button>
        </form>
      </motion.div>

      <style jsx>{`
        .admin-login-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #050505;
          color: #fff;
          font-family: var(--font-sans);
          background-image: 
            linear-gradient(rgba(205, 164, 100, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(205, 164, 100, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .admin-login-card {
          width: 100%;
          max-width: 400px;
          padding: 3rem;
          background: rgba(10, 10, 10, 0.8);
          border: 1px solid rgba(205, 164, 100, 0.2);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
        }

        .login-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .login-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--gold);
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.2em;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: rgba(205, 164, 100, 0.8);
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }

        .form-group input {
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 1rem;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--gold);
          background: rgba(205, 164, 100, 0.05);
        }

        .login-error {
          background: rgba(255, 50, 50, 0.1);
          border-left: 3px solid #ff3333;
          padding: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          color: #ffcccc;
        }

        .login-btn {
          width: 100%;
          padding: 1rem;
          background: var(--gold);
          color: #000;
          border: none;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .login-btn:hover:not(:disabled) {
          background: #e5be7a;
          box-shadow: 0 0 20px rgba(205, 164, 100, 0.4);
        }

        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
