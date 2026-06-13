export const dynamic = 'force-dynamic';
import AdminSidebar from "./AdminSidebar";
import "../../axis-ui.css";
import "../../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
