"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// Datos comparativos entre temporadas
const datosComparativos = [
  { mes: "Enero", actual: 380000, anterior: 320000 },
  { mes: "Febrero", actual: 410000, anterior: 350000 },
  { mes: "Marzo", actual: 450000, anterior: 370000 },
  { mes: "Abril", actual: 430000, anterior: 380000 },
  { mes: "Mayo", actual: 420000, anterior: 370000 },
  { mes: "Junio", actual: 380000, anterior: 340000 },
  { mes: "Julio", actual: 0, anterior: 310000 },
  { mes: "Agosto", actual: 0, anterior: 290000 },
  { mes: "Septiembre", actual: 0, anterior: 300000 },
  { mes: "Octubre", actual: 0, anterior: 320000 },
  { mes: "Noviembre", actual: 0, anterior: 340000 },
  { mes: "Diciembre", actual: 0, anterior: 360000 },
];

// Datos de eficiencia por productor
const eficienciaProductores = [
  {
    productor: "Frutícola Sur",
    recepcion: 92,
    despezonado: 88,
    lavado: 94,
    embalaje: 91,
    total: 91.25,
  },
  {
    productor: "Agrícola Norte",
    recepcion: 89,
    despezonado: 91,
    lavado: 93,
    embalaje: 89,
    total: 90.5,
  },
  {
    productor: "Berries Express",
    recepcion: 95,
    despezonado: 93,
    lavado: 96,
    embalaje: 94,
    total: 94.5,
  },
  {
    productor: "Frutícola Central",
    recepcion: 90,
    despezonado: 89,
    lavado: 92,
    embalaje: 90,
    total: 90.25,
  },
];

// Datos de calidad por semana
const calidadSemanal = [
  { semana: "Sem 1", A: 45, B: 35, AB: 15, S: 3, M: 1, L: 1 },
  { semana: "Sem 2", A: 42, B: 38, AB: 13, S: 4, M: 2, L: 1 },
  { semana: "Sem 3", A: 40, B: 40, AB: 12, S: 5, M: 2, L: 1 },
  { semana: "Sem 4", A: 38, B: 42, AB: 10, S: 6, M: 3, L: 1 },
  { semana: "Sem 5", A: 35, B: 43, AB: 12, S: 5, M: 3, L: 2 },
  { semana: "Sem 6", A: 33, B: 45, AB: 12, S: 4, M: 4, L: 2 },
];

// Datos de desviaciones por área
const desviacionesPorArea = [
  { area: "Recepción", objetivo: 100, actual: 98, desvPos: 0, desvNeg: 2 },
  { area: "Despezonado", objetivo: 100, actual: 92, desvPos: 0, desvNeg: 8 },
  { area: "Lavado", objetivo: 100, actual: 95, desvPos: 0, desvNeg: 5 },
  { area: "Embalaje", objetivo: 100, actual: 94, desvPos: 0, desvNeg: 6 },
  { area: "Exportación", objetivo: 100, actual: 103, desvPos: 3, desvNeg: 0 },
];

// Datos de radar de desempeño
const desempeno = [
  { subject: "Producción", A: 120, B: 110, fullMark: 150 },
  { subject: "Eficiencia", A: 98, B: 130, fullMark: 150 },
  { subject: "Calidad", A: 86, B: 130, fullMark: 150 },
  { subject: "Rendimiento", A: 99, B: 100, fullMark: 150 },
  { subject: "Velocidad", A: 85, B: 90, fullMark: 150 },
  { subject: "Costo", A: 65, B: 85, fullMark: 150 },
];

