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
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Datos de ejemplo para el lavado
const datosLavado = [
  {
    fecha: "01/06",
    kilosLavados: 8330,
    jugo: 250,
    hongo: 150,
    frutaMalDespezonada: 180,
    desecho: 90,
  },
  {
    fecha: "02/06",
    kilosLavados: 7820,
    jugo: 235,
    hongo: 140,
    frutaMalDespezonada: 165,
    desecho: 85,
  },
  {
    fecha: "03/06",
    kilosLavados: 10200,
    jugo: 306,
    hongo: 184,
    frutaMalDespezonada: 214,
    desecho: 96,
  },
  {
    fecha: "04/06",
    kilosLavados: 9180,
    jugo: 275,
    hongo: 165,
    frutaMalDespezonada: 193,
    desecho: 87,
  },
  {
    fecha: "05/06",
    kilosLavados: 7735,
    jugo: 232,
    hongo: 139,
    frutaMalDespezonada: 162,
    desecho: 82,
  },
  {
    fecha: "06/06",
    kilosLavados: 9520,
    jugo: 286,
    hongo: 171,
    frutaMalDespezonada: 200,
    desecho: 93,
  },
  {
    fecha: "07/06",
    kilosLavados: 9775,
    jugo: 293,
    hongo: 176,
    frutaMalDespezonada: 205,
    desecho: 89,
  },
];

const mermaActual = [
  { name: "Producto Neto", value: 92 },
  { name: "Jugo", value: 3 },
  { name: "Hongo", value: 2 },
  { name: "Fruta Mal Despezonada", value: 2 },
  { name: "Desecho", value: 1 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const lavadoActual = {
  recepcionID: 245,
  productor: "Nelson Express",
  kilosDespezonados: 2800,
  kilosLavados: 2100,
  kilosPendientes: 700,
  paletsLavados: 18,
  rejillasIQF: 126,
  rendimiento: 94.2,
  consumoAgua: 8500, // litros
  velocidad: 420, // kg/hora
  estadoProceso: "En proceso",
};

export default function Lavado() {
  const [filtroTiempo, setFiltroTiempo] = useState("semana");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Proceso de Lavado</h2>
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
        </div>
      </div>

      {/* Proceso actual de lavado */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cyan-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Lavado en Curso
          </h3>
          <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-sm font-medium">
            {lavadoActual.estadoProceso}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Recepción ID</p>
            <p className="text-xl font-semibold">#{lavadoActual.recepcionID}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Productor</p>
            <p className="text-xl font-semibold">{lavadoActual.productor}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Velocidad</p>
            <p className="text-xl font-semibold">
              {lavadoActual.velocidad} kg/h
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Consumo de Agua</p>
            <p className="text-xl font-semibold">
              {lavadoActual.consumoAgua.toLocaleString("es-ES")} L
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <p className="text-sm text-cyan-700">Kilos Lavados</p>
            <p className="text-2xl font-bold text-cyan-800">
              {lavadoActual.kilosLavados.toLocaleString("es-ES")} kg
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-cyan-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (lavadoActual.kilosLavados /
                      lavadoActual.kilosDespezonados) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {Math.round(
                (lavadoActual.kilosLavados / lavadoActual.kilosDespezonados) *
                  100
              )}
              % completado
            </p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
            <p className="text-sm text-teal-700">Palets IQF Preparados</p>
            <p className="text-2xl font-bold text-teal-800">
              {lavadoActual.paletsLavados}
            </p>
            <p className="text-sm text-teal-600">
              {lavadoActual.rejillasIQF} rejillas verdes
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-700">Rendimiento</p>
            <p className="text-2xl font-bold text-emerald-800">
              {lavadoActual.rendimiento}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-emerald-600 h-2.5 rounded-full"
                style={{ width: `${lavadoActual.rendimiento}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de lavado diario */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kilos Lavados por Día
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosLavado}
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
                <Bar
                  dataKey="kilosLavados"
                  name="Kilos Lavados"
                  fill="#06b6d4"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de merma */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Composición de Producto (%)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mermaActual}
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
                  {mermaActual.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráfico de merma detallada */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Evolución de Merma por Día
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={datosLavado}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `${value.toLocaleString("es-ES")} kg`,
                  "",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="jugo"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Jugo"
              />
              <Line
                type="monotone"
                dataKey="hongo"
                stroke="#82ca9d"
                name="Hongo"
              />
              <Line
                type="monotone"
                dataKey="frutaMalDespezonada"
                stroke="#ffc658"
                name="Fruta Mal Despezonada"
              />
              <Line
                type="monotone"
                dataKey="desecho"
                stroke="#ff7300"
                name="Desecho"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de lavado reciente */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Resumen de Lavado Reciente
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilos Lavados
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jugo (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hongo (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                F. Mal Desp. (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Desecho (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rendimiento
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {datosLavado.map((dia, index) => {
              const mermaTotal =
                dia.jugo + dia.hongo + dia.frutaMalDespezonada + dia.desecho;
              const rendimiento =
                ((dia.kilosLavados - mermaTotal) / dia.kilosLavados) * 100;

              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.kilosLavados.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.jugo.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.hongo.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.frutaMalDespezonada.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.desecho.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        rendimiento > 90
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {rendimiento.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
