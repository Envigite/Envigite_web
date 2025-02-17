// app/page.tsx
"use client";

import Navbar from "./components/navbar/Navbar";
import ScrollToTopButton from "./components/utils/ScrollToTopButton";
import TextParallaxContentExample from "./components/utils/TextParallaxContent";
import HoverImageLinks from "./components/utils/HoverImageLinks";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <Navbar />
      <HoverImageLinks />
      <TextParallaxContentExample />
      <ScrollToTopButton />
    </div>
  );
}
