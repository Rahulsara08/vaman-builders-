import * as React from "react"
import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"
import type { HTMLMotionProps, Variants } from "framer-motion"
import { PointerHighlight } from "./ui/pointer-highlight"

import { assets } from "../lib/cloudinary";

const msCol1_1 = assets.projects.msCol1_1;
const msCol1_2 = assets.projects.msCol1_2;
const msCol2 = assets.projects.msCol2;

const barfiwalaCol1_1 = assets.projects.barfiwalaCol1_1;
const barfiwalaCol1_2 = assets.projects.barfiwalaCol1_2;
const barfiwalaCol2 = assets.projects.barfiwalaCol2;

const indieCol1_1 = assets.projects.indieCol1_1;
const indieCol1_2 = assets.projects.indieCol1_2;
const indieCol2 = assets.projects.indieCol2;

const paliwalCol1_1 = assets.projects.paliwalCol1_1;
const paliwalCol1_2 = assets.projects.paliwalCol1_2;
const paliwalCol2 = assets.projects.paliwalCol2;

const bhangadiyaCol1_1 = assets.projects.bhangadiyaCol1_1;
const bhangadiyaCol1_2 = assets.projects.bhangadiyaCol1_2;
const bhangadiyaCol2 = assets.projects.bhangadiyaCol2;

const hotelCol1_1 = assets.projects.hotelCol1_1;
const hotelCol1_2 = assets.projects.hotelCol1_2;
const hotelCol2 = assets.projects.hotelCol2;


// Helper function to merge class names locally
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}

interface ContainerScrollContextValue {
  scrollY: MotionValue<number>
}

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
}

const blurVariants: Variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
  },
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}

export const ContainerScroll = ({
  children,
  className,
  style,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollY: scrollYProgress }}>
      <div
        ref={containerRef}
        className={cn("relative min-h-[125vh] md:min-h-[160vh]", className)}
        style={{
          perspective: "1200px",
          perspectiveOrigin: "center center",
          transformStyle: "preserve-3d",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}
ContainerScroll.displayName = "ContainerScroll"

export const ContainerSticky = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "sticky left-0 top-0 w-full overflow-hidden",
        className
      )}
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        ...style,
      }}
      {...props}
    />
  )
}
ContainerSticky.displayName = "ContainerSticky"

export const GalleryContainer = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">) => {
  const { scrollY } = useContainerScrollContext()
  const rotateX = useTransform(scrollY, [0, 1], [60, 0])
  const scale = useTransform(scrollY, [0, 1], [0.92, 1])
  const opacity = useTransform(scrollY, [0, 0.25], [0.85, 1])

  return (
    <motion.div
      className={cn(
        "relative grid size-full grid-cols-3 gap-3 md:gap-4 rounded-2xl",
        className
      )}
      style={{
        rotateX,
        scale,
        opacity,
        transformStyle: "preserve-3d",
        perspective: "1200px",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
GalleryContainer.displayName = "GalleryContainer"

export const GalleryCol = ({
  className,
  style,
  yRange = ["0%", "-10%"],
  ...props
}: HTMLMotionProps<"div"> & { yRange?: string[] }) => {
  const { scrollY } = useContainerScrollContext()
  const y = useTransform(scrollY, [0, 1], yRange)

  return (
    <motion.div
      className={cn("relative flex w-full flex-col gap-3 md:gap-4", className)}
      style={{
        y,
        ...style,
      }}
      {...props}
    />
  )
}
GalleryCol.displayName = "GalleryCol"

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, viewport, transition, ...props }, ref) => {
  return (
    <motion.div
      className={cn("relative", className)}
      ref={ref}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, ...viewport }}
      transition={{
        staggerChildren: transition?.staggerChildren || 0.2,
        ...transition,
      }}
      {...props}
    />
  )
})
ContainerStagger.displayName = "ContainerStagger"

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={blurVariants}
      transition={SPRING_CONFIG || transition}
      {...props}
    />
  )
})
ContainerAnimated.displayName = "ContainerAnimated"

interface GalleryItem {
  id: string
  name: string
  category: string
  location: string
  image: string
}

const column1Items: GalleryItem[] = [
  {
    id: "col1-1",
    name: "Reeve Inn Hotel",
    category: "Commercial & Hospitality",
    location: "Bani Park",
    image: hotelCol1_1
  },
  {
    id: "col1-2",
    name: "MS Jewellers",
    category: "Commercial Showroom",
    location: "Johari Bazaar",
    image: msCol1_2
  },
  {
    id: "col1-3",
    name: "Bhangadiya House",
    category: "Luxury Residence",
    location: "Johari Bazaar",
    image: bhangadiyaCol1_1
  },
  {
    id: "col1-4",
    name: "Indie Stitch",
    category: "Bespoke Boutique & Office",
    location: "Mansarovar",
    image: indieCol2
  },
  {
    id: "col1-5",
    name: "Barfiwala Sweets",
    category: "Premium Retail Showroom",
    location: "Johari Bazaar",
    image: barfiwalaCol1_1
  },
  {
    id: "col1-6",
    name: "Paliwal Textile",
    category: "Textile Center & Office",
    location: "MI Road",
    image: paliwalCol1_2
  },
  {
    id: "col1-7",
    name: "Shri Narayan Sales",
    category: "Commercial Office & Hub",
    location: "Johari Bazaar",
    image: assets.generated.office
  }
]