export default function EstadisticasComparativas() {
  const [periodoComparativo, setPeriodoComparativo] = useState("mes");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Estadísticas Comparativas
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPeriodoComparativo("semana")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              periodoComparativo === "semana"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Semanal
          </button>
          <button
            onClick={() => setPeriodoComparativo("mes")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              periodoComparativo === "mes"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setPeriodoComparativo("temporada")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              periodoComparativo === "temporada"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Temporada
          </button>
        </div>
      </div>

      {/* Tarjetas de métricas clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Producción Total
          </h3>
          <p className="text-3xl font-bold text-green-600">2,470 ton</p>
          <p className="text-sm text-gray-500 mt-1">
            vs 2,180 ton temporada anterior
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 font-medium">+13.3%</span>
            <svg
              className="w-4 h-4 text-green-600 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Eficiencia Global
          </h3>
          <p className="text-3xl font-bold text-blue-600">91.6%</p>
          <p className="text-sm text-gray-500 mt-1">
            vs 89.2% temporada anterior
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 font-medium">+2.4%</span>
            <svg
              className="w-4 h-4 text-green-600 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Calidad Premium
          </h3>
          <p className="text-3xl font-bold text-purple-600">38.8%</p>
          <p className="text-sm text-gray-500 mt-1">
            vs 35.5% temporada anterior
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 font-medium">+3.3%</span>
            <svg
              className="w-4 h-4 text-green-600 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Costo por Kg
          </h3>
          <p className="text-3xl font-bold text-amber-600">$1.24</p>
          <p className="text-sm text-gray-500 mt-1">
            vs $1.36 temporada anterior
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 font-medium">-8.8%</span>
            <svg
              className="w-4 h-4 text-green-600 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparativa entre temporadas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Comparativa entre Temporadas
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={datosComparativos}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${(value / 1000).toFixed(1)} toneladas`,
                    "",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="anterior"
                  name="Temporada Anterior"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Temporada Actual"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calidad por semana */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribución de Calidades por Semana
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={calidadSemanal}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
                <Legend />
                <Bar
                  dataKey="A"
                  name="Categoría A"
                  stackId="a"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="B"
                  name="Categoría B"
                  stackId="a"
                  fill="#82ca9d"
                />
                <Bar
                  dataKey="AB"
                  name="Categoría AB"
                  stackId="a"
                  fill="#ffc658"
                />
                <Bar
                  dataKey="S"
                  name="Categoría S"
                  stackId="a"
                  fill="#ff7300"
                />
                <Bar
                  dataKey="M"
                  name="Categoría M"
                  stackId="a"
                  fill="#0088FE"
                />
                <Bar
                  dataKey="L"
                  name="Categoría L"
                  stackId="a"
                  fill="#00C49F"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de desviaciones */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Desviaciones por Área (%)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={desviacionesPorArea}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === "objetivo") return [`${value}%`, "Objetivo"];
                    if (name === "actual") return [`${value}%`, "Actual"];
                    if (name === "desvPos")
                      return [`+${value}%`, "Desviación Positiva"];
                    return [`-${value}%`, "Desviación Negativa"];
                  }}
                />
                <Legend />
                <Bar
                  dataKey="desvNeg"
                  name="Desviación Negativa"
                  fill="#ff0000"
                />
                <Bar
                  dataKey="desvPos"
                  name="Desviación Positiva"
                  fill="#00ff00"
                />
                <Line
                  type="monotone"
                  dataKey="objetivo"
                  name="Objetivo"
                  stroke="#ff7300"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual"
                  stroke="#387908"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de radar de desempeño */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Desempeño Comparativo
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={desempeno}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="Temporada Actual"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Temporada Anterior"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla de eficiencia por productor */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Eficiencia por Productor
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Productor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recepción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Despezonado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lavado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Embalaje
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eficienciaProductores.map((productor, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {productor.productor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`text-sm ${
                        productor.recepcion >= 92
                          ? "text-green-700"
                          : productor.recepcion >= 85
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {productor.recepcion}%
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          productor.recepcion >= 92
                            ? "bg-green-500"
                            : productor.recepcion >= 85
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${productor.recepcion}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`text-sm ${
                        productor.despezonado >= 92
                          ? "text-green-700"
                          : productor.despezonado >= 85
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {productor.despezonado}%
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          productor.despezonado >= 92
                            ? "bg-green-500"
                            : productor.despezonado >= 85
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${productor.despezonado}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`text-sm ${
                        productor.lavado >= 92
                          ? "text-green-700"
                          : productor.lavado >= 85
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {productor.lavado}%
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          productor.lavado >= 92
                            ? "bg-green-500"
                            : productor.lavado >= 85
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${productor.lavado}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`text-sm ${
                        productor.embalaje >= 92
                          ? "text-green-700"
                          : productor.embalaje >= 85
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {productor.embalaje}%
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          productor.embalaje >= 92
                            ? "bg-green-500"
                            : productor.embalaje >= 85
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${productor.embalaje}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-medium ${
                        productor.total >= 92
                          ? "text-green-700"
                          : productor.total >= 85
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {productor.total}%
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          productor.total >= 92
                            ? "bg-green-500"
                            : productor.total >= 85
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${productor.total}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
