import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Author Guidelines | ResGenXAI 2025",
  description: "Comprehensive instructions for preparing and submitting your research paper to ResGenXAI 2025. IEEE formatting requirements, submission process, and publication guidelines.",
  keywords: [
    "author guidelines", 
    "paper formatting", 
    "IEEE conference template", 
    "paper submission process", 
    "camera-ready submission", 
    "IEEE PDF Express", 
    "plagiarism policy",
    "AI conference paper guidelines",
    "paper length requirements",
    "IEEE formatting guidelines",
    "IEEE copyright form"
  ],
  openGraph: {
    title: "Author Guidelines | ResGenXAI 2025",
    description: "Historical reference: Instructions used for preparing and submitting research papers to ResGenXAI 2025. IEEE formatting requirements, submission process, and publication guidelines.",
    url: "https://www.resgenxai.co.in/authorguidelines",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "ResGenXAI 2025 Author Guidelines",
      }
    ],
  },
  alternates: {
    canonical: "https://www.resgenxai.co.in/authorguidelines",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Author Guidelines for ResGenXAI 2025",
  "description": "Step-by-step guidelines for preparing and submitting research papers to the ResGenXAI 2025 conference.",
  "totalTime": "PT2H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Prepare Your Manuscript",
      "text": "Authors must use the IEEE conference templates to ensure correct formatting. Templates are available in both LaTeX and Microsoft Word formats for U.S. Letter Size.",
      "url": "https://www.ieee.org/conferences/publishing/templates"
    },
    {
      "@type": "HowToStep",
      "name": "Format Your Paper",
      "text": "The paper should be up to 6 pages in length, including figures, tables, and references. Use 10-point Times New Roman font, double-column, single-spaced."
    },
    {
      "@type": "HowToStep",
      "name": "Paper Submission (Historical)",
      "text": "Papers were submitted through the Microsoft CMT system in PDF format following IEEE formatting guidelines. The conference has concluded and proceedings are now available on IEEE Xplore.",
      "url": "https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FResGenXAI2025"
    },
    {
      "@type": "HowToStep",
      "name": "Prepare Camera-Ready Version",
      "text": "After acceptance, prepare your final camera-ready paper incorporating reviewer feedback and using IEEE PDF eXpress to ensure compatibility with IEEE Xplore.",
      "url": "https://ieee-pdf-express.org"
    },
    {
      "@type": "HowToStep",
      "name": "Complete Copyright Form",
      "text": "Submit the IEEE copyright form through the IEEE Electronic Copyright Form (eCF) service."
    },
    {
      "@type": "HowToStep",
      "name": "Register for the Conference",
      "text": "At least one author must register for the conference at the full member or non-member rate for the paper to be included in the proceedings."
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "IEEE Paper Templates"
    },
    {
      "@type": "HowToTool",
      "name": "Microsoft CMT Submission System"
    },
    {
      "@type": "HowToTool",
      "name": "IEEE PDF eXpress"
    }
  ]
};

export default function AuthorGuidelinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}