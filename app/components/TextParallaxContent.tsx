import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import About from "./About";
import Skills from "./Skills";
import Portfolio from "./Portfolio";
import Experience from "./Experience";
import Contact from "./Contact";

// Definir una interfaz para las propiedades
interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}

export default function TextParallaxContentExample() {
  return (
    <div className="bg-white pt-12">
      <div id="about">
        <TextParallaxContent
          imgUrl="/images/about.jpg"
          subheading="Más sobre mi?"
          heading="Acompáñame..."
        >
          <About />
        </TextParallaxContent>
      </div>
      <div id="skills">
        <TextParallaxContent
          imgUrl="/images/skills.jpg"
          subheading="Habilidades"
          heading="Un profesional 😎."
        >
          <Skills />
        </TextParallaxContent>
      </div>
      <div id="portfolio">
        <TextParallaxContent
          imgUrl="/images/portfolio.jpg"
          subheading="Portafolio"
          heading="Cada vez más profesional."
        >
          <Portfolio />
        </TextParallaxContent>
      </div>
      <div id="experience">
        <TextParallaxContent
          imgUrl="/images/experience.jpg"
          subheading="Experiencia"
          heading="Siempre explorando nuevos desafíos."
        >
          <Experience />
        </TextParallaxContent>
      </div>
      <div id="contact">
        <TextParallaxContent
          imgUrl="/images/contact.jpg"
          subheading="Contáctame"
          heading="Conectemos."
        >
          <Contact />
        </TextParallaxContent>
      </div>
    </div>
  );
}

const IMG_PADDING = 12;

// Usar la interfaz en el componente
const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

// Definir una interfaz para las propiedades de StickyImage
interface StickyImageProps {
  imgUrl: string;
}

const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

// Definir una interfaz para las propiedades de OverlayCopy
interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-5xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};
