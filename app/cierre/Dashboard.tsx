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
          <p className="text-xl text-center text-blue-100">
            Ultra Berries
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4 flex-grow">
        {/* Navegación */}
        <div className="flex flex-wrap justify-center gap-3 my-6">
          <button
            onClick={() => setSeccionActiva("resumen")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md ${
              seccionActiva === "resumen"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            }`}
          >
            Resumen General
          </button>
          <button
            onClick={() => setSeccionActiva("recepciones")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md ${
              seccionActiva === "recepciones"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            }`}
          >
            Recepciones
          </button>
          <button
            onClick={() => setSeccionActiva("embalaje")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md ${
              seccionActiva === "embalaje"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            }`}
          >
            Detalle Embalaje
          </button>
          <button
            onClick={() => setSeccionActiva("productos")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md ${
              seccionActiva === "productos"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            }`}
          >
            Detalle Productos
          </button>
          <button
            onClick={() => setSeccionActiva("categorias")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md ${
              seccionActiva === "categorias"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            }`}
          >
            Detalle Categorías
          </button>
        </div>

        {/* Contenido según sección activa */}
        <div className="bg-white rounded-xl shadow-xl p-6 border border-blue-100">
          {seccionActiva === "resumen" && (
            <ResumenGeneral totales={totales} porcentajes={porcentajes} />
          )}

          {seccionActiva === "recepciones" && (
            <Recepciones recepciones={datosCierre.recepciones} />
          )}

          {seccionActiva === "embalaje" && (
            <DetalleEmbalaje datosEmbalaje={datosCierre.embalaje} />
          )}

          {seccionActiva === "productos" && (
            <DetalleProductos
              datosProductos={datosCierre.productos}
              porcentajes={porcentajes}
            />
          )}

          {seccionActiva === "categorias" && (
            <DetalleCategorias datosCategorias={datosCierre.categorias} />
          )}
        </div>
      </div>
      
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
