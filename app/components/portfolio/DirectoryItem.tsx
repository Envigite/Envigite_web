import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import type { DirectoryItemComponentProps } from "./types";

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
  const hasChildren = Boolean(children);
  const isProjectLevel = level === 2;
  const isOpen = isProjectLevel ? activeItem === path : isLocalOpen;

  const handleToggle = () => {
    if (isProjectLevel && onToggle) {
      onToggle(isOpen ? null : path ?? null);
    } else {
      setIsLocalOpen(!isLocalOpen);
    }
  };

  return (
    <div className="ml-1">
      {/* Header del Item */}
      <div
        className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors w-fit"
        onClick={handleToggle}
      >
        {(hasChildren || image) && (
          <div className="w-5 h-5 flex items-center justify-center">
            {isOpen ? (
              <ChevronDown size={20} className="text-purple-600" />
            ) : (
              <ChevronRight size={20} className="text-purple-600" />
            )}
          </div>
        )}
        <span className="text-gray-800 font-medium">{name}</span>
      </div>

      {/* Contenido Expandible */}
      <div
        className={`transition-all duration-500 ease-in-out pl-6 ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {image && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Image
              src={image}
              alt={name}
              width={250}
              height={150}
              className="rounded-lg hover:scale-105 transition-transform shadow mb-3"
            />
          </a>
        )}

        {description && (
          <p className="text-gray-700 text-sm bg-gray-50 rounded p-3 mb-2">
            {description}
          </p>
        )}

        {children && (
          <div className="border-l-2 border-purple-500 pl-3">{children}</div>
        )}
      </div>
    </div>
  );
};

export default DirectoryItem;
