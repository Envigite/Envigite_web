import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import type { DirectoryItem, DirectoryItemComponentProps } from "./types";

const DirectoryItem: React.FC<DirectoryItemComponentProps> = ({
  name,
  children,
  link,
  image,
  description,
  path,
  onToggle,
  activeItem,
  level = 0,
}) => {
  const [isLocalOpen, setIsLocalOpen] = useState(true);

  // Solo aplicamos la lógica del acordeón en el nivel de los proyectos (nivel 2)
  const isOpen = level === 2 ? activeItem === path : isLocalOpen;

  const toggleOpen = () => {
    if (level === 2 && onToggle) {
      onToggle(isOpen ? null : path ?? null);
    } else {
      setIsLocalOpen(!isLocalOpen);
    }
  };

  const hasChildren = children && React.Children.count(children) > 0;

  return (
    <div className="ml-1">
      {/* Contenedor de la carpeta o archivo */}
      <div
        className="flex items-center gap-2 py-2 pr-4 pl-4 cursor-pointer hover:bg-gray-300 rounded-lg transition-colors duration-200 w-fit"
        onClick={toggleOpen}
      >
        {hasChildren || image ? (
          <div className="w-5 h-5 flex items-center justify-center">
            {isOpen ? (
              <ChevronDown size={24} className="text-purple-600" />
            ) : (
              <ChevronRight size={24} className="text-purple-600" />
            )}
          </div>
        ) : null}
        <span className="text-gray-800">{name}</span>
      </div>

      {/* Contenido hijo */}
      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out ${
          isOpen ? "max-h-screen opacity-200" : "max-h-0 opacity-0"
        }`}
      >
        {/* Mostrar la imagen si existe */}
        {image && (
          <a
            href={link}
            className="block ml-4 mt-2 w-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={image}
              alt={name}
              width={300}
              height={200}
              className="w-48 h-81 object-cover rounded hover:scale-110 transition-transform duration-500"
            />
          </a>
        )}

        {/* Mostrar la descripción si existe */}
        {description && (
          <div className="ml-4 mt-2">
            <div className="pl-4 pr-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line break-words">
                {description}
              </p>
            </div>
          </div>
        )}

        {/* Mostrar los children si existen */}
        {children && (
          <div className="border-l-2 border-purple-600 ml-2 pl-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

const DirectoryStructure: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  // Ejemplo de estructura de datos
  const data: DirectoryItem[] = [
    {
      name: "My Projects",
      children: [
        {
          name: "app",
          children: [
            {
              name: "MinecraftRepository",
              image: "/images/project1.webp",
              link: "https://github.com/Envigite/MinecraftRepository",
              children: [
                {
                  name: "description",
                  children: [
                    {
                      name: "Esta aplicación, desarrollada en Kotlin, integra datos en tiempo real desde una API REST de Minecraft. Los datos obtenidos se visualizan en un RecyclerView a través de un patrón de arquitectura limpia (MVVM), facilitando la organización del código y la mantenibilidad. El proyecto utiliza bibliotecas modernas como Retrofit para la conexión a la API y Dagger Hilt para la inyección de dependencias. Actualmente, se está desarrollando una nueva funcionalidad que permitirá almacenar datos en una base de datos local.",
                    },
                  ],
                },
              ],
            },
            {
              name: "HoroscopApp",
              image: "/images/project2.webp",
              link: "https://github.com/Envigite/HoroscopApp",
              children: [
                {
                  name: "description",
                  children: [
                    {
                      name: "Esta aplicación es un simulador de horóscopo que genera predicciones aleatorias y divertidas para los usuarios. Aunque las predicciones no tienen base astrológica real, el proyecto está diseñado para practicar el consumo de APIs, la manipulación de datos y la creación de interfaces interactivas.",
                    },
                  ],
                },
              ],
            },
            {
              name: "Envigite_web",
              image: "/images/project3.webp",
              link: "https://github.com/Envigite/Envigite_web",
              children: [
                {
                  name: "description",
                  children: [
                    {
                      name: "Esta página web está construida con React y estilizada con Tailwind CSS. Incluye diversas animaciones interactivas, un diseño responsive y una estructura modular para mostrar proyectos, habilidades y información personal.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const renderDirectory = (
    items: DirectoryItem[],
    currentPath = "",
    level = 0
  ) => {
    return items.map((item, index) => {
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
  };

  return (
    <div className="relative w-full">
      <style jsx global>{`
        @media (max-width: 700px) {
          .directory-container {
            max-width: 500px;
            overflow-x: auto;
          }
          .directory-content {
            min-width: 700px;
          }
        }
      `}</style>

      <div className="directory-container bg-white rounded-lg shadow-md p-4">
        <div className="directory-content">{renderDirectory(data)}</div>
      </div>
    </div>
  );
};

export default DirectoryStructure;
