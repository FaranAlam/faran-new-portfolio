import { getDatabase } from '@/lib/db';

export default async function StructuredData() {
  let aggregateRating = null;
  let reviewItems: Array<{
    name: string;
    rating: number;
    comment?: string;
    createdAt?: Date;
  }> = [];

  try {
    const db = await getDatabase();
    const reviews = await db
      .collection('website_reviews')
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    const count = reviews.length;
    if (count > 0) {
      const ratingValue = reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / count;
      aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: Number(ratingValue.toFixed(1)),
        reviewCount: count,
        bestRating: 5,
        worstRating: 1,
      };

      reviewItems = reviews.map((review) => ({
        name: review.name || 'Website Visitor',
        rating: review.rating || 5,
        comment: review.comment || '',
        createdAt: review.createdAt,
      }));
    }
  } catch {
    aggregateRating = null;
    reviewItems = [];
  }

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
          url: "https://faran-new-portfolio.vercel.app/images/hero/story.jpg",
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
        ...(aggregateRating ? { aggregateRating } : {}),
        ...(reviewItems.length
          ? {
              review: reviewItems.map((review) => ({
                "@type": "Review",
                author: {
                  "@type": "Person",
                  name: review.name,
                },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: review.rating,
                  bestRating: 5,
                  worstRating: 1,
                },
                reviewBody: review.comment || 'Website review',
              })),
            }
          : {}),
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
