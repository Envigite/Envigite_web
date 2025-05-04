import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DatosCategorias } from "../types";
import { motion } from "framer-motion";
import { Box, Package, Scale } from "lucide-react";
import { useState } from "react";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface DetalleCategoriaProps {
  datosCategorias: DatosCategorias;
}

const DetalleCategorias = ({ datosCategorias }: DetalleCategoriaProps) => {
  // Estados para controlar la visibilidad de las categorías
  const [showGranel] = useState(true);
  const [showBolsas6x5] = useState(true);
  const [showBolsas13x2] = useState(true);
  const [showBolsas14x2] = useState(true);
  const [showBolsas10x1] = useState(true);

  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Calcular total de palets por categoría
  const totalPalets =
    datosCategorias.granel +
    datosCategorias.bolsas6x5 +
    datosCategorias.bolsas13x2 +
    datosCategorias.bolsas14x2 +
    datosCategorias.bolsas10x1;

  // Calcular porcentajes
  const calcularPorcentaje = (valor: number) => {
    return ((valor / totalPalets) * 100).toFixed(1);
  };

  // Datos de peso por categoría
  const pesoPorCategoria = {
    granel: 191592.54,
    bolsas6x5: 9853.64,
    bolsas13x2: 15328.2,
    bolsas14x2: 4581.9,
    bolsas10x1: 930,
  };

  // Datos para el gráfico de barras de categorías - exactamente como DetalleEmbalaje
  const datosGraficoBarras = {
    labels: ["Categorías de Embalaje"],
    datasets: [
      {
        label: "Granel",
        data: [datosCategorias.granel],
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Rojo
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showGranel,
      },
      {
        label: "6 x 5Lb",
        data: [datosCategorias.bolsas6x5],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Azul
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showBolsas6x5,
      },
      {
        label: "13 x 2Lb",
        data: [datosCategorias.bolsas13x2],
        backgroundColor: "rgba(255, 206, 86, 0.6)", // Amarillo
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showBolsas13x2,
      },
      {
        label: "14 x 2Lb",
        data: [datosCategorias.bolsas14x2],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showBolsas14x2,
      },
      {
        label: "10 x 1Kg",
        data: [datosCategorias.bolsas10x1],
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Morado
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showBolsas10x1,
      },
    ],
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <motion.h2
        className="text-2xl font-bold mb-5 text-gray-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Detalle por Categorías de Embalaje
      </motion.h2>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg shadow-lg text-purple-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-purple-200 mr-3">
              <Scale className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold">Peso Total</h3>
          </div>
          <p className="text-3xl font-bold">
            222.286,28 <span className="text-sm">kg</span>
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-lg text-blue-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-blue-200 mr-3">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold">Total Palets</h3>
          </div>
          <p className="text-3xl font-bold">{totalPalets}</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg shadow-lg text-red-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-red-200 mr-3">
              <Box className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-bold">Categoría Principal</h3>
          </div>
          <p className="text-xl font-bold">
            Granel{" "}
            <span className="text-base font-normal">
              ({calcularPorcentaje(datosCategorias.granel)}%)
            </span>
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Detalles de categorías */}
        <div className="space-y-3">
          <motion.div
            className="bg-white p-5 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Detalles por Categoría
            </h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-red-800">Granel:</span>
                  <div className="text-right">
                    <span className="font-bold text-red-900 mr-2">
                      {datosCategorias.granel} palets
                    </span>
                    <span className="text-red-900">
                      {calcularPorcentaje(datosCategorias.granel)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-red-700 mt-1">
                  {formatearNumero(pesoPorCategoria.granel)} kg
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: `${calcularPorcentaje(datosCategorias.granel)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-800">6 x 5Lb:</span>
                  <div className="text-right">
                    <span className="font-bold text-blue-900 mr-2">
                      {datosCategorias.bolsas6x5} palets
                    </span>
                    <span className="text-blue-900">
                      {calcularPorcentaje(datosCategorias.bolsas6x5)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  {formatearNumero(pesoPorCategoria.bolsas6x5)} kg
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${calcularPorcentaje(
                        datosCategorias.bolsas6x5
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-yellow-800">
                    13 x 2Lb:
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-yellow-900 mr-2">
                      {datosCategorias.bolsas13x2} palets
                    </span>
                    <span className="text-yellow-900">
                      {calcularPorcentaje(datosCategorias.bolsas13x2)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-yellow-700 mt-1">
                  {formatearNumero(pesoPorCategoria.bolsas13x2)} kg
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${calcularPorcentaje(
                        datosCategorias.bolsas13x2
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-teal-800">14 x 2Lb:</span>
                  <div className="text-right">
                    <span className="font-bold text-teal-900 mr-2">
                      {datosCategorias.bolsas14x2} palets
                    </span>
                    <span className="text-teal-900">
                      {calcularPorcentaje(datosCategorias.bolsas14x2)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-teal-700 mt-1">
                  {formatearNumero(pesoPorCategoria.bolsas14x2)} kg
                </div>
                <div className="w-full bg-teal-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{
                      width: `${calcularPorcentaje(
                        datosCategorias.bolsas14x2
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-purple-800">
                    10 x 1Kg:
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-purple-900 mr-2">
                      {datosCategorias.bolsas10x1} palets
                    </span>
                    <span className="text-purple-900">
                      {calcularPorcentaje(datosCategorias.bolsas10x1)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-purple-700 mt-1">
                  {formatearNumero(pesoPorCategoria.bolsas10x1)} kg
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{
                      width: `${calcularPorcentaje(
                        datosCategorias.bolsas10x1
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gráfico de barras */}
        <div className="flex items-center justify-center">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2 text-center text-gray-800">
              Distribución por Categorías
            </h3>

            <div className="h-[300px] mb-4">
              <Bar
                data={datosGraficoBarras}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: true,
                      },
                      title: {
                        display: true,
                        text: "Cantidad de Palets",
                        font: {
                          weight: "bold",
                        },
                      },
                      ticks: {
                        font: {
                          weight: "bold",
                        },
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        font: {
                          weight: "bold",
                        },
                        display: false, // Ocultar etiquetas del eje X para parecerse a DetalleEmbalaje
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top" as const,
                      labels: {
                        boxWidth: 35,
                        padding: 20,
                        font: {
                          weight: "bold",
                          size: 12,
                        },
                      },
                    },
                    title: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `${context.dataset.label}: ${context.parsed.y} palets`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCategorias;
