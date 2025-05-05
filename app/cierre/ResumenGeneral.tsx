import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { ArrowUpCircle, TrendingUp, Package, Scale, CalendarDays, Warehouse, AlertTriangle } from "lucide-react";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ResumenGeneralProps {
  totales: {
    totalKilosRecepcionados: number;
    totalKilosDespezonados: number;
    totalKilosLavados: number;
    totalKilosProductoFinal: number;
    totalPalets: number;
  };
  porcentajes: {
    porcentajeRendimiento: number;
    porcentajeMixBerries: number;
    porcentajeFrutilla: number;
    porcentajePulpaFrutilla: number;
  };
}

const ResumenGeneral = ({ totales, porcentajes }: ResumenGeneralProps) => {
  // Datos para el gráfico de distribución de productos
  const datosGraficoProductos = {
    labels: ["Frutilla", "Mix Berries", "Pulpa Frutilla"],
    datasets: [
      {
        label: "Distribución de Productos",
        data: [
          porcentajes.porcentajeFrutilla,
          porcentajes.porcentajeMixBerries,
          porcentajes.porcentajePulpaFrutilla,
        ],
        backgroundColor: [
          "rgba(248, 113, 113, 0.8)",  // Rojo para Frutilla
          "rgba(129, 140, 248, 0.8)",  // Púrpura para Mix Berries
          "rgba(45, 212, 191, 0.8)",   // Turquesa para Pulpa Frutilla
        ],
        borderColor: [
          "rgb(239, 68, 68)",    // Borde Rojo
          "rgb(99, 102, 241)",   // Borde Púrpura
          "rgb(20, 184, 166)",   // Borde Turquesa
        ],
        borderWidth: 2,
      },
    ],
  };

  // Datos para el gráfico de proceso
  const datosGraficoProceso = {
    labels: ["Recepcionado", "Despezonado", "Lavado", "Producto Final"],
    datasets: [
      {
        label: "Kilos",
        data: [
          totales.totalKilosRecepcionados,
          totales.totalKilosDespezonados,
          totales.totalKilosLavados,
          totales.totalKilosProductoFinal
        ],
        backgroundColor: [
          "rgba(251, 191, 36, 0.7)",  // Amarillo
          "rgba(147, 197, 253, 0.7)", // Celeste 
          "rgba(52, 211, 153, 0.7)",  // Verde
          "rgba(248, 113, 113, 0.7)"  // Rojo
        ],
        borderColor: [
          "rgb(245, 158, 11)",
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(239, 68, 68)"
        ],
        borderWidth: 1,
        barPercentage: 0.6,
        categoryPercentage: 0.7
      }
    ],
  };

  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };
  
  // Datos de mermas (obtenidos de las recepciones)
  const mermas = {
    despezonado: {
      hoja: 50999,     // Ejemplo basado en los datos de Recepciones.tsx
      jugo: 29168,     // Estos valores deberían venir del componente Recepciones.tsx
      desecho: 200,
    },
    lavado: {
      jugo: 38724,
      hongo: 288,
      frutaMalDespezonada: 1437,
      desecho: 10633,
    }
  };
  
  // Calcular total de mermas
  const totalMermaDespezonado = mermas.despezonado.hoja + mermas.despezonado.jugo + mermas.despezonado.desecho;
  const totalMermaLavado = mermas.lavado.jugo + mermas.lavado.hongo + mermas.lavado.frutaMalDespezonada + mermas.lavado.desecho;
  const totalMermas = totalMermaDespezonado + totalMermaLavado;
  
  // Datos de peso total (cajas + totes)
  const pesoTotalTotes = 146611.4;
  const pesoTotalCajas = 225937;
  const pesoTotalProducto = pesoTotalTotes + pesoTotalCajas;
  
  // Datos de palets
  const paletsTotes = 311;
  const paletsCajas = 414;
  const totalPalets = paletsTotes + paletsCajas;

  return (
    <motion.div 
      className="bg-white shadow-lg rounded-xl p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Resumen Temporada 2024-2025
        </h2>
        <p className="text-gray-500">Producción Total y Distribución de Productos</p>
      </div>

      {/* Estadísticas Destacadas en Tarjetas */}
      <div className="grid md:grid-cols-5 gap-5 mb-10">
        <motion.div 
          className="bg-gradient-to-br from-red-500 to-pink-500 p-5 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-red-100 uppercase">Recepciones</p>
              <h3 className="text-3xl font-bold mt-1">{formatearNumero(542277)} kg</h3>
              <p className="text-sm text-red-100 mt-1">75 recepciones en total</p>
            </div>
            <Warehouse className="h-10 w-10 text-red-100 opacity-80" />
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-indigo-500 p-5 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-blue-100 uppercase">Rendimiento</p>
              <h3 className="text-3xl font-bold mt-1">{formatearNumero(porcentajes.porcentajeRendimiento)}%</h3>
              <p className="text-sm text-blue-100 mt-1">Eficiencia del proceso</p>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-100 opacity-80" />
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-emerald-500 to-teal-500 p-5 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-emerald-100 uppercase">Producto Final</p>
              <h3 className="text-3xl font-bold mt-1">{formatearNumero(pesoTotalProducto)} kg</h3>
              <p className="text-sm text-emerald-100 mt-1">Cajas + Totes</p>
            </div>
            <Scale className="h-10 w-10 text-emerald-100 opacity-80" />
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-violet-500 p-5 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-purple-100 uppercase">Palets Producidos</p>
              <h3 className="text-3xl font-bold mt-1">{totalPalets}</h3>
              <p className="text-sm text-purple-100 mt-1">{paletsTotes} totes + {paletsCajas} cajas</p>
            </div>
            <Package className="h-10 w-10 text-purple-100 opacity-80" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-amber-500 to-orange-500 p-5 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-amber-100 uppercase">Total Mermas</p>
              <h3 className="text-3xl font-bold mt-1">{formatearNumero(totalMermas)} kg</h3>
              <p className="text-sm text-amber-100 mt-1">Despezonado y lavado</p>
            </div>
            <AlertTriangle className="h-10 w-10 text-amber-100 opacity-80" />
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-6">
        {/* Gráfico de Distribución de Productos */}
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-md border border-blue-100 overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
            Distribución de Productos
          </h3>
          <div className="h-72">
            <Pie
              data={datosGraficoProductos}
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      font: {
                        size: 12
                      },
                      padding: 15,
                      usePointStyle: true,
                      boxWidth: 10
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 text-center text-sm">
            <div className="bg-red-50 py-2 rounded-lg">
              <p className="font-semibold text-red-600">Frutilla</p>
              <p className="text-xl font-bold">{formatearNumero(porcentajes.porcentajeFrutilla)}%</p>
            </div>
            <div className="bg-indigo-50 py-2 rounded-lg">
              <p className="font-semibold text-indigo-600">Mix Berries</p>
              <p className="text-xl font-bold">{formatearNumero(porcentajes.porcentajeMixBerries)}%</p>
            </div>
            <div className="bg-teal-50 py-2 rounded-lg">
              <p className="font-semibold text-teal-600">Pulpa Frutilla</p>
              <p className="text-xl font-bold">{formatearNumero(porcentajes.porcentajePulpaFrutilla)}%</p>
            </div>
          </div>
        </motion.div>

        {/* Gráfico del Proceso Productivo */}
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-md border border-blue-100"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
            Proceso Productivo
          </h3>
          <div className="h-72">
            <Bar
              data={datosGraficoProceso}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return formatearNumero(Number(value)) + ' kg';
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-center space-x-2 text-gray-600">
            <ArrowUpCircle className="h-4 w-4 text-teal-500" />
            <span className="text-sm">Rendimiento {formatearNumero(pesoTotalProducto/542277*100)}% del total recepcionado</span>
          </div>
        </motion.div>
      </div>

      {/* Datos Adicionales */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg shadow-sm border border-amber-100">
          <h4 className="font-medium text-amber-800 mb-2 flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" /> 
            Embalaje
          </h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Totes:</span>
            <span className="font-semibold text-amber-700">{paletsTotes} ({formatearNumero(pesoTotalTotes)} kg)</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Cajas:</span>
            <span className="font-semibold text-amber-700">{paletsCajas} ({formatearNumero(pesoTotalCajas)} kg)</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">IQF:</span>
            <span className="font-semibold text-amber-700">69 palets</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg shadow-sm border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">Principales Productores</h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Agricola Frut JH SPA:</span>
            <span className="font-semibold text-blue-700">52 recepciones</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">P. Farías:</span>
            <span className="font-semibold text-blue-700">8 recepciones</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">C. Giofer Spa:</span>
            <span className="font-semibold text-blue-700">7 recepciones</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg shadow-sm border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">Eficiencia del Proceso</h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Rendimiento Desp.:</span>
            <span className="font-semibold text-emerald-700">{formatearNumero(totales.totalKilosDespezonados/totales.totalKilosRecepcionados*100)}%</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Rendimiento Lavado:</span>
            <span className="font-semibold text-emerald-700">{formatearNumero(totales.totalKilosLavados/totales.totalKilosDespezonados*100)}%</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Rendimiento Final:</span>
            <span className="font-semibold text-emerald-700">{formatearNumero(pesoTotalProducto/totales.totalKilosRecepcionados*100)}%</span>
          </div>
        </div>
      </motion.div>
      
      {/* Desglose de Mermas */}
      <motion.div
        className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg shadow-sm border border-amber-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h4 className="font-medium text-amber-800 mb-3 flex items-center justify-center text-center text-lg">
          <AlertTriangle className="h-5 w-5 mr-2" /> 
          Desglose de Mermas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-amber-700 font-medium mb-2 text-center border-b border-amber-200 pb-1">Mermas de Despezonado</h5>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Hoja:</span>
              <span className="font-semibold text-amber-700">{formatearNumero(mermas.despezonado.hoja)} kg</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Jugo:</span>
              <span className="font-semibold text-amber-700">{formatearNumero(mermas.despezonado.jugo)} kg</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Desecho:</span>
              <span className="font-semibold text-amber-700">{formatearNumero(mermas.despezonado.desecho)} kg</span>
            </div>
            <div className="flex justify-between text-sm mt-2 pt-1 border-t border-amber-200">
              <span className="text-gray-700 font-medium">Total Despezonado:</span>
              <span className="font-bold text-amber-800">{formatearNumero(totalMermaDespezonado)} kg</span>
            </div>
          </div>
          <div>
            <h5 className="text-amber-700 font-medium mb-2 text-center border-b border-amber-200 pb-1">Mermas de Lavado</h5>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Jugo:</span>
              <span className="font-semibold text-amber-700">{formatearNumero(mermas.lavado.jugo)} kg</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Hongo:</span>
              <span className="font-semibold text-amber-700">{formatearNumero(mermas.lavado.hongo)} kg</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Fruta mal despezonada:</span>
              <span className="font-semibold text-amber-700">{formatearNumero(mermas.lavado.frutaMalDespezonada)} kg</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Desecho:</span>
              <span className="font-semibold text-amber-700">{formatearNumero(mermas.lavado.desecho)} kg</span>
            </div>
            <div className="flex justify-between text-sm mt-2 pt-1 border-t border-amber-200">
              <span className="text-gray-700 font-medium">Total Lavado:</span>
              <span className="font-bold text-amber-800">{formatearNumero(totalMermaLavado)} kg</span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-amber-200 flex justify-between">
          <span className="text-amber-900 font-bold">TOTAL MERMAS:</span>
          <span className="font-bold text-amber-900 text-lg">{formatearNumero(totalMermas)} kg ({formatearNumero(totalMermas/totales.totalKilosRecepcionados*100)}%)</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumenGeneral;
