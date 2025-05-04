import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DatosProductos } from "../types";
import { motion } from "framer-motion";
import {
  Box,
  CircleDollarSign,
  Package,
  Scale,
  TrendingUp,
} from "lucide-react";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface DetalleProductosProps {
  datosProductos: DatosProductos;
  porcentajes: {
    porcentajeMixBerries: number;
    porcentajeFrutilla: number;
    porcentajePulpaFrutilla: number;
  };
}

const DetalleProductos = ({
  datosProductos,
  porcentajes,
}: DetalleProductosProps) => {
  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Datos para el gráfico de dona de peso por producto
  const datosGraficoProductosPeso = {
    labels: ["Frutilla", "Mix Berries", "Pulpa Frutilla"],
    datasets: [
      {
        label: "Peso (kg)",
        data: [
          datosProductos.frutilla.peso,
          datosProductos.mixBerries.peso,
          datosProductos.pulpaFrutilla.peso,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Rojo
          "rgba(54, 162, 235, 0.8)", // Azul
          "rgba(75, 192, 192, 0.8)", // Verde
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Rojo
          "rgba(54, 162, 235, 1)", // Azul
          "rgba(75, 192, 192, 1)", // Verde
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de dona de palets por producto
  const datosGraficoProductosPalets = {
    labels: ["Frutilla", "Mix Berries", "Pulpa Frutilla"],
    datasets: [
      {
        label: "Palets",
        data: [
          datosProductos.frutilla.palets,
          datosProductos.mixBerries.palets,
          datosProductos.pulpaFrutilla.palets,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Rojo
          "rgba(54, 162, 235, 0.8)", // Azul
          "rgba(75, 192, 192, 0.8)", // Verde
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Rojo
          "rgba(54, 162, 235, 1)", // Azul
          "rgba(75, 192, 192, 1)", // Verde
        ],
        borderWidth: 1,
      },
    ],
  };

  // Calculamos totales
  const totalPalets =
    datosProductos.frutilla.palets +
    datosProductos.mixBerries.palets +
    datosProductos.pulpaFrutilla.palets;

  const totalPeso =
    datosProductos.frutilla.peso +
    datosProductos.mixBerries.peso +
    datosProductos.pulpaFrutilla.peso;

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Detalle de Productos
      </motion.h2>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-lg shadow-lg text-purple-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-purple-200 mr-3">
              <Scale className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold">Peso Total</h3>
          </div>
          <p className="text-3xl font-bold">
            {formatearNumero(totalPeso)} <span className="text-sm">kg</span>
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg shadow-lg text-blue-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-blue-200 mr-3">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold">Total Palets</h3>
          </div>
          <p className="text-3xl font-bold">{totalPalets}</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-lg shadow-lg text-red-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-red-200 mr-3">
              <Box className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-bold">Producto Principal</h3>
          </div>
          <p className="text-xl font-bold">
            Frutilla{" "}
            <span className="text-base font-normal">
              ({formatearNumero(porcentajes.porcentajeFrutilla)}%)
            </span>
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Panel de productos */}
        <div className="space-y-6">
          <motion.div
            className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg shadow-lg text-red-800"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b border-red-200 pb-2">
              Frutilla
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span>Palets:</span>
                <span className="text-2xl font-bold">
                  {datosProductos.frutilla.palets}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Peso Total:</span>
                <span className="text-2xl font-bold">
                  {formatearNumero(datosProductos.frutilla.peso)}{" "}
                  <span className="text-sm font-normal">kg</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Porcentaje:</span>
                <span className="font-semibold">
                  {formatearNumero(porcentajes.porcentajeFrutilla)}%
                </span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2 mt-1">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${porcentajes.porcentajeFrutilla}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg text-blue-800"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b border-blue-200 pb-2">
              Mix Berries
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span>Palets:</span>
                <span className="text-2xl font-bold">
                  {datosProductos.mixBerries.palets}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Peso Total:</span>
                <span className="text-2xl font-bold">
                  {formatearNumero(datosProductos.mixBerries.peso)}{" "}
                  <span className="text-sm font-normal">kg</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Porcentaje:</span>
                <span className="font-semibold">
                  {formatearNumero(porcentajes.porcentajeMixBerries)}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${porcentajes.porcentajeMixBerries}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-lg shadow-lg text-teal-800"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b border-teal-200 pb-2">
              Pulpa Frutilla
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span>Palets:</span>
                <span className="text-2xl font-bold">
                  {datosProductos.pulpaFrutilla.palets}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Peso Total:</span>
                <span className="text-2xl font-bold">
                  {formatearNumero(datosProductos.pulpaFrutilla.peso)}{" "}
                  <span className="text-sm font-normal">kg</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Porcentaje:</span>
                <span className="font-semibold">
                  {formatearNumero(porcentajes.porcentajePulpaFrutilla)}%
                </span>
              </div>
              <div className="w-full bg-teal-200 rounded-full h-2 mt-1">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: `${porcentajes.porcentajePulpaFrutilla}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gráficos */}
        <div className="space-y-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-200 pb-2">
              Distribución por Peso
            </h3>
            <div className="h-[250px] flex items-center justify-center">
              <Doughnut
                data={datosGraficoProductosPeso}
                options={{
                  responsive: true,
                  cutout: "65%",
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        boxWidth: 35,
                        padding: 20,
                        font: {
                          weight: "bold",
                          size: 12,
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const label = context.label || "";
                          const value = context.raw as number;
                          const percentage = (
                            (value / totalPeso) *
                            100
                          ).toFixed(1);
                          return `${label}: ${formatearNumero(
                            value
                          )} kg (${percentage}%)`;
                        },
                      },
                    },
                  },
                  animation: {
                    animateRotate: true,
                    animateScale: true,
                  },
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-200 pb-2">
              Distribución por Palets
            </h3>
            <div className="h-[250px] flex items-center justify-center">
              <Doughnut
                data={datosGraficoProductosPalets}
                options={{
                  responsive: true,
                  cutout: "65%",
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        boxWidth: 35,
                        padding: 20,
                        font: {
                          weight: "bold",
                          size: 12,
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const label = context.label || "";
                          const value = context.raw as number;
                          const percentage = (
                            (value / totalPalets) *
                            100
                          ).toFixed(1);
                          return `${label}: ${value} palets (${percentage}%)`;
                        },
                      },
                    },
                  },
                  animation: {
                    animateRotate: true,
                    animateScale: true,
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

export default DetalleProductos;
