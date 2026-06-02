import Link from "next/link";
import { ArrowLeft, Download, ShieldAlert } from "lucide-react";
import "@/app/axis-ui.css";
import "@/app/globals.css";
import "./brief.css";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  return {
    title: `Axis ${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} - Confidential Brief`,
  };
};

export default function BriefingPage({ params }: { params: { slug: string } }) {
  const divisionName = params.slug.toUpperCase();
  
  // Simulated brief content mapping
  const contentMap: Record<string, string> = {
    operations: "Strategic Advisory framework and systemic organizational transformation protocols.",
    studio: "High-end narrative engineering and digital ecosystem construction methodologies.",
    intelligence: "Data harvesting, predictive modeling, and strategic analytics infrastructure.",
    media: "Distribution monopolies, algorithmic dominance, and audience capture systems.",
    ventures: "Capital allocation, equity scaling, and deep-tech incubation pipelines.",
  };

  const briefDescription = contentMap[params.slug.toLowerCase()] || "Classified division protocols and operational frameworks.";

  return (
    <main className="brief-main">
      <div className="brief-container">
        <div className="brief-header">
          <Link href={`/divisions/${params.slug}`} className="back-link">
            <ArrowLeft size={16} /> RETURN TO {divisionName}
          </Link>
          <div className="classification-badge">
            <ShieldAlert size={14} /> RESTRICTED ACCESS // LEVEL 4
          </div>
        </div>

        <div className="brief-content">
          <h1 className="brief-title">AXIS {divisionName}</h1>
          <h2 className="brief-subtitle">OPERATIONAL BRIEFING DOCUMENT</h2>
          
          <div className="brief-meta">
            <div className="meta-item">
              <span className="meta-label">STATUS</span>
              <span className="meta-value text-gold">ACTIVE</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">CLEARANCE</span>
              <span className="meta-value">CLIENT / CONFIDENTIAL</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">ID</span>
              <span className="meta-value">AX-{params.slug.substring(0, 3).toUpperCase()}-{new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="brief-body">
            <p className="brief-intro">
              This document outlines the core operational capabilities and strategic objectives of Axis {divisionName}.
              {briefDescription}
            </p>
            
            <div className="brief-redacted-block">
              <p>
                [REDACTED] Detailed implementation pipelines and proprietary methodologies are reserved for active partners. 
                The full {divisionName} briefing packet includes 45+ pages of case studies, technical architecture diagrams, 
                and kinetic deployment schedules.
              </p>
            </div>
          </div>

          <div className="brief-actions">
            <button className="download-btn disabled" disabled>
              <Download size={18} /> FULL BRIEF UNAVAILABLE (REQUIRES AUTHORIZATION)
            </button>
            <Link href="/apply" className="apply-btn">
              REQUEST FULL ACCESS
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
