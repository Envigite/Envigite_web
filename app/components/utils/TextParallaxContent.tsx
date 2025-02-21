import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import About from "../about/About";
import Skills from "../skills/Skills";
import Portfolio from "../portfolio/Portfolio";
import Experience from "../experience/Experience";
import Contact from "../contact/Contact";

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
      <div id="skills">
        <TextParallaxContent
          imgUrl="/images/skills.webp"
          subheading="¿Quién soy como desarrollador?"
          heading="Mi enfoque profesional."
        >
          <Skills />
        </TextParallaxContent>
      </div>
      <div id="portfolio">
        <TextParallaxContent
          imgUrl="/images/portfolio.webp"
          subheading="Revisa mi trabajo"
          heading="Creando soluciones con pasión."
        >
          <Portfolio />
        </TextParallaxContent>
      </div>
      <div id="experience">
        <TextParallaxContent
          imgUrl="/images/experience.webp"
          subheading="Mi viaje profesional"
          heading="Listo para nuevos retos."
        >
          <Experience />
        </TextParallaxContent>
      </div>
      <div id="about">
        <TextParallaxContent
          imgUrl="/images/about.webp"
          subheading="¿Quieres saber más sobre mí?"
          heading="Te cuento más..."
        >
          <About />
        </TextParallaxContent>
      </div>
      <div id="contact">
        <TextParallaxContent
          imgUrl="/images/contact.webp"
          subheading="Hablemos"
          heading="¿Te gustaría trabajar juntos?"
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
