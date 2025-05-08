"use client";

import { useState } from "react";
import {
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
  LineChart,
  Line,
  ComposedChart,
  Area,
} from "recharts";

// Datos de ejemplo para exportación
const datosExportacion = [
  {
    fecha: "01/06",
    contenedores: 2,
    palets: 36,
    kilos: 28800,
    nacional: 7200,
    internacional: 21600,
    exportadorA: 14400,
    exportadorB: 7200,
    exportadorC: 7200,
  },
  {
    fecha: "02/06",
    contenedores: 1,
    palets: 18,
    kilos: 14400,
    nacional: 3600,
    internacional: 10800,
    exportadorA: 3600,
    exportadorB: 7200,
    exportadorC: 3600,
  },
  {
    fecha: "03/06",
    contenedores: 3,
    palets: 54,
    kilos: 43200,
    nacional: 10800,
    internacional: 32400,
    exportadorA: 21600,
    exportadorB: 14400,
    exportadorC: 7200,
  },
  {
    fecha: "04/06",
    contenedores: 2,
    palets: 36,
    kilos: 28800,
    nacional: 7200,
    internacional: 21600,
    exportadorA: 14400,
    exportadorB: 7200,
    exportadorC: 7200,
  },
  {
    fecha: "05/06",
    contenedores: 1,
    palets: 18,
    kilos: 14400,
    nacional: 3600,
    internacional: 10800,
    exportadorA: 3600,
    exportadorB: 7200,
    exportadorC: 3600,
  },
  {
    fecha: "06/06",
    contenedores: 2,
    palets: 36,
    kilos: 28800,
    nacional: 7200,
    internacional: 21600,
    exportadorA: 14400,
    exportadorB: 7200,
    exportadorC: 7200,
  },
  {
    fecha: "07/06",
    contenedores: 2,
    palets: 36,
    kilos: 28800,
    nacional: 10800,
    internacional: 18000,
    exportadorA: 10800,
    exportadorB: 10800,
    exportadorC: 7200,
  },
];

const distribucionDestinos = [
  { name: "Nacional", value: 50400 },
  { name: "EE.UU.", value: 64800 },
  { name: "Europa", value: 36000 },
  { name: "Asia", value: 36000 },
];

