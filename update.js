const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/apply/DiagnosticFlow.tsx', 'utf8');

const replacements = [
  {
    find: '<input className={\pply-input \\} placeholder=\"e.g. Partially, fully synced, completely siloed\" value={form.toolsIntegrated} onChange={(e) => set(\"toolsIntegrated\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.toolsIntegrated} onChange={(e) => set(\"toolsIntegrated\", e.target.value)}><option value=\"\" disabled>Select Integration Level...</option><option value=\"Fully Integrated\">Fully Integrated</option><option value=\"Partially Integrated\">Partially Integrated</option><option value=\"Siloed\">Siloed</option><option value=\"None\">None</option></select>\
  },
  {
    find: '<input className={\pply-input \\} placeholder=\"e.g. Mostly manual, highly automated\" value={form.automationLevel} onChange={(e) => set(\"automationLevel\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.automationLevel} onChange={(e) => set(\"automationLevel\", e.target.value)}><option value=\"\" disabled>Select Automation Level...</option><option value=\"Highly Automated\">Highly Automated</option><option value=\"Partially Automated\">Partially Automated</option><option value=\"Mostly Manual\">Mostly Manual</option></select>\
  },
  {
    find: '<input className={\pply-input \\} placeholder=\"e.g. Yes via dashboard, loosely via spreadsheets\" value={form.kpiTracking} onChange={(e) => set(\"kpiTracking\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.kpiTracking} onChange={(e) => set(\"kpiTracking\", e.target.value)}><option value=\"\" disabled>Select KPI Tracking...</option><option value=\"Real-time Dashboards\">Real-time Dashboards</option><option value=\"Spreadsheets\">Spreadsheets</option><option value=\"Inconsistent\">Inconsistent</option><option value=\"None\">None</option></select>\
  },
  {
    find: '<input className={\pply-input \\} placeholder=\"e.g. Weekly automated reports, none\" value={form.reportingSystem} onChange={(e) => set(\"reportingSystem\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.reportingSystem} onChange={(e) => set(\"reportingSystem\", e.target.value)}><option value=\"\" disabled>Select Reporting System...</option><option value=\"Automated & Structured\">Automated & Structured</option><option value=\"Manual & Structured\">Manual & Structured</option><option value=\"Inconsistent\">Inconsistent</option><option value=\"None\">None</option></select>\
  },
  {
    find: '<input className={\pply-input \\} placeholder=\"e.g. Data-driven, gut feeling, executive committee\" value={form.decisionMaking} onChange={(e) => set(\"decisionMaking\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.decisionMaking} onChange={(e) => set(\"decisionMaking\", e.target.value)}><option value=\"\" disabled>Select Decision Making...</option><option value=\"Data-driven\">Data-driven</option><option value=\"Executive Committee\">Executive Committee</option><option value=\"Gut Feeling\">Gut Feeling</option></select>\
  },
  {
    find: '<input className={\pply-input \\} placeholder=\"e.g. Daily, Sporadic, None\" value={form.contentConsistency} onChange={(e) => set(\"contentConsistency\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.contentConsistency} onChange={(e) => set(\"contentConsistency\", e.target.value)}><option value=\"\" disabled>Select Consistency...</option><option value=\"Daily\">Daily</option><option value=\"Weekly\">Weekly</option><option value=\"Sporadic\">Sporadic</option><option value=\"None\">None</option></select>\
  },
  {
    find: '<input className={\pply-input \\} placeholder=\"Yes/No\" value={form.offerDefined} onChange={(e) => set(\"offerDefined\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.offerDefined} onChange={(e) => set(\"offerDefined\", e.target.value)}><option value=\"\" disabled>Select...</option><option value=\"Yes\">Yes</option><option value=\"No\">No</option></select>\
  },
  {
    find: '<input className={\pply-input \\} placeholder=\"Yes/No\" value={form.pricingOptimized} onChange={(e) => set(\"pricingOptimized\", e.target.value)} />',
    replace: \<select className={\\\pply-input \\\\} value={form.pricingOptimized} onChange={(e) => set(\"pricingOptimized\", e.target.value)}><option value=\"\" disabled>Select...</option><option value=\"Yes\">Yes</option><option value=\"No\">No</option></select>\
  }
];

replacements.forEach(r => {
  content = content.replace(r.find, r.replace);
});

fs.writeFileSync('src/app/(public)/apply/DiagnosticFlow.tsx', content);
