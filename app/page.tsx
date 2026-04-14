import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import WhyChooseMe from "@/components/sections/WhyChooseMe";
import CaseStudies from "@/components/sections/CaseStudies";
import BeforeAfter from "@/components/sections/BeforeAfter";
import CodePreview from "@/components/sections/CodePreview";
import ProjectCards3D from "@/components/sections/ProjectCards3D";
import SkillAssessmentQuiz from "@/components/sections/SkillAssessmentQuiz";
import RateCalculator from "@/components/sections/RateCalculator";
import AIChat from "@/components/sections/AIChat";
import Process from "@/components/sections/Process";
import SkillsRadarChart from "@/components/sections/SkillsRadarChart";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import SuccessStats from "@/components/sections/SuccessStats";
import APIStatusDashboard from "@/components/sections/APIStatusDashboard";
import ClientBrands from "@/components/sections/ClientBrands";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Portfolio from "@/components/sections/Portfolio";
import Academy from "@/components/sections/Academy";
import FreeResources from "@/components/sections/FreeResources";
import Pricing from "@/components/sections/Pricing";
import BookConsultation from "@/components/sections/BookConsultation";
import FAQ from "@/components/sections/FAQ";
import BlogPreview from "@/components/sections/BlogPreview";
import Reviews from "@/components/sections/Reviews";
import Newsletter from "@/components/sections/Newsletter";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import StructuredData from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <About />
      <Skills />
      <CodePreview />
      <SkillsRadarChart />
      <TechStack />
      <Services />
      <WhyChooseMe />
      <CaseStudies />
      <BeforeAfter />
      <ProjectCards3D />
      <SkillAssessmentQuiz />
      <RateCalculator />
      <APIStatusDashboard />
      <Process />
      <Experience />
      <Achievements />
      <SuccessStats />
      <ClientBrands />
      <Education />
      <Certifications />
      <Portfolio />
      <Academy />
      <FreeResources />
      <Pricing />
      <BookConsultation />
      <FAQ />
      <BlogPreview />
      <Reviews />
      <Newsletter />
      <CTA />
      <Contact />
      <AIChat />
      <FloatingWhatsApp />
    </>
  );
}
