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

// Datos de ejemplo para el despezonado
const datosDespezonado = [
  {
    fecha: "01/06",
    kilosDespezonados: 9800,
    hoja: 980,
    jugo: 490,
    desecho: 490,
  },
  {
    fecha: "02/06",
    kilosDespezonados: 9200,
    hoja: 920,
    jugo: 460,
    desecho: 500,
  },
  {
    fecha: "03/06",
    kilosDespezonados: 12000,
    hoja: 1200,
    jugo: 600,
    desecho: 510,
  },
  {
    fecha: "04/06",
    kilosDespezonados: 10800,
    hoja: 1080,
    jugo: 540,
    desecho: 485,
  },
  {
    fecha: "05/06",
    kilosDespezonados: 9100,
    hoja: 910,
    jugo: 455,
    desecho: 470,
  },
  {
    fecha: "06/06",
    kilosDespezonados: 11200,
    hoja: 1120,
    jugo: 560,
    desecho: 510,
  },
  {
    fecha: "07/06",
    kilosDespezonados: 11500,
    hoja: 1150,
    jugo: 575,
    desecho: 520,
  },
];

const mermaActual = [
  { name: "Producto Neto", value: 85 },
  { name: "Hoja", value: 10 },
  { name: "Jugo", value: 3 },
  { name: "Desecho", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const despezonadoActual = {
  recepcionID: 245,
  productor: "Nelson Express",
  kilosRecepcionados: 4500,
  kilosDespezonados: 2834,
  kilosPendientes: 700,
  paletsProcesados: 3,
  paletsResultantes: 2,
  rejillasDespezonadas: 408,
  eficiencia: 92.4,
  operarios: 28,
  velocidad: 350, // kg/hora
  estadoProceso: "En proceso",
};

export default function Despezonado() {
  const [filtroTiempo, setFiltroTiempo] = useState("semana");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Proceso de Despezonado
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
        </div>
      </div>

      {/* Proceso actual de despezonado */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Despezonado en Curso
          </h3>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            {despezonadoActual.estadoProceso}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Recepción ID</p>
            <p className="text-xl font-semibold">
              #{despezonadoActual.recepcionID}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Productor</p>
            <p className="text-xl font-semibold">
              {despezonadoActual.productor}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Operarios</p>
            <p className="text-xl font-semibold">
              {despezonadoActual.operarios}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Velocidad</p>
            <p className="text-xl font-semibold">
              {despezonadoActual.velocidad} kg/h
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">Kilos Despezonados</p>
            <p className="text-2xl font-bold text-blue-800">
              {despezonadoActual.kilosDespezonados.toLocaleString("es-ES")} kg
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (despezonadoActual.kilosDespezonados /
                      despezonadoActual.kilosRecepcionados) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {Math.round(
                (despezonadoActual.kilosDespezonados /
                  despezonadoActual.kilosRecepcionados) *
                  100
              )}
              % completado
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <p className="text-sm text-indigo-700">Rejillas Procesadas</p>
            <p className="text-2xl font-bold text-indigo-800">
              {despezonadoActual.rejillasDespezonadas}
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-700">Eficiencia</p>
            <p className="text-2xl font-bold text-emerald-800">
              {despezonadoActual.eficiencia}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-emerald-600 h-2.5 rounded-full"
                style={{ width: `${despezonadoActual.eficiencia}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de despezonado diario */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kilos Despezonados por Día
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosDespezonado}
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
                  dataKey="kilosDespezonados"
                  name="Kilos Despezonados"
                  fill="#6366f1"
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
          Detalle de Merma por Día
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={datosDespezonado}
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
              <Area
                type="monotone"
                dataKey="hoja"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                name="Hoja"
              />
              <Area
                type="monotone"
                dataKey="jugo"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
                name="Jugo"
              />
              <Area
                type="monotone"
                dataKey="desecho"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
                name="Desecho"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de despezonado reciente */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Resumen de Despezonado Reciente
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilos Despezonados
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hoja (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jugo (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Desecho (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Eficiencia
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {datosDespezonado.map((dia, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.kilosDespezonados.toLocaleString("es-ES")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.hoja.toLocaleString("es-ES")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.jugo.toLocaleString("es-ES")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dia.desecho.toLocaleString("es-ES")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ((dia.kilosDespezonados -
                        dia.hoja -
                        dia.jugo -
                        dia.desecho) /
                        dia.kilosDespezonados) *
                        100 >
                      85
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {(
                      ((dia.kilosDespezonados -
                        dia.hoja -
                        dia.jugo -
                        dia.desecho) /
                        dia.kilosDespezonados) *
                      100
                    ).toFixed(1)}
                    %
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
