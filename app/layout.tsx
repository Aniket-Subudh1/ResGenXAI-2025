import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.resgenxai.co.in"),
  title: {
    default: "ResGenXAI 2025 - International Conference on Responsible, Generative and Explainable AI",
    template: "%s | ResGenXAI 2025"
  },
  description:
    "Join the International Conference on Responsible, Generative and Explainable AI (ResGenXAI) in Bhubaneswar, India. Featuring keynotes, workshops, and research presentations on AI ethics, generative models, and interpretability.",
  generator: "Next.js",
  applicationName: "ResGenXAI 2025 Conference",
  authors: [{ name: "ResGenXAI Organizing Committee", url: "https://www.resgenxai.co.in" }],
  keywords: [
    "AI conference", 
    "responsible AI", 
    "generative AI", 
    "explainable AI", 
    "Bhubaneswar", 
    "IEEE conference", 
    "AI ethics", 
    "AI research", 
    "machine learning conference", 
    "artificial intelligence symposium",
    "Centurion University",
    "CUTM",
    "Odisha AI conference"
  ],
  creator: "ResGenXAI 2025 Organizing Committee",
  publisher: "IEEE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "technology",
  openGraph: {
    type: "website",
    url: "https://www.resgenxai.co.in/",
    title: "ResGenXAI 2025 - International Conference on Responsible, Generative and Explainable AI",
    description: "International Conference on Responsible, Generative and Explainable AI, held September 10-12, 2025 in Bhubaneswar, Odisha. 671 submissions, 67 papers published in IEEE Xplore.",
    siteName: "ResGenXAI 2025",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "ResGenXAI 2025 Conference Logo",
      }
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResGenXAI 2025 - International Conference on Responsible, Generative and Explainable AI",
    description: "International Conference on Responsible, Generative and Explainable AI, held September 10-12, 2025 in Bhubaneswar, Odisha. 671 submissions, 67 papers published in IEEE Xplore.",
    images: ["/favicon.png"],
    creator: "@resgenxai",
    site: "@resgenxai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.resgenxai.co.in",
    languages: {
      'en': 'https://www.resgenxai.co.in',
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "ResGenXAI 2025 - International Conference on Responsible, Generative and Explainable AI",
  "description": "International Conference on Responsible, Generative and Explainable AI, featuring keynotes, workshops, and research presentations on AI ethics, generative models, and interpretability.",
  "startDate": "2025-09-10T09:00",
  "endDate": "2025-09-12T18:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Centurion University of Technology and Management",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jatni Campus",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "752050",
      "addressCountry": "IN"
    }
  },
  "image": ["https://www.resgenxai.co.in/favicon.png"],
  "organizer": {
    "@type": "Organization",
    "name": "Centurion University of Technology and Management",
    "url": "https://cutm.ac.in"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.resgenxai.co.in/",
    "availability": "https://schema.org/InStock"
  },
  "sponsor": {
    "@type": "Organization",
    "name": "IEEE",
    "url": "https://www.ieee.org"
  }
};

// JSON-LD structured data for organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ResGenXAI 2025",
  "url": "https://www.resgenxai.co.in",
  "logo": "https://www.resgenxai.co.in/favicon.png",
  "sameAs": ["https://www.cutm.ac.in"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7978029866",
    "contactType": "customer service",
    "email": "resgenxai2025@cutm.ac.in",
    "availableLanguage": "English"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://www.resgenxai.co.in" />
        <meta name="geo.region" content="IN-OD" />
        <meta name="geo.placename" content="Bhubaneswar" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ResGenXAI 2025" />
        
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans">
        {children}
        

      </body>
    </html>
  )
}