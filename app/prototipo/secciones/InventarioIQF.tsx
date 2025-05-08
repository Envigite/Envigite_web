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
  Treemap,
} from "recharts";

// Datos de ejemplo para la cámara IQF
const productosCamara = [
  {
    id: "Frutillas IQF",
    name: "Palets IQF Frutillas",
    size: 35000,
    tipo: "Frutillas",
  },
  {
    id: "Frambuesas IQF",
    name: "Palets IQF Frambuesas",
    size: 12000,
    tipo: "Frambuesas",
  },
  { id: "Moras IQF", name: "Palets IQF Moras", size: 8500, tipo: "Moras" },
  { id: "Frutillas A", name: "Frutillas A", size: 8000, tipo: "Frutillas" },
  { id: "Frutillas B", name: "Frutillas B", size: 6500, tipo: "Frutillas" },
  { id: "Frutillas AB", name: "Frutillas AB", size: 4200, tipo: "Frutillas" },
  { id: "Frutillas S", name: "Frutillas S", size: 5800, tipo: "Frutillas" },
  { id: "Frutillas M", name: "Frutillas M", size: 5200, tipo: "Frutillas" },
  { id: "Frutillas L", name: "Frutillas L", size: 4800, tipo: "Frutillas" },
  { id: "Jugo Frutilla", name: "Jugo Frutilla", size: 7500, tipo: "Frutillas" },
  {
    id: "Pulpa Frutilla",
    name: "Pulpa Frutilla",
    size: 6800,
    tipo: "Frutillas",
  },
  {
    id: "Totes Frutilla",
    name: "Totes Frutilla",
    size: 9500,
    tipo: "Frutillas",
  },
  {
    id: "Cajas 13x2Lb",
    name: "Cajas 13x2Lb Frutilla",
    size: 7200,
    tipo: "Frutillas",
  },
  {
    id: "Cajas 14x2Lb",
    name: "Cajas 14x2Lb Frutilla",
    size: 8500,
    tipo: "Frutillas",
  },
  {
    id: "Cajas 6x5Lb",
    name: "Cajas 6x5Lb Frutilla",
    size: 9200,
    tipo: "Frutillas",
  },
  { id: "Granel", name: "Granel Frutilla", size: 11000, tipo: "Frutillas" },
];

const distribucionPorTipo = [
  { name: "Frutillas", value: 1929500 },
  { name: "Frambuesas", value: 912000 },
  { name: "Moras", value: 2098500 },
];

const distribucionPorFormato = [
  { name: "Palets IQF", value: 55500 },
  { name: "Categorías", value: 34500 },
  { name: "Cajas", value: 24900 },
  { name: "Jugo/Pulpa", value: 14300 },
  { name: "Totes", value: 9500 },
  { name: "Granel", value: 11000 },
];

const tipoColores = {
  Frutillas: "#FF6B6B",
  Frambuesas: "#4ECDC4",
  Moras: "#845EC2",
};

const ocupacionCamara = {
  capacidadTotal: 20000000, // kg
  ocupacionActual: 9208000, // kg
  paletsTotal: 26000,
  paletsOcupados: 11510,
  ultimosMovimientos: [
    {
      tipo: "Entrada",
      producto: "Palets IQF Frutillas",
      cantidad: 12,
      peso: 1512,
      fecha: "07/06 14:30",
    },
    {
      tipo: "Salida",
      producto: "Cajas 13x2Lb Frutilla",
      cantidad: 48,
      peso: 1105,
      fecha: "07/06 11:15",
    },
    {
      tipo: "Entrada",
      producto: "Palets IQF Frambuesas",
      cantidad: 8,
      peso: 1008,
      fecha: "07/06 09:45",
    },
    {
      tipo: "Salida",
      producto: "Frutillas S",
      cantidad: 48,
      peso: 1200,
      fecha: "06/06 16:20",
    },
    {
      tipo: "Entrada",
      producto: "Jugo Frutilla",
      cantidad: 10,
      peso: 2500,
      fecha: "06/06 13:10",
    },
  ],
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

// Componente personalizado para el TreeMap
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, index, depth } = props;

  if (!productosCamara[index]) return null;
  const current = productosCamara[index];

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            tipoColores[current.tipo as keyof typeof tipoColores] || "#8884d8",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {width > 55 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
          fontWeight="bold"
        >
          {current.name}
        </text>
      )}
      {width > 55 && (
        <text
          x={x + width / 2}
          y={y + height / 2 - 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {(current.size / 1000).toFixed(1)} ton
        </text>
      )}
    </g>
  );
};

