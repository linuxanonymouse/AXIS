"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../insights.css";
import "./article.css";

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
  articleBody: string;
  seoTitle: string | null;
  seoDescription: string | null;
  ctaModule: string | null;
  isFeatured: boolean;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/insights?slug=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setArticle(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content">
        {loading && (
          <div className="article-loading">
            <div className="insights-loading__bar" />
          </div>
        )}

        {notFound && !loading && (
          <div className="article-notfound">
            <p className="insights-empty__eyebrow">Article not found</p>
            <p className="insights-empty__body">
              This article may have been removed or the URL is incorrect.
            </p>
            <Link href="/insights" className="axis-btn axis-btn--ghost">
              Back to Insights
            </Link>
          </div>
        )}

        {article && !loading && (
          <article className="article-shell">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="article-back"
            >
              <Link href="/insights" className="article-back__link">
                ← Insights
              </Link>
            </motion.div>

            {/* Header */}
            <header className="article-header">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="article-header__meta"
              >
                <span className="insights-tag">{article.category}</span>
                <span className="insights-meta-sep">·</span>
                <span className="insights-meta-item">{article.readingTime} min read</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="article-title"
              >
                {article.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="article-abstract"
              >
                {article.shortAbstract}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="article-byline"
              >
                <span className="insights-meta-item">{article.author}</span>
                <span className="insights-meta-sep">·</span>
                <span className="insights-meta-item">{formatDate(article.publishDate)}</span>
              </motion.div>
            </header>

            {/* Featured image */}
            {article.featuredImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="article-image"
                style={{ backgroundImage: `url(${article.featuredImage})` }}
                role="img"
                aria-label={article.title}
              />
            )}

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.articleBody }}
            />

            {/* CTA module */}
            {article.ctaModule && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="article-cta-module"
              >
                <div className="article-cta-module__corner article-cta-module__corner--tl" aria-hidden />
                <div className="article-cta-module__corner article-cta-module__corner--tr" aria-hidden />
                <div className="article-cta-module__corner article-cta-module__corner--bl" aria-hidden />
                <div className="article-cta-module__corner article-cta-module__corner--br" aria-hidden />
                <p className="article-cta-module__eyebrow">Next Step</p>
                <p className="article-cta-module__text">{article.ctaModule}</p>
                <Link href="/diagnostic" className="axis-btn axis-btn--primary">
                  Start Strategic Diagnostic
                </Link>
              </motion.div>
            )}

            {/* Default CTA if no ctaModule */}
            {!article.ctaModule && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="article-cta-module"
              >
                <div className="article-cta-module__corner article-cta-module__corner--tl" aria-hidden />
                <div className="article-cta-module__corner article-cta-module__corner--tr" aria-hidden />
                <div className="article-cta-module__corner article-cta-module__corner--bl" aria-hidden />
                <div className="article-cta-module__corner article-cta-module__corner--br" aria-hidden />
                <p className="article-cta-module__eyebrow">Apply This Thinking</p>
                <p className="article-cta-module__text">
                  Axis evaluates organizations where revenue exists and growth is constrained.
                  Begin with the Strategic Diagnostic.
                </p>
                <div className="article-cta-module__actions">
                  <Link href="/diagnostic" className="axis-btn axis-btn--primary">
                    Start Strategic Diagnostic
                  </Link>
                  <Link href="/insights" className="axis-btn axis-btn--ghost">
                    More Insights
                  </Link>
                </div>
              </motion.div>
            )}
          </article>
        )}

        <Footer />
      </div>
    </main>
  );
}
