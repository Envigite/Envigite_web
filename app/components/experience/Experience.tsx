import { FiBook } from "react-icons/fi";
import Content from "../utils/Content";

const Experience = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
        <FiBook className="text-purple-600 text-4xl" />
        Mi trayectoria 🚀
      </h2>
      <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-md">
        <Content>
          Profesional con una trayectoria multidisciplinaria en áreas como
          instalación de redes, carpintería, encuestas, transporte,
          refrigeración, instrumentación, electricidad y electrónica. Estas
          experiencias me han dotado de habilidades técnicas, de resolución de
          problemas y adaptabilidad, que ahora aplico en mi transición hacia el
          desarrollo de software. Busco oportunidades para contribuir con
          soluciones innovadoras y seguir creciendo en este campo.
        </Content>
      </div>
    </div>
  );
};

export default Experience;
