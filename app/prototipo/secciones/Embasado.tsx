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
} from "recharts";

// Datos de ejemplo para embasado
const datosEmbasado = [
  {
    fecha: "01/06",
    kilosEmbasados: 7500,
    cajas: 1250,
    a: 3375,
    b: 2625,
    ab: 1000,
    s: 225,
    m: 150,
    l: 125,
  },
  {
    fecha: "02/06",
    kilosEmbasados: 7000,
    cajas: 1167,
    a: 3150,
    b: 2450,
    ab: 935,
    s: 210,
    m: 140,
    l: 115,
  },
  {
    fecha: "03/06",
    kilosEmbasados: 9200,
    cajas: 1533,
    a: 4140,
    b: 3220,
    ab: 1230,
    s: 275,
    m: 185,
    l: 150,
  },
  {
    fecha: "04/06",
    kilosEmbasados: 8500,
    cajas: 1417,
    a: 3825,
    b: 2975,
    ab: 1135,
    s: 255,
    m: 170,
    l: 140,
  },
  {
    fecha: "05/06",
    kilosEmbasados: 7200,
    cajas: 1200,
    a: 3240,
    b: 2520,
    ab: 960,
    s: 215,
    m: 145,
    l: 120,
  },
  {
    fecha: "06/06",
    kilosEmbasados: 8700,
    cajas: 1450,
    a: 3915,
    b: 3045,
    ab: 1160,
    s: 260,
    m: 175,
    l: 145,
  },
  {
    fecha: "07/06",
    kilosEmbasados: 8800,
    cajas: 1467,
    a: 3960,
    b: 3080,
    ab: 1175,
    s: 265,
    m: 175,
    l: 145,
  },
];

const distribucionPorFormato = [
  { name: "Cajas 13x2Lb", value: 32 },
  { name: "Cajas 14x2Lb", value: 28 },
  { name: "Cajas 6x5Lb", value: 15 },
  { name: "IQF Granel", value: 18 },
  { name: "Totes", value: 7 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const embasadoActual = {
  produccion: 245,
  producto: "Frutilla IQF",
  totalKilos: 2800,
  kilosEmbasados: 2000,
  cajasProducidas: 333,
  paletsArmados: 14,
  velocidad: 375, // kg/hora
  operarios: 12,
  eficiencia: 96.2,
  estadoProceso: "En proceso",
};

export default function Embasado() {
  const [filtroTiempo, setFiltroTiempo] = useState("semana");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Proceso de Embasado
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

      {/* Proceso actual de embasado */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Embasado en Curso
          </h3>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
            {embasadoActual.estadoProceso}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Producción ID</p>
            <p className="text-xl font-semibold">
              #{embasadoActual.produccion}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Producto</p>
            <p className="text-xl font-semibold">{embasadoActual.producto}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Operarios</p>
            <p className="text-xl font-semibold">{embasadoActual.operarios}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Velocidad</p>
            <p className="text-xl font-semibold">
              {embasadoActual.velocidad} kg/h
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p className="text-sm text-amber-700">Kilos Embasados</p>
            <p className="text-2xl font-bold text-amber-800">
              {embasadoActual.kilosEmbasados.toLocaleString("es-ES")} kg
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-amber-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (embasadoActual.kilosEmbasados /
                      embasadoActual.totalKilos) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {Math.round(
                (embasadoActual.kilosEmbasados / embasadoActual.totalKilos) *
                  100
              )}
              % completado
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <p className="text-sm text-orange-700">Cajas Producidas</p>
            <p className="text-2xl font-bold text-orange-800">
              {embasadoActual.cajasProducidas}
            </p>
            <p className="text-sm text-orange-600">
              {embasadoActual.paletsArmados} palets armados
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-700">Eficiencia</p>
            <p className="text-2xl font-bold text-emerald-800">
              {embasadoActual.eficiencia}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-emerald-600 h-2.5 rounded-full"
                style={{ width: `${embasadoActual.eficiencia}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de embasado diario */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kilos Embasados por Día
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosEmbasado}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toLocaleString("es-ES")} kg`,
                    "Kilos",
                  ]}
                  labelFormatter={(label: string) => `Fecha: ${label}`}
                />
                <Legend />
                <Bar
                  dataKey="kilosEmbasados"
                  name="Kilos Embasados"
                  fill="#F59E0B"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de distribución por formato */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribución por Formato
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribucionPorFormato}
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
                  {distribucionPorFormato.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráfico de distribución de categorías */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Distribución de Categorías por Día
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={datosEmbasado}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value} kg`} />
              <Legend />
              <Bar dataKey="a" name="Categoría A" stackId="a" fill="#8884d8" />
              <Bar dataKey="b" name="Categoría B" stackId="a" fill="#82ca9d" />
              <Bar
                dataKey="ab"
                name="Categoría AB"
                stackId="a"
                fill="#ffc658"
              />
              <Bar dataKey="s" name="Categoría S" stackId="a" fill="#ff7300" />
              <Bar dataKey="m" name="Categoría M" stackId="a" fill="#0088FE" />
              <Bar dataKey="l" name="Categoría L" stackId="a" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de producción diaria */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Resumen de Producción Diaria
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilos Embasados
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cajas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                A (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                B (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AB (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Otros (kg)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {datosEmbasado.map((dia, index) => {
              const otros = dia.s + dia.m + dia.l;
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.kilosEmbasados.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.cajas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.a.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.b.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dia.ab.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {otros.toLocaleString("es-ES")}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                TOTAL
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {datosEmbasado
                  .reduce((sum, dia) => sum + dia.kilosEmbasados, 0)
                  .toLocaleString("es-ES")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {datosEmbasado
                  .reduce((sum, dia) => sum + dia.cajas, 0)
                  .toLocaleString("es-ES")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {datosEmbasado
                  .reduce((sum, dia) => sum + dia.a, 0)
                  .toLocaleString("es-ES")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {datosEmbasado
                  .reduce((sum, dia) => sum + dia.b, 0)
                  .toLocaleString("es-ES")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {datosEmbasado
                  .reduce((sum, dia) => sum + dia.ab, 0)
                  .toLocaleString("es-ES")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {datosEmbasado
                  .reduce((sum, dia) => sum + dia.s + dia.m + dia.l, 0)
                  .toLocaleString("es-ES")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
