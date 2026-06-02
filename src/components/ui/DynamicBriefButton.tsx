"use client";

import { useEffect, useState } from "react";
import { getBriefUrlAction } from "@/app/actions/settings";

export default function DynamicBriefButton({ 
  divisionKey, 
  label = "View Division Brief", 
  className = "hero-btn-secondary" 
}: { 
  divisionKey: string; 
  label?: string;
  className?: string;
}) {
  const [url, setUrl] = useState<string>("#");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBriefUrlAction(divisionKey).then((fetchedUrl) => {
      if (fetchedUrl) {
        setUrl(fetchedUrl);
      } else {
        const slug = divisionKey.replace('_brief_url', '');
        setUrl(`/brief/${slug}`);
      }
      setLoading(false);
    }).catch(() => {
      const slug = divisionKey.replace('_brief_url', '');
      setUrl(`/brief/${slug}`);
      setLoading(false);
    });
  }, [divisionKey]);

  return (
    <a 
      href={url} 
      target={url !== "#" ? "_blank" : undefined}
      rel={url !== "#" ? "noopener noreferrer" : undefined}
      className={className}
      style={{ opacity: loading ? 0.7 : 1, pointerEvents: loading ? 'none' : 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
    >
      {loading ? "Loading..." : label}
    </a>
  );
}
