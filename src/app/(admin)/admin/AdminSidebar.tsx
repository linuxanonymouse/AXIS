"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside style={{ width: "260px", backgroundColor: "#0a0a0a", borderRight: "1px solid #1a1a1a", padding: "2.5rem 2rem", display: "flex", flexDirection: "column" }}>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", marginBottom: "3rem", color: "#d4af37", letterSpacing: "0.05em" }}>
        AXIS <span style={{ color: "#fff", fontWeight: 300 }}>Admin</span>
      </h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        <Link href="/admin" className="admin-nav-link" style={navLinkStyle}>
          <LayoutDashboard size={18} strokeWidth={1.5} /> Dashboard
        </Link>
        <Link href="/admin/applications" className="admin-nav-link" style={navLinkStyle}>
          <FileText size={18} strokeWidth={1.5} /> Diagnostic Output
        </Link>
        <Link href="/admin/insights" className="admin-nav-link" style={navLinkStyle}>
          <FileText size={18} strokeWidth={1.5} /> Insights CMS
        </Link>
        <Link href="/admin/settings" className="admin-nav-link" style={navLinkStyle}>
          <LayoutDashboard size={18} strokeWidth={1.5} /> Settings
        </Link>
      </nav>
      <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid #1a1a1a" }}>
        <button 
          onClick={handleLogout}
          style={{ ...navLinkStyle, width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", marginBottom: "1rem" }}
        >
          <LogOut size={18} strokeWidth={1.5} /> Log Out
        </button>
        <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>System Status: <span style={{ color: "#d4af37" }}>Online</span></p>
      </div>
    </aside>
  );
}

const navLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  color: "#a0a0a0",
  textDecoration: "none",
  padding: "0.75rem 1rem",
  borderRadius: "4px",
  fontSize: "0.9rem",
  transition: "all 0.3s ease",
};