const distribucionExportadores = [
  { name: "Exportador A", value: 82800 },
  { name: "Exportador B", value: 61200 },
  { name: "Exportador C", value: 43200 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const exportacionActual = {
  contenedorID: "CONT-2456",
  exportador: "Exportador A",
  destino: "EE.UU.",
  fechaEmbarque: new Date().toLocaleDateString(),
  horaEmbarque: "14:30",
  paletsAsignados: 18,
  paletsEmbarcados: 12,
  kilosTotales: 14400,
  kilosEmbarcados: 9600,
  producto: "Frutilla IQF",
  estadoExportacion: "En proceso",
};

// Datos de contenedores en proceso
const contenedoresActuales = [
  {
    id: "CONT-2456",
    exportador: "Exportador A",
    destino: "EE.UU.",
    producto: "Frutilla IQF",
    palets: 18,
    kilos: 14400,
    estadoExportacion: "En proceso",
    progreso: 67,
    fechaEmbarque: new Date().toLocaleDateString(),
  },
  {
    id: "CONT-2457",
    exportador: "Exportador B",
    destino: "Europa",
    producto: "Frambuesa IQF",
    palets: 18,
    kilos: 14400,
    estadoExportacion: "Programado",
    progreso: 0,
    fechaEmbarque: new Date(Date.now() + 86400000).toLocaleDateString(),
  },
  {
    id: "CONT-2458",
    exportador: "Exportador C",
    destino: "Asia",
    producto: "Mix Berries",
    palets: 18,
    kilos: 14400,
    estadoExportacion: "Programado",
    progreso: 0,
    fechaEmbarque: new Date(Date.now() + 172800000).toLocaleDateString(),
  },
];

export default function Exportacion() {
  const [filtroTiempo, setFiltroTiempo] = useState("semana");
  const [filtroDestino, setFiltroDestino] = useState("todos");

  // Calcular totales por destino
  const totalNacional = datosExportacion.reduce(
    (sum, item) => sum + item.nacional,
    0
  );
  const totalInternacional = datosExportacion.reduce(
    (sum, item) => sum + item.internacional,
    0
  );
  const totalExportado = totalNacional + totalInternacional;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Exportación</h2>
        <div className="flex flex-wrap gap-2">
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
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Exportado
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {(totalExportado / 1000).toFixed(1)} ton
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {datosExportacion.reduce((sum, item) => sum + item.palets, 0)}{" "}
            palets en total
          </p>
          <div className="flex justify-between items-center mt-3">
            <div>
              <p className="text-xs text-gray-500">Nacional</p>
              <p className="text-sm font-medium">
                {Math.round((totalNacional / totalExportado) * 100)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Internacional</p>
              <p className="text-sm font-medium">
                {Math.round((totalInternacional / totalExportado) * 100)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Contenedores</p>
              <p className="text-sm font-medium">
                {datosExportacion.reduce(
                  (sum, item) => sum + item.contenedores,
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Promedio Diario
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {(totalExportado / datosExportacion.length / 1000).toFixed(1)} ton
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {(
              datosExportacion.reduce((sum, item) => sum + item.palets, 0) /
              datosExportacion.length
            ).toFixed(1)}{" "}
            palets / día
          </p>
          <div className="mt-3">
            <p className="text-xs text-gray-500">Contenedores / día</p>
            <p className="text-sm font-medium">
              {(
                datosExportacion.reduce(
                  (sum, item) => sum + item.contenedores,
                  0
                ) / datosExportacion.length
              ).toFixed(1)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Top Destino
          </h3>
          <p className="text-3xl font-bold text-blue-600">EE.UU.</p>
          <p className="text-sm text-gray-500 mt-1">
            {(distribucionDestinos.find((d) => d.name === "EE.UU")?.value ||
              0) / 1000}{" "}
            toneladas (
            {Math.round(
              ((distribucionDestinos.find((d) => d.name === "EE.UU")?.value ||
                0) /
                totalExportado) *
                100
            )}
            %)
          </p>
          <div className="mt-3">
            <p className="text-xs text-gray-500">Top Exportador</p>
            <p className="text-sm font-medium">
              Exportador A (
              {Math.round(
                ((distribucionExportadores.find(
                  (d) => d.name === "Exportador A"
                )?.value || 0) /
                  totalExportado) *
                  100
              )}
              %)
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Exportación Actual
          </h3>
          <p className="text-xl font-bold text-teal-600">
            {exportacionActual.contenedorID}
          </p>
          <p className="text-sm text-gray-500">
            {exportacionActual.exportador} • {exportacionActual.destino}
          </p>
          <div className="mt-2">
            <p className="text-xs text-gray-500">Progreso</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-teal-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (exportacionActual.paletsEmbarcados /
                      exportacionActual.paletsAsignados) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {Math.round(
                (exportacionActual.paletsEmbarcados /
                  exportacionActual.paletsAsignados) *
                  100
              )}
              % completado
            </p>
          </div>
        </div>
      </div>

      {/* Contenedores en proceso */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Contenedores en Proceso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contenedoresActuales.map((contenedor, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-md font-bold">{contenedor.id}</h4>
                  <p className="text-sm text-gray-600">{contenedor.producto}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    contenedor.estadoExportacion === "En proceso"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {contenedor.estadoExportacion}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Exportador:</span>
                  <span className="font-medium">{contenedor.exportador}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Destino:</span>
                  <span className="font-medium">{contenedor.destino}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Embarque:</span>
                  <span className="font-medium">
                    {contenedor.fechaEmbarque}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Palets:</span>
                  <span className="font-medium">{contenedor.palets}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kilos:</span>
                  <span className="font-medium">
                    {contenedor.kilos.toLocaleString("es-ES")} kg
                  </span>
                </div>
              </div>
              {contenedor.estadoExportacion === "En proceso" && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{ width: `${contenedor.progreso}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-gray-500">
                    {contenedor.progreso}% completado
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exportación por día */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Exportación por Día
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={datosExportacion}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === "contenedores")
                      return [`${value} unidades`, "Contenedores"];
                    if (name === "palets")
                      return [`${value} unidades`, "Palets"];
                    return [`${(value / 1000).toFixed(1)} toneladas`, "Kilos"];
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="kilos"
                  name="Kilos"
                  fill="#8884d8"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="contenedores"
                  name="Contenedores"
                  stroke="#ff7300"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por destino */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribución por Destino
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribucionDestinos}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({
                    name,
                    percent,
                  }: {
                    name: string;
                    percent: number;
                  }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {distribucionDestinos.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    `${(value / 1000).toFixed(1)} toneladas`
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráfico de exportadores */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Volumen por Exportador y Destino
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={datosExportacion}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  `${(value / 1000).toFixed(1)} toneladas`
                }
              />
              <Legend />
              <Bar
                dataKey="exportadorA"
                name="Exportador A"
                stackId="a"
                fill="#8884d8"
              />
              <Bar
                dataKey="exportadorB"
                name="Exportador B"
                stackId="a"
                fill="#82ca9d"
              />
              <Bar
                dataKey="exportadorC"
                name="Exportador C"
                stackId="a"
                fill="#ffc658"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de exportaciones */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Resumen de Exportaciones
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contenedores
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Palets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nacional
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Internacional
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {datosExportacion.map((dia, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.contenedores}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.palets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.kilos.toLocaleString("es-ES")} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.nacional.toLocaleString("es-ES")} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.internacional.toLocaleString("es-ES")} kg
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-medium">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                TOTAL
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {datosExportacion.reduce(
                  (sum, item) => sum + item.contenedores,
                  0
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {datosExportacion.reduce((sum, item) => sum + item.palets, 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {datosExportacion
                  .reduce((sum, item) => sum + item.kilos, 0)
                  .toLocaleString("es-ES")}{" "}
                kg
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {datosExportacion
                  .reduce((sum, item) => sum + item.nacional, 0)
                  .toLocaleString("es-ES")}{" "}
                kg
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {datosExportacion
                  .reduce((sum, item) => sum + item.internacional, 0)
                  .toLocaleString("es-ES")}{" "}
                kg
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
