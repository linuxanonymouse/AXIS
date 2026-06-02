import AdminSidebar from "./AdminSidebar";
import "../../axis-ui.css";
import "../../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#050505", color: "#ededed", fontFamily: "var(--font-geist-sans)" }}>
      <AdminSidebar />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "3rem 4rem", overflowY: "auto", backgroundColor: "#000" }}>
        {children}
      </main>
    </div>
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