export default function InventarioIQF() {
  const [filtroProducto, setFiltroProducto] = useState("todos");

  const porcentajeOcupacion = Math.round(
    (ocupacionCamara.ocupacionActual / ocupacionCamara.capacidadTotal) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Inventario Cámara IQF
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroProducto("todos")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroProducto === "todos"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltroProducto("frutillas")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroProducto === "frutillas"
                ? "bg-red-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Frutillas
          </button>
          <button
            onClick={() => setFiltroProducto("frambuesas")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroProducto === "frambuesas"
                ? "bg-teal-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Frambuesas
          </button>
          <button
            onClick={() => setFiltroProducto("moras")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filtroProducto === "moras"
                ? "bg-purple-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Moras
          </button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ocupación Cámara
          </h3>
          <p className="text-3xl font-bold text-indigo-600 mb-1">
            {porcentajeOcupacion}%
          </p>
          <p className="text-sm text-gray-500">
            {ocupacionCamara.ocupacionActual.toLocaleString("es-ES")} /{" "}
            {ocupacionCamara.capacidadTotal.toLocaleString("es-ES")} kg
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${porcentajeOcupacion}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ocupación Palets
          </h3>
          <p className="text-3xl font-bold text-blue-600 mb-1">
            {Math.round(
              (ocupacionCamara.paletsOcupados / ocupacionCamara.paletsTotal) *
                100
            )}
            %
          </p>
          <p className="text-sm text-gray-500">
            {ocupacionCamara.paletsOcupados} / {ocupacionCamara.paletsTotal}{" "}
            palets
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${
                  (ocupacionCamara.paletsOcupados /
                    ocupacionCamara.paletsTotal) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Tipo de Producto
          </h3>
          <div className="flex items-center">
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribucionPorTipo}
                    cx="50%"
                    cy="50%"
                    innerRadius={22}
                    outerRadius={40}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {distribucionPorTipo.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-4">
              {distribucionPorTipo.map((item, index) => (
                <div key={index} className="flex items-center text-sm mb-1">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>
                    {item.name}:{" "}
                    {Math.round(
                      (item.value / ocupacionCamara.ocupacionActual) * 100
                    )}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Últimos Movimientos
          </h3>
          <div
            className="space-y-2 overflow-y-auto"
            style={{ maxHeight: "120px" }}
          >
            {ocupacionCamara.ultimosMovimientos.slice(0, 3).map((mov, idx) => (
              <div
                key={idx}
                className={`flex items-center text-sm p-2 rounded-md ${
                  mov.tipo === "Entrada"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    mov.tipo === "Entrada" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <div className="flex-1">
                  <p className="font-medium">{mov.producto}</p>
                  <p className="text-xs opacity-80">
                    {mov.cantidad} unidades • {mov.fecha}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mapa de ocupación */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Distribución de Productos en Cámara
        </h3>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productosCamara.filter(
                (item) =>
                  filtroProducto === "todos" ||
                  (filtroProducto === "frutillas" &&
                    item.tipo === "Frutillas") ||
                  (filtroProducto === "frambuesas" &&
                    item.tipo === "Frambuesas") ||
                  (filtroProducto === "moras" && item.tipo === "Moras")
              )}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip
                formatter={(value: number) =>
                  `${(value / 1000).toFixed(1)} toneladas`
                }
              />
              <Legend />
              <Bar dataKey="size" name="Peso (kg)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por tipo de producto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribución por Tipo
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distribucionPorTipo}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip
                  formatter={(value: number) => [
                    `${(value / 1000).toFixed(1)} toneladas`,
                    "Peso",
                  ]}
                />
                <Legend />
                <Bar dataKey="value" name="Peso (kg)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por formato */}
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
                <Tooltip
                  formatter={(value: number) => [
                    `${(value / 1000).toFixed(1)} toneladas (${(
                      (value / ocupacionCamara.ocupacionActual) *
                      100
                    ).toFixed(1)}%)`,
                    "Peso",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla de inventario */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Inventario Detallado
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peso Total (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % del Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productosCamara
              .filter(
                (item) =>
                  filtroProducto === "todos" ||
                  (filtroProducto === "frutillas" &&
                    item.tipo === "Frutillas") ||
                  (filtroProducto === "frambuesas" &&
                    item.tipo === "Frambuesas") ||
                  (filtroProducto === "moras" && item.tipo === "Moras")
              )
              .map((producto, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {producto.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        producto.tipo === "Frutillas"
                          ? "bg-red-100 text-red-800"
                          : producto.tipo === "Frambuesas"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {producto.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {producto.size.toLocaleString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(
                      (producto.size / ocupacionCamara.ocupacionActual) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