const column2Items: GalleryItem[] = [
  {
    id: "col2-1",
    name: "Indie Stitch",
    category: "Bespoke Boutique & Office",
    location: "Mansarovar",
    image: indieCol1_1
  },
  {
    id: "col2-2",
    name: "Bhangadiya House",
    category: "Luxury Residence",
    location: "Johari Bazaar",
    image: bhangadiyaCol2
  },
  {
    id: "col2-3",
    name: "MS Jewellers",
    category: "Commercial Showroom",
    location: "Johari Bazaar",
    image: msCol1_1
  },
  {
    id: "col2-4",
    name: "Reeve Inn Hotel",
    category: "Commercial & Hospitality",
    location: "Bani Park",
    image: hotelCol2
  },
  {
    id: "col2-5",
    name: "Paliwal Textile",
    category: "Textile Center & Office",
    location: "MI Road",
    image: paliwalCol1_1
  },
  {
    id: "col2-6",
    name: "Barfiwala Sweets",
    category: "Premium Retail Showroom",
    location: "Johari Bazaar",
    image: barfiwalaCol2
  },
  {
    id: "col2-7",
    name: "Shri Narayan Sales",
    category: "Commercial Office & Hub",
    location: "Johari Bazaar",
    image: assets.generated.reception
  }
]

const column3Items: GalleryItem[] = [
  {
    id: "col3-1",
    name: "MS Jewellers",
    category: "Commercial Showroom",
    location: "Johari Bazaar",
    image: msCol2
  },
  {
    id: "col3-2",
    name: "Reeve Inn Hotel",
    category: "Commercial & Hospitality",
    location: "Bani Park",
    image: hotelCol1_2
  },
  {
    id: "col3-3",
    name: "Indie Stitch",
    category: "Bespoke Boutique & Office",
    location: "Mansarovar",
    image: indieCol1_2
  },
  {
    id: "col3-4",
    name: "Bhangadiya House",
    category: "Luxury Residence",
    location: "Johari Bazaar",
    image: bhangadiyaCol1_2
  },
  {
    id: "col3-5",
    name: "Barfiwala Sweets",
    category: "Premium Retail Showroom",
    location: "Johari Bazaar",
    image: barfiwalaCol1_2
  },
  {
    id: "col3-6",
    name: "Paliwal Textile",
    category: "Textile Center & Office",
    location: "MI Road",
    image: paliwalCol2
  },
  {
    id: "col3-7",
    name: "Shri Narayan Sales",
    category: "Commercial Office & Hub",
    location: "Johari Bazaar",
    image: assets.generated.corridor
  }
]

const ProjectCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-black/40 border border-white/10 aspect-[4/3] w-full shadow-lg select-none pointer-events-none">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover opacity-90"
        loading="lazy"
      />
    </div>
  )
}

const BannerHeader: React.FC = () => {
  const { scrollY } = useContainerScrollContext()
  const opacity = useTransform(scrollY, [0, 0.3], [1, 0])
  const y = useTransform(scrollY, [0, 0.3], [0, -40])
  const scale = useTransform(scrollY, [0, 0.3], [1, 0.96])

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-2 md:pt-4"
    >
      <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-[28px] p-6 md:p-8 shadow-2xl">
        <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-2 md:mb-4">
          Our Portfolio
        </span>
        <h1 className="text-white font-semibold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-3 md:mb-4">
          Crafted With <PointerHighlight delay={0.6} containerClassName="text-[#C92C15] font-semibold">Precision</PointerHighlight>
        </h1>
        <p className="text-white/80 font-light text-xs md:text-base max-w-xl mx-auto leading-relaxed">
          Explore our landmark projects across Rajasthan, from modern offices to custom-built luxury villas.
        </p>
      </div>
    </motion.div>
  )
}

export const ProjectBanner: React.FC = () => {
  return (
    <ContainerScroll className="w-full overflow-visible">
      {/* Decorative radial glows */}
      <div className="absolute top-[-50px] right-[-100px] w-[500px] h-[300px] bg-radial from-[rgba(201,44,21,0.1)] to-transparent filter blur-[40px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-[50px] left-[-100px] w-[500px] h-[300px] bg-radial from-[rgba(201,44,21,0.1)] to-transparent filter blur-[40px] pointer-events-none rounded-full z-0" />

      <ContainerSticky className="h-screen flex flex-col justify-start items-center pt-24 md:pt-28 pb-4 overflow-hidden">
        {/* Animated header text */}
        <BannerHeader />

        {/* 3D scrolling parallax grid */}
        <GalleryContainer className="w-full max-w-6xl mx-auto h-[65vh] md:h-[70vh] px-4 md:px-8 mt-2">
          <GalleryCol yRange={["5%", "-12%"]} className="gap-3 md:gap-4">
            {column1Items.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </GalleryCol>
          <GalleryCol yRange={["-5%", "10%"]} className="gap-3 md:gap-4">
            {column2Items.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </GalleryCol>
          <GalleryCol yRange={["8%", "-15%"]} className="gap-3 md:gap-4">
            {column3Items.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </GalleryCol>
        </GalleryContainer>
      </ContainerSticky>
    </ContainerScroll>
  )
}

export default ProjectBanner
