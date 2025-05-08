"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Datos de ejemplo para la recepción
const recepcionesDiarias = [
  {
    fecha: "01/06",
    kilos: 10200,
    palets: 12,
    productor: "Agricola Frut JH SPA",
  },
  {
    fecha: "02/06",
    kilos: 9800,
    palets: 11,
    productor: "El rey de la frutilla",
  },
  { fecha: "03/06", kilos: 12500, palets: 14, productor: "Nelson Express" },
  {
    fecha: "04/06",
    kilos: 11300,
    palets: 13,
    productor: "Agricola Frut JH SPA",
  },
  { fecha: "05/06", kilos: 9500, palets: 11, productor: "Don Frambuesa" },
  {
    fecha: "06/06",
    kilos: 11700,
    palets: 13,
    productor: "El rey de la frutilla",
  },
  { fecha: "07/06", kilos: 12000, palets: 13, productor: "Nelson Express" },
];

const productoresData = [
  { name: "Agricola Frut JH SPA", value: 15000 },
  { name: "El rey de la frutilla", value: 12100 },
  { name: "Nelson Express", value: 4500 },
  { name: "Don Frambuesa", value: 9500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const recepcionActual = {
  id: 245,
  fecha: new Date().toLocaleDateString(),
  hora: new Date().toLocaleTimeString(),
  productor: "Agricola Frut JH SPA",
  kilosRecepcionados: 12500,
  kilosProcesados: 8130,
  palets: 14,
  rejillas: 1904,
  temperatura: 10.2,
  estadoRecepcion: "En proceso",
};

export default function Recepcion() {
  const [filtroTiempo, setFiltroTiempo] = useState("semana");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Recepción de Frutillas
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFiltroTiempo("dia")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroTiempo === "dia"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Día
          </button>
          <button
            onClick={() => setFiltroTiempo("semana")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroTiempo === "semana"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setFiltroTiempo("mes")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroTiempo === "mes"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setFiltroTiempo("temporada")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroTiempo === "temporada"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Temporada
          </button>
        </div>
      </div>

      {/* Tarjeta de recepción actual */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Recepción Actual
          </h3>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
            {recepcionActual.estadoRecepcion}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">ID de Recepción</p>
            <p className="text-xl font-semibold">{recepcionActual.id}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Productor</p>
            <p className="text-xl font-semibold">{recepcionActual.productor}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Fecha y Hora</p>
            <p className="text-lg font-semibold">
              {recepcionActual.fecha} - {recepcionActual.hora}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Temperatura</p>
            <p className="text-xl font-semibold">
              {recepcionActual.temperatura}°C
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-700">Kilos Recepcionados</p>
            <p className="text-2xl font-bold text-emerald-800">
              {recepcionActual.kilosRecepcionados.toLocaleString("es-ES")} kg
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">Palets / Rejillas</p>
            <p className="text-2xl font-bold text-blue-800">
              {recepcionActual.palets} / {recepcionActual.rejillas}
            </p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p className="text-sm text-amber-700">Kilos Procesados</p>
            <p className="text-2xl font-bold text-amber-800">
              {recepcionActual.kilosProcesados.toLocaleString("es-ES")} kg
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-amber-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (recepcionActual.kilosProcesados /
                      recepcionActual.kilosRecepcionados) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {Math.round(
                (recepcionActual.kilosProcesados /
                  recepcionActual.kilosRecepcionados) *
                  100
              )}
              % completado
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de recepción diaria */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recepción de Frutillas por Día
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recepcionesDiarias}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `${value.toLocaleString("es-ES")} kg`,
                    "Kilos",
                  ]}
                  labelFormatter={(label) => `Fecha: ${label}`}
                />
                <Legend />
                <Bar dataKey="kilos" name="Kilos" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de recepción por productor */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recepción por Productor
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productoresData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {productoresData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value.toLocaleString("es-ES")} kg`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla de recepciones recientes */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recepciones Recientes
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Productor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Palets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recepcionesDiarias.map((recepcion, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {recepcion.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {recepcion.productor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {recepcion.kilos.toLocaleString("es-ES")} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {recepcion.palets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completado
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
