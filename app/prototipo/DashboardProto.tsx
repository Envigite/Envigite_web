"use client";

import { useState } from "react";
import { FaBoxes, FaWater, FaShippingFast, FaChartBar } from "react-icons/fa";
import { GiStrawberry } from "react-icons/gi";
import { BiSolidFridge } from "react-icons/bi";
import { MdCleaningServices } from "react-icons/md";

// Componentes para cada sección
import Recepcion from "./secciones/Recepcion";
import Despezonado from "./secciones/Despezonado";
import Lavado from "./secciones/Lavado";
import InventarioIQF from "./secciones/InventarioIQF";
import Embasado from "./secciones/Embasado";
import Exportacion from "./secciones/Exportacion";
import EstadisticasComparativas from "./secciones/EstadisticasComparativas";

export default function DashboardProto() {
  const [seccionActiva, setSeccionActiva] = useState<string>("recepcion");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header con degradado */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-400 text-white py-6 px-6 shadow-lg">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center">
            <div className="mr-4 bg-white text-emerald-800 p-2 rounded-md">
              <div
                className="flex flex-col items-center"
                style={{ lineHeight: "0.9" }}
              >
                <div className="relative" style={{ marginBottom: "1px" }}>
                  <span
                    style={{
                      fontSize: "26px",
                      fontWeight: "bold",
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      textAlign: "center",
                      letterSpacing: "2px",
                    }}
                  >
                    Mega
                  </span>
                  <span
                    className="text-red-600 absolute"
                    style={{
                      bottom: "2.7px",
                      right: "6.6px",
                      fontSize: "13px",
                    }}
                  >
                    ●
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    BERRIES
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Resumen Estadístico
            </h1>
            <p className="text-lg md:text-xl text-emerald-100">
              Procesamiento en Tiempo Real
            </p>
          </div>
          <div className="w-36"></div> {/* Para mantener centrado el título */}
        </div>
      </div>

      {/* Navegación */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-2 md:space-x-4 overflow-x-auto py-3 scrollbar-hidden">
            <button
              onClick={() => setSeccionActiva("recepcion")}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                seccionActiva === "recepcion"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <GiStrawberry className="text-lg" />
              <span>Recepción</span>
            </button>
            <button
              onClick={() => setSeccionActiva("despezonado")}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                seccionActiva === "despezonado"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <MdCleaningServices className="text-lg" />
              <span>Despezonado</span>
            </button>
            <button
              onClick={() => setSeccionActiva("lavado")}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                seccionActiva === "lavado"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaWater className="text-lg" />
              <span>Lavado</span>
            </button>
            <button
              onClick={() => setSeccionActiva("inventarioIQF")}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                seccionActiva === "inventarioIQF"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <BiSolidFridge className="text-lg" />
              <span>Inventario IQF</span>
            </button>
            <button
              onClick={() => setSeccionActiva("embasado")}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                seccionActiva === "embasado"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaBoxes className="text-lg" />
              <span>Embasado</span>
            </button>
            <button
              onClick={() => setSeccionActiva("exportacion")}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                seccionActiva === "exportacion"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaShippingFast className="text-lg" />
              <span>Exportación</span>
            </button>
            <button
              onClick={() => setSeccionActiva("estadisticas")}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                seccionActiva === "estadisticas"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaChartBar className="text-lg" />
              <span>Estadísticas</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-6">
        {seccionActiva === "recepcion" && <Recepcion />}
        {seccionActiva === "despezonado" && <Despezonado />}
        {seccionActiva === "lavado" && <Lavado />}
        {seccionActiva === "inventarioIQF" && <InventarioIQF />}
        {seccionActiva === "embasado" && <Embasado />}
        {seccionActiva === "exportacion" && <Exportacion />}
        {seccionActiva === "estadisticas" && <EstadisticasComparativas />}
      </main>

      {/* Footer */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-400 text-white py-3 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>
            © {new Date().getFullYear()} - Dashboard de Operaciones en Tiempo
            Real
          </p>
        </div>
      </div>
    </div>
  );
}
