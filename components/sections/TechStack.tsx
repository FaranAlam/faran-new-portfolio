"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icon Components
const HTML5Icon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm8 14h2v2H11v-2zm3-7h-2V8h2v2zm-3 0H9V8h2v2z"/></svg>;
const CSS3Icon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 3h17l-1.5 18.5L12 22l-7 -1.5L3.5 3zm10 4h-6v10h6V7zm-3 2h2v6h-2v-6z"/></svg>;
const JavaScriptIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">JS</text></svg>;
const ReactIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" style={{strokeDasharray: '6 6'}}/></svg>;
const NextjsIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>;
const TailwindIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 8h6v2h-6v-2zm0 4h6v2h-6v-2zm-2-4h2v2h-2v-2zm0 4h2v2h-2v-2z"/></svg>;
const TypeScriptIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">TS</text></svg>;
const NodejsIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M11.5 1.5l-9 5.196v10.368l9 5.196 9-5.196V6.696l-9-5.196zm0 3.332L17.868 8.8v6.4L11.5 18.632 5.132 15.2V8.8l6.368-3.668z"/></svg>;
const ExpressIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2"/></svg>;
const MongodbIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/></svg>;
const PostgreSQLIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="1.5"/><circle cx="17" cy="17" r="1.5"/><circle cx="7" cy="17" r="1.5"/></svg>;
const RedisIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/></svg>;
const GraphQLIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 21,7 18,18 6,18 3,7"/></svg>;
const GitIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="1"/><circle cx="7" cy="7" r="1"/><circle cx="17" cy="7" r="1"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg>;
const DockerIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="4" y="8" width="4" height="8" fill="currentColor"/><rect x="10" y="8" width="4" height="8" fill="currentColor"/><rect x="16" y="8" width="2" height="8" fill="currentColor"/></svg>;
const VSCodeIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6.45L17.28 2l3.72 1.87v16.26l-3.72 1.87L2 17.55V6.45z"/></svg>;
const GitHubIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.89 1.529 2.341 1.544 2.914 1.184.092-.923.349-1.544.635-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>;
const PostmanIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor"/></svg>;
const VercelIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,20 2,20"/></svg>;
const FigmaIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><circle cx="8" cy="16" r="4"/><circle cx="16" cy="16" r="4"/></svg>;
const CanvaIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>;
const FramerMotionIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="6" r="1.5"/><circle cx="12" cy="6" r="1.5"/><circle cx="18" cy="6" r="1.5"/><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/><circle cx="6" cy="18" r="1.5"/><circle cx="12" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/></svg>;
const SEOIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>;
const ResponsiveIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="20" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="7" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>;
const PerformanceIcon = () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2l4.5 9H22l-7.5.5.5 8 -6-6.5-3 7 -1.5-4H2L13 2z"/></svg>;

export default function TechStack() {
  const technologies = {
    "Frontend": [
      { name: "HTML5", icon: HTML5Icon, color: "bg-orange-100 text-orange-600 border-orange-200" },
      { name: "CSS3", icon: CSS3Icon, color: "bg-blue-100 text-blue-600 border-blue-200" },
      { name: "JavaScript", icon: JavaScriptIcon, color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
      { name: "React.js", icon: ReactIcon, color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
      { name: "Next.js", icon: NextjsIcon, color: "bg-gray-100 text-gray-900 border-gray-200" },
      { name: "Tailwind CSS", icon: TailwindIcon, color: "bg-teal-100 text-teal-600 border-teal-200" },
      { name: "TypeScript", icon: TypeScriptIcon, color: "bg-blue-100 text-blue-700 border-blue-300" },
    ],
    "Backend": [
      { name: "Node.js", icon: NodejsIcon, color: "bg-green-100 text-green-600 border-green-200" },
      { name: "Express.js", icon: ExpressIcon, color: "bg-gray-100 text-gray-700 border-gray-200" },
      { name: "MongoDB", icon: MongodbIcon, color: "bg-green-100 text-green-700 border-green-300" },
      { name: "PostgreSQL", icon: PostgreSQLIcon, color: "bg-blue-100 text-blue-600 border-blue-200" },
      { name: "Redis", icon: RedisIcon, color: "bg-red-100 text-red-600 border-red-200" },
      { name: "GraphQL", icon: GraphQLIcon, color: "bg-pink-100 text-pink-600 border-pink-200" },
    ],
    "Tools & DevOps": [
      { name: "Git", icon: GitIcon, color: "bg-red-100 text-red-600 border-red-200" },
      { name: "Docker", icon: DockerIcon, color: "bg-blue-100 text-blue-600 border-blue-200" },
      { name: "VS Code", icon: VSCodeIcon, color: "bg-blue-100 text-blue-700 border-blue-200" },
      { name: "GitHub", icon: GitHubIcon, color: "bg-gray-100 text-gray-900 border-gray-300" },
      { name: "Postman", icon: PostmanIcon, color: "bg-orange-100 text-orange-600 border-orange-200" },
      { name: "Vercel", icon: VercelIcon, color: "bg-pink-100 text-pink-600 border-pink-200" },
    ],
    "Design & Others": [
      { name: "Figma", icon: FigmaIcon, color: "bg-purple-100 text-purple-600 border-purple-200" },
      { name: "Canva", icon: CanvaIcon, color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
      { name: "Framer Motion", icon: FramerMotionIcon, color: "bg-pink-100 text-pink-600 border-pink-200" },
      { name: "SEO", icon: SEOIcon, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
      { name: "Responsive", icon: ResponsiveIcon, color: "bg-green-100 text-green-600 border-green-200" },
      { name: "Performance", icon: PerformanceIcon, color: "bg-red-100 text-red-600 border-red-200" },
    ]
  };

  return (
    <section id="tech-stack" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Technologies I Work With</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A comprehensive toolkit to build modern, scalable, and high-performance web applications
              </p>
            </div>
          </FadeIn>

          {/* Tech Categories */}
          <div className="space-y-12">
            {Object.entries(technologies).map(([category, techs], catIndex) => (
              <div key={catIndex}>
                <FadeIn delay={catIndex * 0.1}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                    {category}
                  </h3>
                </FadeIn>

                <StaggerContainer staggerDelay={0.05} className="flex flex-wrap gap-4">
                  {techs.map((tech, techIndex) => {
                    const IconComponent = tech.icon;
                    return (
                      <StaggerItem key={techIndex}>
                        <div className={`${tech.color} px-6 py-4 rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer`}>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <IconComponent />
                            </div>
                            <span className="font-semibold text-sm whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-gray-700 text-sm">Technologies</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
                <div className="text-gray-700 text-sm">Frameworks</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
                <div className="text-gray-700 text-sm">Tools</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">2+</div>
                <div className="text-gray-700 text-sm">Years Experience</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
