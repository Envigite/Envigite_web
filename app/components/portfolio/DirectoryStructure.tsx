import React, { useState } from "react";
import DirectoryItem from "./DirectoryItem";
import type { DirectoryItem as DirectoryItemType } from "./types";

const DirectoryStructure: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const data: DirectoryItemType[] = [
    {
      name: "Mis Proyectos",
      children: [
        {
          name: "App",
          children: [
            {
              name: "MinecraftRepository",
              link: "https://github.com/Envigite/MinecraftRepository",
              image: "/images/project1.webp",
              description:
                "App en Kotlin que integra datos en tiempo real desde una API REST de Minecraft. Usa Clean Architecture, Retrofit, Dagger Hilt y un RecyclerView para mostrar la información.",
            },
            {
              name: "HoroscopApp",
              link: "https://github.com/Envigite/HoroscopApp",
              image: "/images/project2.webp",
              description:
                "App simuladora de horóscopos para practicar consumo de APIs, manejo de datos y creación de interfaces interactivas.",
            },
            {
              name: "Envigite_web",
              link: "https://github.com/Envigite/Envigite_web",
              image: "/images/project3.webp",
              description:
                "Web personal construida en React + Tailwind, con animaciones, diseño responsive y arquitectura modular para mostrar proyectos y habilidades.",
            },
            {
              name: "Resumen Anual",
              link: "/cierre",
              image: "/images/annual-report.webp",
              description:
                "Dashboard interactivo con métricas, estadísticas y visualizaciones del rendimiento anual. Hecho en React + Tailwind, con enfoque en usabilidad y claridad visual.",
            },
          ],
        },
      ],
    },
  ];

  const renderDirectory = (
    items: DirectoryItemType[],
    currentPath = "",
    level = 0
  ) =>
    items.map((item, index) => {
      const path = `${currentPath}/${index}-${item.name}`;
      return (
        <DirectoryItem
          key={path}
          name={item.name}
          link={item.link}
          image={item.image}
          description={item.description}
          path={path}
          onToggle={setActiveItem}
          activeItem={activeItem}
          level={level}
        >
          {item.children && renderDirectory(item.children, path, level + 1)}
        </DirectoryItem>
      );
    });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
      <div className="min-w-[300px]">{renderDirectory(data)}</div>
    </div>
  );
};

export default DirectoryStructure;
