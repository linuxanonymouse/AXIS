"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./insights.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishDate: string;
  readingTime: number;
  featuredImage: string | null;
  shortAbstract: string;
  isFeatured: boolean;
};

type InsightsResponse = {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  categories: string[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function InsightsPage() {
  const [data, setData] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [briefEmail, setBriefEmail] = useState("");
  const [briefRole, setBriefRole] = useState("");
  const [briefCompany, setBriefCompany] = useState("");
  const [briefStatus, setBriefStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const fetchArticles = useCallback(async (cat: string | null, p: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: "9" });
      if (cat) params.set("category", cat);
      const res = await fetch(`/api/insights?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json: InsightsResponse = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(activeCategory, page);
  }, [fetchArticles, activeCategory, page]);

  function handleCategory(cat: string | null) {
    setActiveCategory(cat);
    setPage(1);
  }

  async function subscribeBriefs(e: React.FormEvent) {
    e.preventDefault();
    setBriefStatus("loading");
    try {
      const res = await fetch("/api/briefs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: briefEmail,
          role: briefRole || undefined,
          company: briefCompany || undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setBriefStatus("done");
      setBriefEmail("");
      setBriefRole("");
      setBriefCompany("");
    } catch {
      setBriefStatus("error");
    }
  }

  const featured = data?.articles.find((a) => a.isFeatured);
  const rest = data?.articles.filter((a) => !a.isFeatured || page > 1);

  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content">
        {/* Hero */}
        <section className="insights-hero">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="insights-eyebrow"
          >
            Strategic Doctrine
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="insights-title"
          >
            Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="insights-subtitle"
          >
            Doctrine, not noise. Structural thinking on growth, infrastructure, and
            organizational design.
          </motion.p>
        </section>

        {/* Content */}
        <section className="insights-content">
          {/* Category filter */}
          {data && data.categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="insights-filters"
            >
              <button
                className={`insights-filter ${activeCategory === null ? "insights-filter--active" : ""}`}
                onClick={() => handleCategory(null)}
              >
                All
              </button>
              {data.categories.map((cat) => (
                <button
                  key={cat}
                  className={`insights-filter ${activeCategory === cat ? "insights-filter--active" : ""}`}
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="insights-loading">
              <div className="insights-loading__bar" />
            </div>
          )}

          {/* Empty state */}
          {!loading && data && data.articles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="insights-empty"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <motion.span 
                  animate={{ opacity: [1, 0.3, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 12px rgba(205, 164, 100, 0.8)", display: "inline-block" }}
                />
                <p className="insights-empty__eyebrow" style={{ margin: 0 }}>Processing</p>
              </div>
              <p className="insights-empty__body" style={{ fontSize: "1.2rem", color: "var(--ivory)", marginBottom: "1rem" }}>
                Axis Insights engine is currently aggregating performance metrics and deployment histories.
              </p>
              <p className="insights-empty__body" style={{ fontSize: "0.95rem" }}>
                Check back later for public case studies and system documentation.
              </p>
              <div className="insights-empty__ctas" style={{ marginTop: "2rem" }}>
                <Link href="/diagnostic" className="axis-btn axis-btn--primary">
                  Start Strategic Diagnostic
                </Link>
                <Link href="/overview" className="axis-btn axis-btn--ghost">
                  Explore Axis
                </Link>
              </div>
            </motion.div>
          )}

          {/* Error state */}
          {!loading && !data && (
            <div className="insights-empty">
              <p className="insights-empty__body">
                Unable to load insights. Please try again.
              </p>
            </div>
          )}

          {/* Featured article */}
          {!loading && featured && page === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/insights/${featured.slug}`} className="insights-featured">
                <div className="insights-featured__corner insights-featured__corner--tl" aria-hidden />
                <div className="insights-featured__corner insights-featured__corner--tr" aria-hidden />
                <div className="insights-featured__corner insights-featured__corner--bl" aria-hidden />
                <div className="insights-featured__corner insights-featured__corner--br" aria-hidden />

                {featured.featuredImage && (
                  <div
                    className="insights-featured__image"
                    style={{ backgroundImage: `url(${featured.featuredImage})` }}
                    aria-hidden
                  />
                )}
                <div className="insights-featured__body">
                  <div className="insights-featured__meta">
                    <span className="insights-tag">{featured.category}</span>
                    <span className="insights-featured__badge">Featured</span>
                  </div>
                  <h2 className="insights-featured__title">{featured.title}</h2>
                  <p className="insights-featured__abstract">{featured.shortAbstract}</p>
                  <div className="insights-featured__footer">
                    <span className="insights-meta-item">{featured.author}</span>
                    <span className="insights-meta-sep">·</span>
                    <span className="insights-meta-item">{formatDate(featured.publishDate)}</span>
                    <span className="insights-meta-sep">·</span>
                    <span className="insights-meta-item">{featured.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Article grid */}
          {!loading && rest && rest.length > 0 && (
            <div className="insights-grid">
              {rest.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link href={`/insights/${article.slug}`} className="insights-card">
                    <div className="insights-card__corner insights-card__corner--tl" aria-hidden />
                    <div className="insights-card__corner insights-card__corner--tr" aria-hidden />

                    {article.featuredImage && (
                      <div
                        className="insights-card__image"
                        style={{ backgroundImage: `url(${article.featuredImage})` }}
                        aria-hidden
                      />
                    )}
                    <div className="insights-card__body">
                      <span className="insights-tag">{article.category}</span>
                      <h3 className="insights-card__title">{article.title}</h3>
                      <p className="insights-card__abstract">{article.shortAbstract}</p>
                      <div className="insights-card__footer">
                        <span className="insights-meta-item">{formatDate(article.publishDate)}</span>
                        <span className="insights-meta-sep">·</span>
                        <span className="insights-meta-item">{article.readingTime} min</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && data && data.pagination.totalPages > 1 && (
            <div className="insights-pagination">
              <button
                className="insights-page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="insights-page-info">
                {page} / {data.pagination.totalPages}
              </span>
              <button
                className="insights-page-btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={!data.pagination.hasMore}
              >
                Next
              </button>
            </div>
          )}
        </section>

        <section className="insights-briefs">
          <h2 className="insights-briefs__title">Receive Axis Briefs</h2>
          <p className="insights-briefs__body">
            Periodic doctrine, frameworks, and operating insights from Axis.
          </p>
          {briefStatus === "done" ? (
            <p className="insights-briefs__success">Subscribed. Axis Briefs will reach you selectively.</p>
          ) : (
            <form className="insights-briefs__form" onSubmit={subscribeBriefs} noValidate>
              <input
                type="email"
                className="insights-briefs__input"
                placeholder="Email address"
                value={briefEmail}
                onChange={(e) => setBriefEmail(e.target.value)}
                required
              />
              <input
                type="text"
                className="insights-briefs__input"
                placeholder="Role"
                value={briefRole}
                onChange={(e) => setBriefRole(e.target.value)}
              />
              <input
                type="text"
                className="insights-briefs__input"
                placeholder="Company (optional)"
                value={briefCompany}
                onChange={(e) => setBriefCompany(e.target.value)}
              />
              <button
                type="submit"
                className="axis-btn axis-btn--primary"
                disabled={briefStatus === "loading"}
              >
                {briefStatus === "loading" ? "Subscribing…" : "Subscribe to Axis Briefs"}
              </button>
              {briefStatus === "error" && (
                <p className="insights-briefs__error">Unable to subscribe. Please try again.</p>
              )}
            </form>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
