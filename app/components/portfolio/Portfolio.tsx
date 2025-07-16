import { FiBook } from "react-icons/fi";
import Content from "../utils/Content";
import DirectoryStructure from "../portfolio/DirectoryStructure";

const Portfolio = () => {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2 text-gray-900">
        <FiBook className="text-purple-600 text-4xl" />
        Mis proyectos ✨
      </h2>

      <div className="mt-6 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Content>
          Aquí puedes explorar algunos de mis proyectos destacados. Cada uno
          refleja retos únicos donde puse a prueba mi creatividad y habilidades
          técnicas para construir soluciones modernas y funcionales. ¡Siempre
          buscando aprender más!
        </Content>

        <div className="mt-8">
          <DirectoryStructure />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
