import { FiTool } from "react-icons/fi";
import Content from "../utils/Content";

const Skills = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-24 pt-12">
      <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
        <FiTool className="text-purple-600 text-4xl" />
        Mis habilidades 💻
      </h2>
      <div className="mt-6 bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md">
        <Content>
          Si bien me considero un programador en desarrollo, mi pasión por
          aprender y mi dedicación me impulsan a seguir creciendo y adquiriendo
          nuevas habilidades. En mi transición al mundo de la programación, he
          desarrollado habilidades en diversas áreas del desarrollo Full Stack,
          incluyendo:
        </Content>

        {/* Cuadrícula de habilidades */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Lenguajes de Programación */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-purple-600">
              Lenguajes de Programación
            </h3>
            <ul className="mt-2 space-y-1">
              <li>Kotlin</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>HTML / CSS</li>
              <li>XML</li>
            </ul>
          </div>

          {/* Frameworks y Librerías */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-purple-600">Frontend</h3>
            <ul className="mt-2 space-y-1">
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>Jetpack Compose</li>
            </ul>
          </div>

          {/* Desarrollo Mobile (Android) */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-purple-600">Backend</h3>
            <ul className="mt-2 space-y-1">
              <li>Node.js</li>
              <li>MongoDB</li>
              <li>Git & GitHub</li>
              <li>AWS (Amazon Web Services)</li>
              <li>GitHub Actions</li>
            </ul>
          </div>

          {/* Bases de Datos */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-purple-600">
              Arquitecturas y Patrones
            </h3>
            <ul className="mt-2 space-y-1">
              <li>Clean Architecture</li>
              <li>MVVM (Model-View-ViewModel)</li>
              <li>Inyección de dependencias</li>
            </ul>
          </div>

          {/* DevOps y Herramientas de Despliegue */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-purple-600">
              Manejo de datos y librerías
            </h3>
            <ul className="mt-2 space-y-1">
              <li>Retrofit</li>
              <li>Corutinas</li>
              <li>JSON</li>
              <li>RecyclerView</li>
              <li>Shared Preferences</li>
            </ul>
          </div>

          {/* Otras Habilidades */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-purple-600">
              Herramientas y Otras Tecnologías
            </h3>
            <ul className="mt-2 space-y-1">
              <li>Vercel</li>
              <li>AWS S3 & CloudFront</li>
              <li>Manejo de dependencias y librerías</li>
              <li>Consumo de datos desde API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
