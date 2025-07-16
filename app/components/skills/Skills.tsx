import {
  FiTool,
  FiCode,
  FiSmartphone,
  FiDatabase,
  FiCpu,
  FiSettings,
  FiCloud,
} from "react-icons/fi";
import Content from "../utils/Content";

const skillsData = [
  {
    icon: <FiCode className="text-purple-600 w-6 h-6" />,
    title: "Lenguajes de Programación",
    items: ["JavaScript", "TypeScript", "Kotlin", "HTML / CSS", "XML"],
  },
  {
    icon: <FiSmartphone className="text-purple-600 w-6 h-6" />,
    title: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "Jetpack Compose"],
  },
  {
    icon: <FiCpu className="text-purple-600 w-6 h-6" />,
    title: "Backend",
    items: [
      "Node.js",
      "MongoDB",
      "Git & GitHub",
      "AWS (Amazon Web Services)",
      "GitHub Actions",
    ],
  },
  {
    icon: <FiDatabase className="text-purple-600 w-6 h-6" />,
    title: "Arquitecturas y Patrones",
    items: [
      "Clean Architecture",
      "MVVM (Model-View-ViewModel)",
      "Inyección de dependencias",
    ],
  },
  {
    icon: <FiSettings className="text-purple-600 w-6 h-6" />,
    title: "Manejo de datos y librerías",
    items: [
      "Retrofit",
      "Corutinas",
      "JSON",
      "RecyclerView",
      "Shared Preferences",
    ],
  },
  {
    icon: <FiCloud className="text-purple-600 w-6 h-6" />,
    title: "Herramientas y Otras Tecnologías",
    items: [
      "Vercel",
      "AWS S3 & CloudFront",
      "Manejo de dependencias y librerías",
      "Consumo de datos desde API",
      "Docker",
    ],
  },
];

const Skills = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-12 py-16">
      <h2 className="text-4xl font-extrabold flex items-center gap-3 text-purple-700 mb-6">
        <FiTool className="w-10 h-10" />
        Mis habilidades 💻
      </h2>

      <Content>
        Aunque sigo creciendo como desarrollador, mi pasión y dedicación me
        impulsan a aprender constantemente. Aquí te comparto las tecnologías y
        patrones con los que trabajo, construyendo experiencias digitales
        escalables y modernas.
      </Content>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map(({ icon, title, items }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-purple-400"
            style={{ willChange: "transform, box-shadow" }}
          >
            <div className="flex items-center gap-3 mb-4">
              {icon}
              <h3 className="text-xl font-semibold text-purple-600">{title}</h3>
            </div>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="hover:text-purple-600 transition-colors cursor-default"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
