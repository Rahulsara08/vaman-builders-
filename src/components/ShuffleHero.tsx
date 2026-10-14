import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "./ui/FadeUp";
import { assets } from "../lib/cloudinary";

export const ShuffleHero = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16 relative z-10">
        {/* Left Narrative Column in Frosted Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 md:p-10 text-left space-y-6 shadow-2xl">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-extrabold uppercase tracking-[0.2em] block">
              Building With Trust
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Beautiful Spaces, Built to Last.
            </h3>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-sm md:text-base text-[#333333] font-medium leading-relaxed my-2">
              From custom family homes to modern commercial centers, we build high quality buildings across Rajasthan. We handle everything for you, making the entire building process simple and stress free.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#C92C15] text-white hover:bg-[#D43B13] px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>See Our Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>

        {/* Right Shuffle Grid Column */}
        <div className="w-full relative">
          <ShuffleGrid />
        </div>
      </div>
    </section>
  );
};

const shuffle = <T,>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const bedroomImg = assets.generated.bedroom;
const receptionImg = assets.generated.reception;
const balconyImg = assets.generated.balcony;
const officeImg = assets.generated.office;

const msCol1_1 = assets.projects.msCol1_1;
const msCol2 = assets.projects.msCol2;
const indieCol1_1 = assets.projects.indieCol1_1;
const indieCol2 = assets.projects.indieCol2;
const bhangadiyaCol1_1 = assets.projects.bhangadiyaCol1_1;
const bhangadiyaCol2 = assets.projects.bhangadiyaCol2;
const hotelCol1_1 = assets.projects.hotelCol1_1;
const hotelCol2 = assets.projects.hotelCol2;
const barfiwalaCol1_1 = assets.projects.barfiwalaCol1_1;
const barfiwalaCol2 = assets.projects.barfiwalaCol2;
const paliwalCol1_1 = assets.projects.paliwalCol1_1;
const paliwalCol2 = assets.projects.paliwalCol2;

const squareData = [
  { id: 1, src: bedroomImg },
  { id: 2, src: receptionImg },
  { id: 3, src: officeImg },
  { id: 4, src: balconyImg },
  { id: 5, src: msCol1_1 },
  { id: 6, src: msCol2 },
  { id: 7, src: indieCol1_1 },
  { id: 8, src: indieCol2 },
  { id: 9, src: bhangadiyaCol1_1 },
  { id: 10, src: bhangadiyaCol2 },
  { id: 11, src: hotelCol1_1 },
  { id: 12, src: hotelCol2 },
  { id: 13, src: barfiwalaCol1_1 },
  { id: 14, src: barfiwalaCol2 },
  { id: 15, src: paliwalCol1_1 },
  { id: 16, src: paliwalCol2 }
];

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-2xl overflow-hidden border border-black/10 bg-gray-100 shadow-sm"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState<React.JSX.Element[]>(() => generateSquares());

  useEffect(() => {
    const triggerShuffle = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(triggerShuffle, 3000);
    };

    timeoutRef.current = setTimeout(triggerShuffle, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[260px] md:h-[450px] gap-1.5 md:gap-2 lg:gap-3 p-1.5 md:p-2 bg-white/30 backdrop-blur-xl rounded-[24px] md:rounded-[32px] border border-white/60 shadow-2xl">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
