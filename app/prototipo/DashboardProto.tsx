"use client";

import React from 'react';

export default function DashboardProto() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Prototipo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sección 1</h2>
          <p>Contenido del prototipo aquí.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sección 2</h2>
          <p>Más contenido del prototipo aquí.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sección 3</h2>
          <p>Información adicional del prototipo.</p>
        </div>
      </div>
    </div>
  );
} 