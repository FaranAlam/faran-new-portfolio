export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://faran-new-portfolio.vercel.app/#person",
        name: "Faran Alam",
        url: "https://faran-new-portfolio.vercel.app",
        image: {
          "@type": "ImageObject",
          url: "https://faran-new-portfolio.vercel.app/images/hero/story2.jpg",
          width: 800,
          height: 600
        },
        jobTitle: "Full Stack Developer",
        description: "Computer Engineering student at IIUI and certified Full Stack Developer specializing in React, Next.js, and Node.js",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "International Islamic University Islamabad (IIUI)",
          sameAs: "https://www.iiu.edu.pk"
        },
        knowsAbout: [
          "Full Stack Development",
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "Web Development",
          "UI/UX Design",
          "Database Design",
          "API Development"
        ],
        sameAs: [
          "https://github.com/faranalam",
          "https://linkedin.com/in/faranalam"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://faran-new-portfolio.vercel.app/#website",
        url: "https://faran-new-portfolio.vercel.app",
        name: "Faran Alam Portfolio",
        description: "Professional portfolio of Faran Alam - Full Stack Developer and Computer Engineer",
        publisher: {
          "@id": "https://faran-new-portfolio.vercel.app/#person"
        },
        inLanguage: "en-US"
      },
      {
        "@type": "WebPage",
        "@id": "https://faran-new-portfolio.vercel.app/#webpage",
        url: "https://faran-new-portfolio.vercel.app",
        name: "Faran Alam - Full Stack Developer & Computer Engineer | IIUI",
        description: "Computer Engineering student at IIUI and certified Full Stack Developer. Building innovative digital solutions with React, Next.js, and modern web technologies.",
        isPartOf: {
          "@id": "https://faran-new-portfolio.vercel.app/#website"
        },
        about: {
          "@id": "https://faran-new-portfolio.vercel.app/#person"
        },
        inLanguage: "en-US"
      },
      {
        "@type": "ProfessionalService",
        name: "Faran Alam - Web Development Services",
        description: "Professional full-stack web development services including React, Next.js, Node.js, and modern web applications",
        provider: {
          "@id": "https://faran-new-portfolio.vercel.app/#person"
        },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full Stack Web Development",
                description: "Complete web application development with modern technologies"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Frontend Development",
                description: "React, Next.js, and modern frontend development"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Backend Development",
                description: "Node.js, API development, and database design"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
