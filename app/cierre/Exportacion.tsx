import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Box, Calendar, Package, Scale, Ship } from "lucide-react";
import { useState } from "react";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Definición de tipos
interface Exportacion {
  id: number;
  fecha: string;
  numeroExportacion: number;
  numeroCajas: number;
  peso: number;
  distribuciones: {
    [key: string]: number;
  };
  productos: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

// Datos de exportación
const datosExportacion: Exportacion[] = [
  {
    id: 1,
    fecha: "21-03-2025",
    numeroExportacion: 1,
    numeroCajas: 1764,
    peso: 24025.68,
    distribuciones: {
      M: 1685,
      S: 76,
      L: 3,
    },
    productos: {
      Frutilla: {
        Total: 1764,
      },
    },
  },
  {
    id: 2,
    fecha: "10-04-2025",
    numeroExportacion: 2,
    numeroCajas: 1764,
    peso: 22172.04,
    distribuciones: {},
    productos: {
      Frutilla: {
        "13 x 2Lb": 924,
        "6 x 5Lb": 724,
      },
      "Pulpa Frutilla": {
        "14 x 2Lb": 58,
      },
      "Mix Berries": {
        "13 x 2Lb": 58,
      },
    },
  },
];

const Exportacion = () => {
  const [exportacionSeleccionada, setExportacionSeleccionada] =
    useState<number>(1);

  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Obtener la exportación actualmente seleccionada
  const exportacionActual =
    datosExportacion.find((exp) => exp.id === exportacionSeleccionada) ||
    datosExportacion[0];

  // Calcular resumen de todas las exportaciones
  const resumenTotal = {
    cantidadExportaciones: datosExportacion.length,
    totalCajas: datosExportacion.reduce(
      (total, exp) => total + exp.numeroCajas,
      0
    ),
    pesoTotal: datosExportacion.reduce((total, exp) => total + exp.peso, 0),
    productos: Array.from(
      new Set(datosExportacion.flatMap((exp) => Object.keys(exp.productos)))
    ),
  };

  // Datos para el gráfico de distribución de categorías (Exportación 1)
  const datosGraficoDistribucion = {
    labels: Object.keys(exportacionActual.distribuciones),
    datasets: [
      {
        label: "Cantidad de Cajas",
        data: Object.values(exportacionActual.distribuciones),
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)", // Azul
          "rgba(75, 192, 192, 0.8)", // Verde
          "rgba(255, 99, 132, 0.8)", // Rojo
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de distribución de productos (Exportación 2)
  const datosGraficoProductos = {
    labels: Object.keys(exportacionActual.productos),
    datasets: [
      {
        label: "Cantidad de Cajas",
        data: Object.keys(exportacionActual.productos).map((producto) => {
          return Object.values(exportacionActual.productos[producto]).reduce(
            (total, cantidad) => total + cantidad,
            0
          );
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Rojo (Frutilla)
          "rgba(75, 192, 192, 0.8)", // Verde (Pulpa Frutilla)
          "rgba(54, 162, 235, 0.8)", // Azul (Mix Berries)
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de barras de tipos de cajas (Exportación 2)
  const prepararDatosBarras = () => {
    // Obtener todos los tipos de cajas únicos
    const tiposCajas: string[] = [];
    const productos: string[] = [];

    Object.keys(exportacionActual.productos).forEach((producto) => {
      productos.push(producto);
      Object.keys(exportacionActual.productos[producto]).forEach((tipo) => {
        if (tipo !== "Total" && !tiposCajas.includes(tipo)) {
          tiposCajas.push(tipo);
        }
      });
    });

    // Preparar datasets
    const datasets = productos.map((producto) => {
      let color;
      let borderColor;
      if (producto === "Frutilla") {
        color = "rgba(255, 99, 132, 0.8)"; // Rojo
        borderColor = "rgba(255, 99, 132, 1)";
      } else if (producto === "Pulpa Frutilla") {
        color = "rgba(75, 192, 192, 0.8)"; // Verde
        borderColor = "rgba(75, 192, 192, 1)";
      } else {
        color = "rgba(54, 162, 235, 0.8)"; // Azul
        borderColor = "rgba(54, 162, 235, 1)";
      }

      return {
        label: producto,
        data: tiposCajas.map(
          (tipo) => exportacionActual.productos[producto][tipo] || 0
        ),
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: 1,
      };
    });

    return {
      labels: tiposCajas,
      datasets: datasets,
    };
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Detalle de Exportaciones
      </motion.h2>

      {/* Navegación entre exportaciones */}
      <div className="flex justify-center mb-6">
        <div className="bg-white shadow-md rounded-lg p-0 w-full max-w-md overflow-hidden">
          <div className="grid grid-cols-3">
            <button
              className={`py-3 text-lg font-medium transition-all ${
                exportacionSeleccionada === 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setExportacionSeleccionada(1)}
            >
              Exportación 1
            </button>
            <button
              className={`py-3 text-lg font-medium transition-all ${
                exportacionSeleccionada === 2
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setExportacionSeleccionada(2)}
            >
              Exportación 2
            </button>
            <button
              className={`py-3 text-lg font-medium transition-all ${
                exportacionSeleccionada === 3
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setExportacionSeleccionada(3)}
            >
              Resumen
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      {exportacionSeleccionada !== 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg shadow-lg text-blue-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-blue-200 mr-3">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">Fecha</h3>
            </div>
            <p className="text-2xl font-bold">{exportacionActual.fecha}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-lg shadow-lg text-purple-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-purple-200 mr-3">
                <Box className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold">Número de Cajas</h3>
            </div>
            <p className="text-3xl font-bold">
              {exportacionActual.numeroCajas}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-teal-50 to-teal-100 p-5 rounded-lg shadow-lg text-teal-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-teal-200 mr-3">
                <Scale className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold">Peso Total</h3>
            </div>
            <p className="text-3xl font-bold">
              {formatearNumero(exportacionActual.peso)}{" "}
              <span className="text-sm">kg</span>
            </p>
          </motion.div>
        </div>
      )}

      {/* Resumen de todas las exportaciones */}
      {exportacionSeleccionada === 3 && (
        <div className="mb-6">
          <motion.div
            className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-800 border-b border-indigo-200 pb-2">
              Resumen General de Exportaciones
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="bg-white p-5 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-indigo-100">
                    <Ship className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <h4 className="text-gray-600 font-medium">
                  Total Exportaciones
                </h4>
                <p className="text-3xl font-bold text-indigo-700 mt-2">
                  {resumenTotal.cantidadExportaciones}
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-5 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Box className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h4 className="text-gray-600 font-medium">Total Cajas</h4>
                <p className="text-3xl font-bold text-purple-700 mt-2">
                  {resumenTotal.totalCajas}
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-5 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-teal-100">
                    <Scale className="h-8 w-8 text-teal-600" />
                  </div>
                </div>
                <h4 className="text-gray-600 font-medium">Peso Total</h4>
                <p className="text-3xl font-bold text-teal-700 mt-2">
                  {formatearNumero(resumenTotal.pesoTotal)}{" "}
                  <span className="text-sm">kg</span>
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-5 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-red-100">
                    <Package className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <h4 className="text-gray-600 font-medium">
                  Tipos de Productos
                </h4>
                <p className="text-3xl font-bold text-red-700 mt-2">
                  {resumenTotal.productos.length}
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h4 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-200 pb-2">
                Productos Exportados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {resumenTotal.productos.map((producto: string) => (
                  <div
                    key={producto}
                    className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                  >
                    <div className="p-2 mr-3 rounded-full bg-indigo-100">
                      <Package className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {producto}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Contenido específico según la exportación seleccionada */}
      {exportacionSeleccionada !== 3 && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Panel izquierdo - Distribución detallada */}
          <div className="space-y-6 flex flex-col justify-center">
            {exportacionSeleccionada === 1 && (
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-200 pb-2">
                  Distribución por Categorías
                </h3>
                <div className="space-y-3">
                  {Object.entries(exportacionActual.distribuciones).map(
                    ([categoria, cantidad]) => (
                      <div
                        key={categoria}
                        className="flex justify-between items-center"
                      >
                        <span>Categoría {categoria}:</span>
                        <span className="text-xl font-bold">
                          {cantidad} cajas
                        </span>
                      </div>
                    )
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Producto:</span>
                      <span className="text-xl font-bold">Frutilla</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {exportacionSeleccionada === 2 && (
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-200 pb-2">
                  Distribución por Productos y Tipos
                </h3>
                <div className="space-y-4">
                  {Object.entries(exportacionActual.productos).map(
                    ([producto, tipos]) => {
                      let bgColor = "";

                      if (producto === "Frutilla") {
                        bgColor = "bg-red-50";
                      } else if (producto === "Pulpa Frutilla") {
                        bgColor = "bg-teal-50";
                      } else {
                        bgColor = "bg-blue-50";
                      }

                      return (
                        <div
                          key={producto}
                          className={`${bgColor} p-3 rounded-lg`}
                        >
                          <div className="font-semibold text-lg mb-2">
                            {producto}
                          </div>
                          {Object.entries(tipos).map(([tipo, cantidad]) => (
                            <div
                              key={tipo}
                              className="flex justify-between items-center ml-3"
                            >
                              <span>{tipo}:</span>
                              <span className="font-bold">
                                {cantidad} cajas
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Panel derecho - Gráficos */}
          <div className="space-y-6 flex flex-col justify-center">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-200 pb-2">
                {exportacionSeleccionada === 1
                  ? "Distribución por Categorías"
                  : "Distribución por Productos"}
              </h3>
              <div className="h-[300px] flex items-center justify-center">
                <Doughnut
                  data={
                    exportacionSeleccionada === 1
                      ? datosGraficoDistribucion
                      : datosGraficoProductos
                  }
                  options={{
                    responsive: true,
                    cutout: "65%",
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          boxWidth: 15,
                          padding: 20,
                          font: {
                            weight: "bold",
                          },
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            const label = context.label || "";
                            const value = context.raw as number;
                            const percentage = (
                              (value / exportacionActual.numeroCajas) *
                              100
                            ).toFixed(1);
                            return `${label}: ${value} cajas (${percentage}%)`;
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

            {exportacionSeleccionada === 2 && (
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-200 pb-2">
                  Distribución por Tipos de Cajas
                </h3>
                <div className="h-[250px] flex items-center justify-center">
                  <Bar
                    data={prepararDatosBarras()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          stacked: false,
                          title: {
                            display: true,
                            text: "Tipo de Caja",
                            font: {
                              weight: "bold",
                            },
                          },
                        },
                        y: {
                          stacked: false,
                          title: {
                            display: true,
                            text: "Cantidad",
                            font: {
                              weight: "bold",
                            },
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          position: "top" as const,
                          labels: {
                            font: {
                              weight: "bold",
                            },
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const label = context.dataset.label || "";
                              const value = context.parsed.y;
                              return `${label}: ${value} cajas`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exportacion;
