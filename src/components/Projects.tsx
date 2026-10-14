import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { getOptimizedImageUrl, assets } from '../lib/cloudinary';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
interface ProjectData {
  number: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tag: 'residential' | 'commercial' | 'development';
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Map progress to scale: big (1.15) at start/end, stable normal size (1.0) in the middle 50%
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [1.15, 1.0, 1.0, 1.15]);
  
  // Map progress to 3D rotation: tilts back when entering, flat in middle 50%, tilts forward when exiting
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [15, 0, 0, -15]);
  
  // Map progress to opacity for a smooth fade-in/fade-out at borders
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1.0, 1.0, 0.6]);

  return (
    <div 
      ref={cardRef} 
      className="w-full mb-8 md:mb-16 flex justify-center"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        style={{
          scale,
          rotateX,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity"
        }}
        className="w-full rounded-[24px] md:rounded-[40px] border border-black/5 bg-white p-5 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-500 flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-center"
      >
        {isEven ? (
          <>
            {/* Text block (Left 42%) */}
            <div className="w-full md:w-[42%] flex flex-col text-left justify-center space-y-4 lg:space-y-6">
              <div 
                className="max-md:cursor-pointer md:cursor-default group/title select-none"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsExpanded(!isExpanded);
                  }
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-light text-[#C92C15] leading-none select-none">
                  {project.number}
                </span>
                <div className="mt-2">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-[#1B1B1B] tracking-tight leading-tight group-hover/title:text-[#C92C15] transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#6F6F6F] font-bold block mt-1.5 group-hover/title:text-[#C92C15] transition-colors">
                    {project.category} &bull; {project.location}
                  </span>
                </div>
              </div>

              {/* PC View: Always visible description */}
              <div className="hidden md:block">
                <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Mobile View: Collapsible description */}
              <div className="block md:hidden">
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[#6F6F6F] font-light text-sm leading-relaxed py-1">
                    {project.description}
                  </p>
                  {/* Mobile only Enquire Project button when expanded */}
                  <div className="pt-4 pb-2">
                    <Link
                      to="/contact#contact-section"
                      onClick={(e) => {
                        if (window.location.pathname === '/contact') {
                          e.preventDefault();
                          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] cursor-pointer"
                    >
                      <span>Enquire Project</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex items-center gap-4">
                {/* PC: Always show Enquire Project */}
                <div className="hidden md:block">
                  <Link
                    to="/contact#contact-section"
                    onClick={(e) => {
                      if (window.location.pathname === '/contact') {
                        e.preventDefault();
                        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] cursor-pointer"
                  >
                    <span>Enquire Project</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Mobile: Show Learn More/Learn Less (Toggles Expand) */}
                <div className="block md:hidden">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] cursor-pointer"
                  >
                    <span>{isExpanded ? 'Learn Less' : 'Learn More'}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </div>
              </div>
            </div>

            {/* Image block (Right 58%) */}
            <div className="w-full md:w-[58%]">
              <div className="grid grid-cols-10 gap-4 lg:gap-6">
                {/* Left tall image (Col 2) */}
                <div className="col-span-6 rounded-[20px] md:rounded-[30px] overflow-hidden bg-black/5 h-[320px] lg:h-[420px]">
                  <img
                    src={getOptimizedImageUrl(project.images.col2, 800)}
                    alt={`${project.name} main view`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Right stacked images (Col 1_1 and 1_2) */}
                <div className="col-span-4 flex flex-col gap-4 lg:gap-6 justify-between h-[320px] lg:h-[420px]">
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(project.images.col1_1, 500)}
                      alt={`${project.name} detail view 1`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(project.images.col1_2, 500)}
                      alt={`${project.name} detail view 2`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Image block (Left 58%) */}
            <div className="w-full md:w-[58%] order-2 md:order-1">
              <div className="grid grid-cols-10 gap-4 lg:gap-6">
                {/* Left stacked images (Col 1_1 and 1_2) */}
                <div className="col-span-4 flex flex-col gap-4 lg:gap-6 justify-between h-[320px] lg:h-[420px]">
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(project.images.col1_1, 500)}
                      alt={`${project.name} detail view 1`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(project.images.col1_2, 500)}
                      alt={`${project.name} detail view 2`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Right tall image (Col 2) */}
                <div className="col-span-6 rounded-[20px] md:rounded-[30px] overflow-hidden bg-black/5 h-[320px] lg:h-[420px]">
                  <img
                    src={getOptimizedImageUrl(project.images.col2, 800)}
                    alt={`${project.name} main view`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Text block (Right 42%) */}
            <div className="w-full md:w-[42%] flex flex-col text-left justify-center space-y-4 lg:space-y-6 order-1 md:order-2">
              <div 
                className="max-md:cursor-pointer md:cursor-default group/title select-none"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsExpanded(!isExpanded);
                  }
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-light text-[#C92C15] leading-none select-none">
                  {project.number}
                </span>
                <div className="mt-2">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-[#1B1B1B] tracking-tight leading-tight group-hover/title:text-[#C92C15] transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#6F6F6F] font-bold block mt-1.5 group-hover/title:text-[#C92C15] transition-colors">
                    {project.category} &bull; {project.location}
                  </span>
                </div>
              </div>

              {/* PC View: Always visible description */}
              <div className="hidden md:block">
                <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Mobile View: Collapsible description */}
              <div className="block md:hidden">
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[#6F6F6F] font-light text-sm leading-relaxed py-1">
                    {project.description}
                  </p>
                  {/* Mobile only Enquire Project button when expanded */}
                  <div className="pt-4 pb-2">
                    <Link
                      to="/contact#contact-section"
                      onClick={(e) => {
                        if (window.location.pathname === '/contact') {
                          e.preventDefault();
                          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] cursor-pointer"
                    >
                      <span>Enquire Project</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex items-center gap-4">
                {/* PC: Always show Enquire Project */}
                <div className="hidden md:block">
                  <Link
                    to="/contact#contact-section"
                    onClick={(e) => {
                      if (window.location.pathname === '/contact') {
                        e.preventDefault();
                        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] cursor-pointer"
                  >
                    <span>Enquire Project</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Mobile: Show Learn More/Learn Less (Toggles Expand) */}
                <div className="block md:hidden">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] cursor-pointer"
                  >
                    <span>{isExpanded ? 'Learn Less' : 'Learn More'}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};


const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full mb-8 md:mb-16 flex justify-center">
      <div className="w-full rounded-[24px] md:rounded-[40px] border border-black/5 bg-white p-5 md:p-8 lg:p-10 shadow-md flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-center animate-pulse">
        {/* Left block (Text skeleton) */}
        <div className="w-full md:w-[42%] flex flex-col text-left justify-center space-y-4">
          <div className="w-16 h-8 bg-black/5 rounded" />
          <div className="space-y-2">
            <div className="w-24 h-3 bg-black/5 rounded" />
            <div className="w-48 h-6 bg-black/5 rounded" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-black/5 rounded" />
            <div className="w-5/6 h-4 bg-black/5 rounded" />
          </div>
          <div className="w-32 h-10 bg-black/5 rounded-full" />
        </div>
        {/* Right block (Image skeleton) */}
        <div className="w-full md:w-[58%]">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-6 rounded-[20px] bg-black/5 h-[240px] md:h-[320px]" />
            <div className="col-span-4 flex flex-col gap-4 justify-between h-[240px] md:h-[320px]">
              <div className="rounded-[15px] bg-black/5 h-[calc(50%-8px)]" />
              <div className="rounded-[15px] bg-black/5 h-[calc(50%-8px)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fallbackProjects: ProjectData[] = [
  {
    number: '01',
    name: 'MS Jewellers',
    category: 'Commercial Showroom',
    location: 'Johari Bazaar',
    description: 'A high-concept jewelry showroom combining state-of-the-art security, custom-engineered display counters and precise task lighting.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.msCol1_1,
      col1_2: assets.projects.msCol1_2,
      col2: assets.projects.msCol2
    }
  },
  {
    number: '02',
    name: 'Barfiwala Sweets',
    category: 'Premium Retail Showroom',
    location: 'Johari Bazaar',
    description: 'A modern retail sweets showroom blending heritage Rajasthani elements with clean contemporary display cases, hygiene-first packaging areas and warm inviting lighting.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.barfiwalaCol1_1,
      col1_2: assets.projects.barfiwalaCol1_2,
      col2: assets.projects.barfiwalaCol2
    }
  },
  {
    number: '03',
    name: 'Reeve Inn Hotel',
    category: 'Commercial & Hospitality',
    location: 'Bani Park',
    description: 'A modern commercial hotel development showcasing structural concrete integrity, customized exterior finishes and premium room layouts.',
    tag: 'development',
    images: {
      col1_1: assets.projects.hotelCol1_1,
      col1_2: assets.projects.hotelCol1_2,
      col2: assets.projects.hotelCol2
    }
  },
  {
    number: '04',
    name: 'Paliwal Textile',
    category: 'Textile Center & Office',
    location: 'MI Road',
    description: 'A state-of-the-art textile showroom and administrative office, featuring high-capacity fabric display racks, custom client discussion tables and a premium exterior glass facade.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.paliwalCol1_1,
      col1_2: assets.projects.paliwalCol1_2,
      col2: assets.projects.paliwalCol2
    }
  },
  {
    number: '05',
    name: 'Bhangadiya House',
    category: 'Luxury Residence',
    location: 'Johari Bazaar',
    description: 'A premium luxury residence featuring customized structural designs, high-end marble materials, and a traditional facade integrated with modern space planning.',
    tag: 'residential',
    images: {
      col1_1: assets.projects.bhangadiyaCol1_1,
      col1_2: assets.projects.bhangadiyaCol1_2,
      col2: assets.projects.bhangadiyaCol2
    }
  },
  {
    number: '06',
    name: 'Shri Narayan Sales',
    category: 'Commercial Office & Hub',
    location: 'Johari Bazaar',
    description: 'A contemporary commercial office space and sales hub designed with open planning, premium finishes and integrated smart facilities.',
    tag: 'commercial',
    images: {
      col1_1: assets.generated.office,
      col1_2: assets.generated.reception,
      col2: assets.generated.corridor
    }
  },
  {
    number: '07',
    name: 'Indie Stitch',
    category: 'Bespoke Boutique & Office',
    location: 'Mansarovar',
    description: 'A luxury fashion boutique and design office featuring custom wood paneling, premium layout spacing and modern design aesthetics.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.indieCol1_1,
      col1_2: assets.projects.indieCol1_2,
      col2: assets.projects.indieCol2
    }
  }
];

interface ProjectsProps {
  filter?: 'all' | 'residential' | 'commercial' | 'development';
}

export const Projects: React.FC<ProjectsProps> = ({ filter = 'all' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        if (!db) {
          throw new Error("Firestore not initialized");
        }
        const q = query(collection(db!, 'projects'), orderBy('number', 'asc'));
        const querySnapshot = await getDocs(q);
        const list: ProjectData[] = [];
        querySnapshot.forEach((docSnap) => {
          list.push(docSnap.data() as ProjectData);
        });
        if (list.length === 0) {
          setProjectsList(fallbackProjects);
        } else {
          setProjectsList(list);
        }
      } catch (err) {
        console.error("Firestore projects fetch error, falling back to local list: ", err);
        setProjectsList(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = filter === 'all'
    ? projectsList
    : projectsList.filter(p => p.tag === filter);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#FAF7F5] py-12 md:py-24 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Heading */}
        <div className="text-left mb-12 md:mb-20">
          <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Our Works
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
            Crafted With Precision
          </h2>
          <p className="text-[#6F6F6F] font-light mt-2 md:mt-4 max-w-xl text-xs md:text-sm">
            A showcase of our landmark developments where precision architecture meets luxury construction.
          </p>
        </div>

        {/* UNIFIED ALTERNATING CARD LIST (1-BY-1 FOR BOTH MOBILE & PC) */}
        <div className="flex relative flex-col items-center w-full">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.number}
                  project={project}
                  index={index}
                />
              ))}
              {filteredProjects.length === 0 && (
                <div className="text-center py-12 md:py-20 text-gray-500 font-light w-full bg-white rounded-2xl md:rounded-3xl border border-black/5 text-xs md:text-sm">
                  No developments in this category at this time.
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </section>
  );
};


export default Projects;
