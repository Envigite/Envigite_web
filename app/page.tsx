// app/page.tsx
"use client";

import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import TextParallaxContentExample from "./components/TextParallaxContent";
import Example from "./components/ClipPathLinks";
import HoverImageLinks from "./components/HoverImageLinks";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Menú de navegación */}
      <Navbar />

      <HoverImageLinks />

      <TextParallaxContentExample />

      {/* Contenido de la página */}

      <About />
      <Skills />
      <Portfolio />
      <Experience />
      <Contact />
      <Example />

      <ScrollToTopButton />
    </div>
  );
}
