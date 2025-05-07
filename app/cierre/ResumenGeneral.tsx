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
  
  // Calcular mermas reales (excluyendo jugo y fruta mal despezonada)
  const mermaRealDespezonado = mermas.despezonado.hoja + mermas.despezonado.desecho;
  const mermaRealLavado = mermas.lavado.hongo + mermas.lavado.desecho;
  const totalDesecho = 61680.04; // Valor actualizado según lo solicitado
  
  // Calcular productos derivados (jugo, fruta mal despezonada y no lavado)
  const totalJugoDespezonado = mermas.despezonado.jugo;
  const totalJugoLavado = mermas.lavado.jugo;
  const totalFrutaMalDespezonada = mermas.lavado.frutaMalDespezonada;
  const totalNoLavado = 22561.1; // Valor obtenido del datosCompletos
  const totalJugo = totalJugoDespezonado + totalJugoLavado + totalFrutaMalDespezonada + totalNoLavado;
  
  // Datos de peso total (cajas + totes + IQF pendiente)
  const pesoTotalTotes = 146611.4;
  const pesoTotalCajas = 222286.28; // Corregido: valor exacto de cajas
  const pesoTotalIQF = 17195.98; // IQF pendiente
  const pesoTotalProducto = pesoTotalTotes + pesoTotalCajas + pesoTotalIQF; // Jugo eliminado del cálculo
  
  // Datos de palets
  const paletsTotes = 311;
  const paletsCajas = 414;
  const totalPalets = paletsTotes + paletsCajas;

  // Rendimiento actualizado
  const rendimientoActualizado = 87.56;
  
  // Calcular la merma no medible (pérdida entre rendimiento y desecho)
  const totalRecepcionado = 542277; // Total recepcionado
  const totalProductoUtil = totalRecepcionado * (rendimientoActualizado / 100); // Lo que debería salir según rendimiento
  const totalReal = pesoTotalProducto + totalDesecho; // Lo que realmente tenemos contabilizado
  const totalMermaNoMedible = totalRecepcionado - totalReal; // Merma que no podemos medir

  // Calcular porcentajes para las barras de progreso
  const porcentajeDesecho = (totalDesecho / totalRecepcionado) * 100;
  const porcentajeMermaNoMedible = (totalMermaNoMedible / totalRecepcionado) * 100;
  const porcentajeJugo = (totalJugo / totalRecepcionado) * 100;
  const porcentajeProductoFinal = (pesoTotalProducto / totales.totalKilosLavados) * 100;

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
          pesoTotalProducto // Actualizado: ahora incluye totes + cajas + IQF
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
              <p className="text-xs font-medium text-blue-100 uppercase">Rendimiento Despezonado</p>
              <h3 className="text-3xl font-bold mt-1">{rendimientoActualizado}%</h3>
              <p className="text-sm text-blue-100 mt-1">Eficiencia del proceso</p>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-100 opacity-80" />
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-fuchsia-500 p-5 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-purple-100 uppercase">Rendimiento Embasado</p>
              <h3 className="text-3xl font-bold mt-1">{formatearNumero(pesoTotalProducto/totales.totalKilosLavados*100)}%</h3>
              <p className="text-sm text-purple-100 mt-1">Eficiencia de embasado</p>
            </div>
            <Package className="h-10 w-10 text-purple-100 opacity-80" />
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
              <p className="text-sm text-emerald-100 mt-1">Cajas + Totes + IQF</p>
            </div>
            <Scale className="h-10 w-10 text-emerald-100 opacity-80" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-amber-500 to-orange-500 p-5 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-amber-100 uppercase">Total Mermas</p>
              <h3 className="text-3xl font-bold mt-1">{formatearNumero(totalDesecho)} kg</h3>
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
            <span className="text-sm">Rendimiento {formatearNumero(pesoTotalProducto/totales.totalKilosLavados*100)}% del total lavado</span>
          </div>
        </motion.div>
      </div>

      {/* Producto Final */}
      <motion.div 
        className="bg-white p-5 rounded-xl shadow-md border border-green-200 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4 text-center text-green-600">
          Producto Final
        </h3>
        
        {/* Barra de progreso para producto final */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-green-700">Porcentaje del total lavado</span>
            <span className="text-sm font-medium text-green-700">{formatearNumero(porcentajeProductoFinal)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div 
              className="bg-gradient-to-r from-green-300 to-green-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(porcentajeProductoFinal, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <h5 className="text-green-700 font-medium mb-2 text-center">Totes</h5>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{paletsTotes} palets</p>
              <p className="text-lg font-semibold text-green-600">{formatearNumero(pesoTotalTotes)} kg</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <h5 className="text-blue-700 font-medium mb-2 text-center">Cajas</h5>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">{paletsCajas} palets</p>
              <p className="text-lg font-semibold text-blue-600">{formatearNumero(pesoTotalCajas)} kg</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <h5 className="text-purple-700 font-medium mb-2 text-center">IQF Pendiente</h5>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">69 palets</p>
              <p className="text-lg font-semibold text-purple-600">{formatearNumero(pesoTotalIQF)} kg</p>
            </div>
          </div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
          <p className="text-sm text-green-700 mb-1">Total Producto Final</p>
          <p className="text-2xl font-bold text-green-800">{formatearNumero(pesoTotalProducto)} kg</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumenGeneral;
