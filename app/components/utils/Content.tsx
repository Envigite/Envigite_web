import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div>
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    </div>
  );
};

export default Content;
