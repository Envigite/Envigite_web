import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Definición local del tipo
interface DatosEmbalaje {
  totalTotes: number;
  pesoTotalTotes: number;
  totalPaletsCajas: number;
  pesoTotalCajas: number;
  totalesCongelados?: {
    paletsIQFPendientes: number;
    pesoIQFPendientes: number;
  };
  totalCajas?: number;
  paletsIQF?: number;
}

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
);

interface DetalleEmbalajeProps {
  datosEmbalaje: DatosEmbalaje;
}

const DetalleEmbalaje = ({ datosEmbalaje }: DetalleEmbalajeProps) => {
  const [animatedTotes, setAnimatedTotes] = useState(0);
  const [animatedCajas, setAnimatedCajas] = useState(0);
  const [animatedPesoTotes, setAnimatedPesoTotes] = useState(0);
  const [animatedPesoCajas, setAnimatedPesoCajas] = useState(0);
  const [activeTab, setActiveTab] = useState("general");
  const [showTotesData] = useState(true);
  const [showCajasData] = useState(true);
  const [showIQFData] = useState(true);

  // Definir constantes para los cálculos correctos
  const PESO_TOTAL_REAL = 386050.22; // Suma total correcta
  const TOTAL_KILOS_LAVADOS = 399381; // Total de kilos lavados
  const TOTAL_IQF =
    (datosEmbalaje.paletsIQF || 0) +
    (datosEmbalaje.totalesCongelados?.paletsIQFPendientes || 0);

  // Animar los contadores al cargar el componente
  useEffect(() => {
    const duration = 1500; // duración de la animación en ms
    const frameRate = 30; // frames por segundo
    const totalFrames = duration / (1000 / frameRate);

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setAnimatedTotes(Math.round(progress * datosEmbalaje.totalTotes));
      setAnimatedCajas(
        Math.round(
          progress *
            (datosEmbalaje.totalCajas || datosEmbalaje.totalPaletsCajas * 48)
        )
      );
      setAnimatedPesoTotes(Math.round(progress * datosEmbalaje.pesoTotalTotes));
      setAnimatedPesoCajas(Math.round(progress * datosEmbalaje.pesoTotalCajas));

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [datosEmbalaje]);

  // Datos para el gráfico de palets
  const datosGraficoPalets = {
    labels: ["Tipo de Embalaje"],
    datasets: [
      {
        label: "Totes",
        data: [datosEmbalaje.totalTotes],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Verde
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showTotesData,
      },
      {
        label: "Cajas",
        data: [datosEmbalaje.totalPaletsCajas],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Azul
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showCajasData,
      },
      {
        label: "IQF no Procesado",
        data: [69], // Valor fijo de 69 para IQF como solicitado
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Rojo
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hidden: !showIQFData,
      },
    ],
  };

  // Datos para el gráfico circular de distribución
  const datosDistribucion = {
    labels: ["Totes", "Cajas", "IQF Pendiente"],
    datasets: [
      {
        data: [
          datosEmbalaje.pesoTotalTotes,
          datosEmbalaje.pesoTotalCajas,
          datosEmbalaje.totalesCongelados?.pesoIQFPendientes || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Calcular porcentajes correctos
  const porcentajePesoTotes =
    (datosEmbalaje.pesoTotalTotes / PESO_TOTAL_REAL) * 100;
  const porcentajePesoCajas =
    (datosEmbalaje.pesoTotalCajas / PESO_TOTAL_REAL) * 100;
  const porcentajePesoIQFPendiente =
    ((datosEmbalaje.totalesCongelados?.pesoIQFPendientes || 0) /
      PESO_TOTAL_REAL) *
    100;

  // Calcular cuadratura con total lavado
  const porcentajeCuadratura = (PESO_TOTAL_REAL / TOTAL_KILOS_LAVADOS) * 100;

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Detalle de Embalaje y Procesamiento
      </motion.h2>

      <div className="flex justify-center mb-6">
        <div className="bg-white shadow-md rounded-lg p-0 w-full max-w-md overflow-hidden">
          <div className="grid grid-cols-2">
            <button
              className={`py-3 text-lg font-medium transition-all ${
                activeTab === "general"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
            <button
              className={`py-3 text-lg font-medium transition-all ${
                activeTab === "distribucion"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("distribucion")}
            >
              Distribución
            </button>
          </div>
        </div>
      </div>

      {activeTab === "general" && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tarjetas de información */}
          <div className="space-y-6">
            <motion.div
              className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-lg shadow-lg text-teal-800"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 border-b border-teal-200 pb-2">
                Totes
              </h3>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <span>Cantidad:</span>
                  <span className="text-2xl font-bold">
                    {animatedTotes}{" "}
                    <span className="text-sm font-normal">totes</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Peso Total:</span>
                  <span className="text-2xl font-bold">
                    {formatearNumero(animatedPesoTotes)}{" "}
                    <span className="text-sm font-normal">kg</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Promedio por Tote:</span>
                  <span className="font-semibold">
                    {formatearNumero(
                      datosEmbalaje.pesoTotalTotes / datosEmbalaje.totalTotes
                    )}{" "}
                    kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Porcentaje del Peso Total:</span>
                  <span className="font-semibold">
                    {formatearNumero(porcentajePesoTotes)}%
                  </span>
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
                Cajas
              </h3>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <span>Cantidad (Palets):</span>
                  <span className="text-2xl font-bold">
                    {datosEmbalaje.totalPaletsCajas}{" "}
                    <span className="text-sm font-normal">palets</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cantidad (Cajas):</span>
                  <span className="text-2xl font-bold">
                    {formatearNumero(animatedCajas)}{" "}
                    <span className="text-sm font-normal">cajas</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Peso Total:</span>
                  <span className="text-2xl font-bold">
                    {formatearNumero(animatedPesoCajas)}{" "}
                    <span className="text-sm font-normal">kg</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Promedio por Palet:</span>
                  <span className="font-semibold">
                    {formatearNumero(
                      datosEmbalaje.pesoTotalCajas /
                        datosEmbalaje.totalPaletsCajas
                    )}{" "}
                    kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Porcentaje del Peso Total:</span>
                  <span className="font-semibold">
                    {formatearNumero(porcentajePesoCajas)}%
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg shadow-lg text-red-800"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 border-b border-red-200 pb-2">
                IQF no Procesado
              </h3>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <span>Palets IQF Total:</span>
                  <span className="text-2xl font-bold">
                    {TOTAL_IQF}{" "}
                    <span className="text-sm font-normal">palets</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pendientes de procesar:</span>
                  <span className="text-lg font-bold border-red-200">
                    {datosEmbalaje.totalesCongelados?.paletsIQFPendientes || 0}{" "}
                    <span className="text-sm font-normal">palets</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gráfico y datos totales */}
          <div className="space-y-6">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-2 text-center text-gray-800">
                Distribución por N° de Palets
              </h3>

              <div className="h-[300px] mb-4">
                <Bar
                  data={datosGraficoPalets}
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
                          display: false, // Ocultar etiquetas del eje X para parecerse a la imagen
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

              <div className="mt-6 bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg shadow-lg text-amber-800 text-center">
                <p className="text-xl font-bold mb-4 text-amber-800 border-b border-amber-200 pb-2">
                  Resumen
                </p>
                <span className="text-sm text-amber-700">Peso Total</span>
                <p className="text-3xl font-bold">
                  {formatearNumero(PESO_TOTAL_REAL)} kg
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4 text-amber-700">
                  <div className="text-right border-r border-amber-300 pr-4">
                    <p className="font-semibold">Totes:</p>
                    <p className="text-xl font-bold">
                      {datosEmbalaje.totalTotes}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Cajas:</p>
                    <p className="text-xl font-bold">
                      {datosEmbalaje.totalPaletsCajas}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {activeTab === "distribucion" && (
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
              Distribución por Peso
            </h3>
            <div className="h-[380px] flex items-center justify-center">
              <Doughnut
                data={datosDistribucion}
                options={{
                  responsive: true,
                  cutout: "65%",
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        font: {
                          weight: "bold",
                        },
                        padding: 20,
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const label = context.label || "";
                          const value = context.raw as number;
                          const percentage = (
                            (value / PESO_TOTAL_REAL) *
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
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Detalles de Distribución
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-teal-800">Totes:</span>
                    <span className="font-bold text-teal-900">
                      {formatearNumero(datosEmbalaje.pesoTotalTotes)} kg
                    </span>
                    <span className="text-teal-900">
                      {formatearNumero(porcentajePesoTotes)}%
                    </span>
                  </div>
                  <div className="w-full bg-teal-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${porcentajePesoTotes}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-800">Cajas:</span>
                    <span className="font-bold text-blue-900">
                      {formatearNumero(datosEmbalaje.pesoTotalCajas)} kg
                    </span>
                    <span className="text-blue-900">
                      {formatearNumero(porcentajePesoCajas)}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${porcentajePesoCajas}%` }}
                    ></div>
                  </div>
                </div>

                {datosEmbalaje.totalesCongelados && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-red-800">
                        IQF Pendiente:
                      </span>
                      <span className="font-bold text-red-900">
                        {formatearNumero(
                          datosEmbalaje.totalesCongelados.pesoIQFPendientes
                        )}{" "}
                        kg
                      </span>
                      <span className="text-red-900">
                        {formatearNumero(porcentajePesoIQFPendiente)}%
                      </span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${porcentajePesoIQFPendiente}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-amber-800">
                      Cuadratura con Total Lavado:
                    </span>
                    <span className="font-bold text-amber-900">
                      {formatearNumero(porcentajeCuadratura)}%
                    </span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{
                        width: `${
                          porcentajeCuadratura > 100
                            ? 100
                            : porcentajeCuadratura
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">
                    Relación entre peso total procesado (
                    {formatearNumero(PESO_TOTAL_REAL)} kg) y total lavado (
                    {formatearNumero(TOTAL_KILOS_LAVADOS)} kg)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4 text-amber-800 border-b border-amber-200 pb-2">
                Resumen
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="rounded-lg text-center backdrop-blur-sm">
                  <span className="text-sm text-amber-700">Peso Total</span>
                  <p className="text-3xl font-bold text-amber-800">
                    {formatearNumero(PESO_TOTAL_REAL)} kg
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-amber-700">
                  <div className="text-right border-r border-amber-300 pr-4">
                    <p className="font-semibold">Totes:</p>
                    <p className="text-xl font-bold">
                      {formatearNumero(datosEmbalaje.pesoTotalTotes)} kg
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Cajas:</p>
                    <p className="text-xl font-bold">
                      {formatearNumero(datosEmbalaje.pesoTotalCajas)} kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DetalleEmbalaje;
