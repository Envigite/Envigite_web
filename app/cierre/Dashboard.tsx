import { useState } from "react";
import {
  datosCierre,
  calcularTotales,
  calcularPorcentajes,
} from "../data/datosTemporada";
import ResumenGeneral from "./ResumenGeneral";
import DetalleEmbalaje from "./DetalleEmbalaje";
import DetalleProductos from "./DetalleProductos";
import DetalleCategorias from "./DetalleCategorias";
import Recepciones from "./Recepciones";
import Exportacion from "./Exportacion";
import DesviacionesAcciones from "./DesviacionesAcciones";

const Dashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState<string>("resumen");

  const totales = calcularTotales();
  const porcentajes = calcularPorcentajes();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header con degradado */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-sky-400 text-white py-8 px-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">
            Cierre de Temporada 2024-2025
          </h1>
          <p className="text-xl text-center text-blue-100">Ultra Berries</p>
        </div>
      </div>

      {/* Navegación */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex justify-center space-x-4 overflow-x-auto py-4">
            <button
              onClick={() => setSeccionActiva("resumen")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                seccionActiva === "resumen"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Resumen General
            </button>
            <button
              onClick={() => setSeccionActiva("recepciones")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                seccionActiva === "recepciones"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Recepciones
            </button>
            <button
              onClick={() => setSeccionActiva("embalaje")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                seccionActiva === "embalaje"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Embalaje
            </button>
            <button
              onClick={() => setSeccionActiva("productos")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                seccionActiva === "productos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setSeccionActiva("categorias")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                seccionActiva === "categorias"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Categorías
            </button>
            <button
              onClick={() => setSeccionActiva("exportacion")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                seccionActiva === "exportacion"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Exportación
            </button>
            <button
              onClick={() => setSeccionActiva("desviaciones")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                seccionActiva === "desviaciones"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Desviaciones y Acciones
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-6 py-8">
        {seccionActiva === "resumen" && (
          <ResumenGeneral
            totales={totales}
            porcentajes={porcentajes}
          />
        )}
        {seccionActiva === "recepciones" && (
          <Recepciones
            recepciones={datosCierre.recepciones}
          />
        )}
        {seccionActiva === "embalaje" && (
          <DetalleEmbalaje
            datosEmbalaje={datosCierre.embalaje}
          />
        )}
        {seccionActiva === "productos" && (
          <DetalleProductos
            datosProductos={datosCierre.productos}
            porcentajes={porcentajes}
          />
        )}
        {seccionActiva === "categorias" && (
          <DetalleCategorias
            datosCategorias={datosCierre.categorias}
          />
        )}
        {seccionActiva === "exportacion" && (
          <Exportacion />
        )}
        {seccionActiva === "desviaciones" && (
          <DesviacionesAcciones visible={true} />
        )}
      </main>

      {/* Footer con el mismo estilo que el header */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-sky-400 text-white py-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} - Antarcold</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
