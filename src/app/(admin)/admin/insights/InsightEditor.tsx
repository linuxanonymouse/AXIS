"use client";

import { useState } from "react";
import { saveInsightAction, deleteInsightAction } from "./actions";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

export default function InsightEditor({ initialData = null }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "",
    author: initialData?.author || "Axis Partner",
    readingTime: initialData?.readingTime || 5,
    featuredImage: initialData?.featuredImage || "",
    shortAbstract: initialData?.shortAbstract || "",
    articleBody: initialData?.articleBody || "",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    relatedSlugs: initialData?.relatedSlugs || "",
    ctaModule: initialData?.ctaModule || "",
    isFeatured: initialData?.isFeatured || false,
    status: initialData?.status || "DRAFT",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await saveInsightAction(formData);
  }

  async function handleDelete() {
    if (!formData.id) return;
    if (confirm("Are you sure you want to delete this doctrine article?")) {
      setLoading(true);
      await deleteInsightAction(formData.id);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#050505",
    border: "1px solid #1a1a1a",
    color: "#ededed",
    borderRadius: "2px",
    fontFamily: "var(--font-geist-sans)",
    fontSize: "0.875rem"
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/admin/insights" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#888", textDecoration: "none", marginBottom: "2rem", fontSize: "0.875rem" }}>
        <ArrowLeft size={16} /> Back to Insights
      </Link>
      
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 400, color: "#ededed", marginBottom: "0.25rem" }}>
            {formData.id ? "Edit Doctrine" : "New Doctrine"}
          </h1>
        </div>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          {formData.id && (
            <button onClick={handleDelete} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "transparent", color: "#ef4444", padding: "0.75rem 1.5rem", borderRadius: "2px", border: "1px solid #3f1515", cursor: "pointer" }}>
              <Trash2 size={16} /> Delete
            </button>
          )}
          <button onClick={handleSubmit} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#ededed", color: "#000", padding: "0.75rem 1.5rem", borderRadius: "2px", border: "none", cursor: "pointer", fontWeight: 500 }}>
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "4rem" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Title</label>
            <input required style={inputStyle} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Article title" />
          </div>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Slug</label>
            <input required style={inputStyle} value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="article-slug" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Category</label>
            <input required style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Infrastructure" />
          </div>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Author</label>
            <input required style={inputStyle} value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
          </div>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Read Time (min)</label>
            <input type="number" required style={inputStyle} value={formData.readingTime} onChange={e => setFormData({...formData, readingTime: Number(e.target.value)})} />
          </div>
        </div>

        <div>
          <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Featured Image URL</label>
          <input style={inputStyle} value={formData.featuredImage} onChange={e => setFormData({...formData, featuredImage: e.target.value})} placeholder="https://..." />
        </div>

        <div>
          <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Short Abstract</label>
          <textarea required style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={formData.shortAbstract} onChange={e => setFormData({...formData, shortAbstract: e.target.value})} />
        </div>

        <div>
          <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Article Body (Markdown/HTML)</label>
          <textarea required style={{ ...inputStyle, minHeight: "400px", resize: "vertical", fontFamily: "monospace" }} value={formData.articleBody} onChange={e => setFormData({...formData, articleBody: e.target.value})} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>SEO Title</label>
            <input style={inputStyle} value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} />
          </div>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Status</label>
            <select style={inputStyle} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
          <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} style={{ width: "16px", height: "16px" }} />
          <label htmlFor="isFeatured" style={{ color: "#ededed", fontSize: "0.875rem" }}>Mark as Featured Article</label>
        </div>

      </form>
    </div>
  );
}
