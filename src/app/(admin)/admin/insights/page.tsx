import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function InsightsAdminPage() {
  const articles = await prisma.insightArticle.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#ededed", marginBottom: "0.5rem" }}>
            Insights CMS
          </h1>
          <p style={{ color: "#a0a0a0", fontSize: "1rem" }}>
            Manage Axis Strategic Doctrine publications.
          </p>
        </div>
        
        <Link href="/admin/insights/new" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#ededed", color: "#000", padding: "0.75rem 1.5rem", borderRadius: "2px", textDecoration: "none", fontWeight: 500, fontSize: "0.875rem" }}>
          <Plus size={16} /> New Article
        </Link>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {articles.map((article) => (
          <Link key={article.id} href={`/admin/insights/${article.id}`} style={{ textDecoration: "none" }}>
            <div className="admin-card" style={{ 
              padding: "1.5rem 2rem", 
              border: "1px solid #1a1a1a", 
              borderRadius: "2px", 
              backgroundColor: "#0a0a0a",
              display: "grid",
              gridTemplateColumns: "3fr 1fr 1fr 1fr auto",
              alignItems: "center",
              gap: "2rem",
              transition: "border-color 0.3s ease"
            }}>
              <div>
                <h3 style={{ fontSize: "1.125rem", color: "#ededed", marginBottom: "0.25rem", fontFamily: "var(--font-cormorant)" }}>{article.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#666" }}>/{article.slug}</p>
              </div>
              
              <div>
                <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Category</p>
                <p style={{ fontSize: "0.875rem", color: "#a0a0a0" }}>{article.category}</p>
              </div>

              <div>
                <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Status</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: article.status === "PUBLISHED" ? "#22c55e" : "#666" }} />
                  <span style={{ fontSize: "0.875rem", color: "#a0a0a0" }}>{article.status}</span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Featured</p>
                <p style={{ fontSize: "0.875rem", color: article.isFeatured ? "#d4af37" : "#666" }}>
                  {article.isFeatured ? "Yes" : "No"}
                </p>
              </div>

              <div style={{ color: "#444", fontSize: "0.875rem" }}>
                Edit &rarr;
              </div>
            </div>
          </Link>
        ))}

        {articles.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", border: "1px dashed #1a1a1a" }}>
            <p style={{ color: "#666", fontFamily: "var(--font-cormorant)", fontSize: "1.25rem" }}>No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
