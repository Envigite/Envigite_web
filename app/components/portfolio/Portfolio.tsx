import { FiBook } from "react-icons/fi";
import Content from "../utils/Content";
import DirectoryStructure from "./DirectoryStructure";

const Portfolio = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
        <FiBook className="text-purple-600 text-4xl" />
        Mis proyectos ✨
      </h2>
      <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-md">
        <Content>
          En esta sección, podrás explorar una selección de mis proyectos más
          destacados. Cada uno de ellos representa un desafío único donde he
          aplicado mis habilidades técnicas y creativas para desarrollar
          soluciones innovadoras. Me apasiona enfrentarme a nuevos retos y
          aprender constantemente, lo que me permite crecer tanto personal como
          profesionalmente en el mundo del desarrollo.
        </Content>
        {/* Integramos DirectoryStructure aquí */}
        <div className="mt-6">
          <DirectoryStructure />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
