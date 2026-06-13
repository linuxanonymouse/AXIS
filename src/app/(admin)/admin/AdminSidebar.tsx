"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, FileText, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Header & Hamburger */}
      <div className="admin-mobile-header">
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", color: "#d4af37", margin: 0, letterSpacing: "0.05em" }}>
          AXIS <span style={{ color: "#fff", fontWeight: 300 }}>Admin</span>
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: "none", border: "none", color: "#fff", padding: "0.5rem" }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="admin-overlay admin-overlay--open" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isOpen ? "admin-sidebar--open" : ""}`}>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", marginBottom: "3rem", color: "#d4af37", letterSpacing: "0.05em", display: "none" }} className="admin-desktop-logo">
          AXIS <span style={{ color: "#fff", fontWeight: 300 }}>Admin</span>
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
          <Link href="/admin" onClick={() => setIsOpen(false)} className="admin-nav-link">
            <LayoutDashboard size={18} strokeWidth={1.5} /> Dashboard
          </Link>
          <Link href="/admin/applications" onClick={() => setIsOpen(false)} className="admin-nav-link">
            <FileText size={18} strokeWidth={1.5} /> Diagnostic Output
          </Link>
          <Link href="/admin/insights" onClick={() => setIsOpen(false)} className="admin-nav-link">
            <FileText size={18} strokeWidth={1.5} /> Insights CMS
          </Link>
          <Link href="/admin/operators/tokens" onClick={() => setIsOpen(false)} className="admin-nav-link">
            <Users size={18} strokeWidth={1.5} /> Operator Tokens
          </Link>
          <Link href="/admin/settings" onClick={() => setIsOpen(false)} className="admin-nav-link">
            <LayoutDashboard size={18} strokeWidth={1.5} /> Settings
          </Link>
        </nav>
        <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid #1a1a1a" }}>
          <button 
            onClick={handleLogout}
            className="admin-nav-link"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            <LogOut size={18} strokeWidth={1.5} /> Log Out
          </button>
          <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>System Status: <span style={{ color: "#d4af37" }}>Online</span></p>
        </div>
      </aside>
      <style jsx>{`
        @media (min-width: 768px) {
          .admin-desktop-logo { display: block !important; }
        }
      `}</style>
    </>
  );
}
