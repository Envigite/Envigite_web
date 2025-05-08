import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import FechasRecepcion from "./FechasRecepcion";
import ResumenMensual from "./ResumenMensual";
import { motion } from "framer-motion";
import { datosCierre } from "../data/datosTemporada";
// import { datosCierre } from "../data/datosTemporada";

// Definición de tipos locales
interface MermaDespezonado {
  hoja: number;
  jugo: number;
  desecho: number;
}

interface MermaLavado {
  jugo: number;
  hongo: number;
  frutaMalDespezonada: number;
  desecho: number;
}

interface Recepcion {
  numero: number;
  productor: string;
  kilosRecepcionados: number;
  kilosDespezonados: number;
  kilosLavados: number;
  kilosNoLavados?: number;
  calculoParaDespezonado?: number;
  calculoParaLavado?: number;
  mermaDespezonado: MermaDespezonado;
  mermaLavado: MermaLavado;
}

// Registrar componentes de Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title
);

interface RecepcionesProps {
  recepciones: Recepcion[];
}

const Recepciones = ({ recepciones }: RecepcionesProps) => {
  const [productorSeleccionado, setProductorSeleccionado] =
    useState<string>("todos");
  const [mostrarDetalles, setMostrarDetalles] = useState<boolean>(false);
  const [mostrarNotaDespezonado, setMostrarNotaDespezonado] =
    useState<boolean>(false);
  const [mostrarFechas, setMostrarFechas] = useState<boolean>(false);
  const [mostrarResumenMensual, setMostrarResumenMensual] = useState<boolean>(false);
  // Comentamos esta variable ya que no se utiliza
  // const [mostrarNotaLavado, setMostrarNotaLavado] = useState<boolean>(false);

  // Calcular los totales a partir de los datos de recepciones
  const datosCompletos = useMemo(() => {
    // Calcular el total de kilos recepcionados
    const kilosRealesRecepcionados = recepciones.reduce(
      (total, r) => total + r.kilosRecepcionados,
      0
    );
    
    // Calcular kilos no lavados
    const kilosNoLavados = recepciones.reduce(
      (total, r) => total + (r.kilosNoLavados || 0),
      0
    );
    
    // Calcular kilos netos
    const kilosRecepcionadosNetos = kilosRealesRecepcionados - kilosNoLavados;
    
    // Calcular kilos con despezonado
    const recepcionesConDespezonado = recepciones.filter(r => r.kilosDespezonados > 0);
    const kilosRecepcionadosConDespezonado = recepcionesConDespezonado.reduce(
      (total, r) => total + r.kilosRecepcionados,
      0
    );
    
    // Calcular totales de lavado con despezonado
    const kilosDespezonados = recepcionesConDespezonado.reduce(
      (total, r) => total + r.kilosDespezonados,
      0
    );
    const kilosLavadosConDespezonado = recepcionesConDespezonado.reduce(
      (total, r) => total + r.kilosLavados,
      0
    );
    
    // Calcular totales de lavado sin despezonado
    const recepcionesSinDespezonado = recepciones.filter(r => r.kilosDespezonados === 0);
    const kilosRecepcionadosSinDespezonado = recepcionesSinDespezonado.reduce(
      (total, r) => total + r.kilosRecepcionados,
      0
    );
    const kilosNoLavadosSinDespezonado = recepcionesSinDespezonado.reduce(
      (total, r) => total + (r.kilosNoLavados || 0),
      0
    );
    const kilosRecepcionadosNetosSinDespezonado = kilosRecepcionadosSinDespezonado - kilosNoLavadosSinDespezonado;
    const kilosLavadosSinDespezonado = recepcionesSinDespezonado.reduce(
      (total, r) => total + r.kilosLavados,
      0
    );
    
    // Agrupar recepciones por productor
    const porProductor = Object.entries(datosCierre.datosProductores).map(
      ([productor, datos]) => ({
        productor,
        recepciones: datos.recepciones,
      })
    );
    
    return {
      total: Object.values(datosCierre.datosProductores).reduce(
        (sum, data) => sum + data.recepciones, 
        0
      ),
      porProductor,
      kilosRealesRecepcionados,
      kilosNoLavados,
      kilosRecepcionadosNetos,
      kilosRecepcionadosConDespezonado,
      kilosLavadoConDespezonado: {
        kilosDespezonados,
        kilosLavados: kilosLavadosConDespezonado,
      },
      kilosLavadoSinDespezonado: {
        kilosRecepcionados: kilosRecepcionadosSinDespezonado,
        kilosNoLavados: kilosNoLavadosSinDespezonado,
        kilosRecepcionadosNetos: kilosRecepcionadosNetosSinDespezonado,
        kilosLavados: kilosLavadosSinDespezonado,
      },
    };
  }, [recepciones]);

  // Mapa de recepciones por productor
  const recepcionesPorProductor = useMemo(() => {
    return Object.fromEntries(
      Object.entries(datosCierre.datosProductores).map(([key, value]) => [
        key,
        value.recepciones,
      ])
    );
  }, []);

  // Obtener lista de productores únicos
  const productores = useMemo(() => {
    const productoresUnicos = Array.from(
      new Set(recepciones.map((r) => r.productor))
    );
    return ["todos", ...productoresUnicos];
  }, [recepciones]);

  // Filtrar recepciones según el productor seleccionado
  const recepcionesFiltradas = useMemo(() => {
    if (productorSeleccionado === "todos") {
      return recepciones;
    }
    return recepciones.filter((r) => r.productor === productorSeleccionado);
  }, [recepciones, productorSeleccionado]);

  // Calcular totales
  const totales = useMemo(() => {
    const totalKilosRecepcionados = recepcionesFiltradas.reduce(
      (total, r) => total + r.kilosRecepcionados,
      0
    );
    const totalKilosDespezonados = recepcionesFiltradas.reduce(
      (total, r) => total + r.kilosDespezonados,
      0
    );
    const totalKilosLavados = recepcionesFiltradas.reduce(
      (total, r) => total + r.kilosLavados,
      0
    );
    const totalKilosNoLavados = recepcionesFiltradas.reduce(
      (total, r) => total + (r.kilosNoLavados || 0),
      0
    );
    const totalKilosRecepcionadosNetos =
      totalKilosRecepcionados - totalKilosNoLavados;

    const totalMermaDespezonadoHoja = recepcionesFiltradas.reduce(
      (total, r) => total + r.mermaDespezonado.hoja,
      0
    );
    const totalMermaDespezonadoJugo = recepcionesFiltradas.reduce(
      (total, r) => total + r.mermaDespezonado.jugo,
      0
    );
    const totalMermaDespezonadoDesecho = recepcionesFiltradas.reduce(
      (total, r) => total + r.mermaDespezonado.desecho,
      0
    );

    const totalMermaLavadoJugo = recepcionesFiltradas.reduce(
      (total, r) => total + r.mermaLavado.jugo,
      0
    );
    const totalMermaLavadoHongo = recepcionesFiltradas.reduce(
      (total, r) => total + r.mermaLavado.hongo,
      0
    );
    const totalMermaLavadoFrutaMalDesp = recepcionesFiltradas.reduce(
      (total, r) => total + r.mermaLavado.frutaMalDespezonada,
      0
    );
    const totalMermaLavadoDesecho = recepcionesFiltradas.reduce(
      (total, r) => total + r.mermaLavado.desecho,
      0
    );

    const totalMermaDespezonado =
      totalMermaDespezonadoHoja +
      totalMermaDespezonadoJugo +
      totalMermaDespezonadoDesecho;
    const totalMermaLavado =
      totalMermaLavadoJugo +
      totalMermaLavadoHongo +
      totalMermaLavadoFrutaMalDesp +
      totalMermaLavadoDesecho;

    return {
      totalKilosRecepcionados,
      totalKilosDespezonados,
      totalKilosLavados,
      totalKilosNoLavados,
      totalKilosRecepcionadosNetos,
      totalMermaDespezonado,
      totalMermaLavado,
      mermaDespezonado: {
        hoja: totalMermaDespezonadoHoja,
        jugo: totalMermaDespezonadoJugo,
        desecho: totalMermaDespezonadoDesecho,
      },
      mermaLavado: {
        jugo: totalMermaLavadoJugo,
        hongo: totalMermaLavadoHongo,
        frutaMalDespezonada: totalMermaLavadoFrutaMalDesp,
        desecho: totalMermaLavadoDesecho,
      },
    };
  }, [recepcionesFiltradas]);

  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Datos para gráfico de barras de recepciones agrupadas por productor
  const datosGraficoRecepciones = useMemo(() => {
    // Agrupar recepciones por productor
    const productoResumen = new Map();

    recepcionesFiltradas.forEach((r) => {
      if (!productoResumen.has(r.productor)) {
        productoResumen.set(r.productor, {
          kilosRecepcionados: 0,
          kilosDespezonados: 0,
          kilosLavados: 0,
          recepciones: 0,
        });
      }

      const datos = productoResumen.get(r.productor);
      datos.kilosRecepcionados += r.kilosRecepcionados;
      datos.kilosDespezonados += r.kilosDespezonados;
      datos.kilosLavados += r.kilosLavados;
      datos.recepciones += 1;

      productoResumen.set(r.productor, datos);
    });

    // Convertir el Map a arrays para el gráfico
    const productores = Array.from(productoResumen.keys());
    const datosRecepcionados = Array.from(productoResumen.values()).map(
      (d) => d.kilosRecepcionados
    );
    const datosDespezonados = Array.from(productoResumen.values()).map(
      (d) => d.kilosDespezonados
    );
    const datosLavados = Array.from(productoResumen.values()).map(
      (d) => d.kilosLavados
    );

    return {
      labels: productores,
      datasets: [
        {
          label: "Kilos Recepcionados",
          data: datosRecepcionados,
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Verde (teal)
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Kilos Despezonados",
          data: datosDespezonados,
          backgroundColor: "rgba(54, 162, 235, 0.6)", // Azul
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Kilos Lavados",
          data: datosLavados,
          backgroundColor: "rgba(255, 99, 132, 0.6)", // Rojo
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [recepcionesFiltradas]);
  
  const porcentajes = {
    mermaDespezonado:
      totales.totalKilosDespezonados > 0
        ? ((totales.mermaDespezonado.hoja + totales.mermaDespezonado.desecho) /
            (productorSeleccionado === "todos"
              ? datosCompletos.kilosRecepcionadosConDespezonado
              : totales.totalKilosRecepcionados)) *
          100
        : 0,
    mermaLavado:
      totales.totalKilosDespezonados > 0
        ? ((totales.mermaLavado.hongo + totales.mermaLavado.desecho) / totales.totalKilosDespezonados) * 100
        : 0,
    rendimientoDespezonado:
      productorSeleccionado === "todos" 
        ? (355250.51 / 441228.20) * 100 
        : productorSeleccionado === "P. Farías"
          ? (totales.totalKilosDespezonados / 5492) * 100
          : (totales.totalKilosDespezonados / totales.totalKilosRecepcionados) * 100,
    rendimientoLavado:
      productorSeleccionado === "todos"
        ? (327275.22 / totales.totalKilosDespezonados) * 100
        : productorSeleccionado === "C. Giofer Spa" || 
          productorSeleccionado === "J. Carrasco" || 
          productorSeleccionado === "F. Carrasco" ||
          productorSeleccionado === "P. Farías" ||
          productorSeleccionado === "L. Carrasco"
          ? (totales.totalKilosLavados / totales.totalKilosRecepcionados) * 100
          : (totales.totalKilosDespezonados > 0
            ? (totales.totalKilosLavados / totales.totalKilosDespezonados) * 100
            : 0),
    rendimientoTotal:
      totales.totalKilosRecepcionados > 0
        ? (totales.totalKilosLavados / totales.totalKilosRecepcionados) * 100
        : 0,
    // Porcentaje total de merma
    mermaTotal:
      totales.totalKilosRecepcionados > 0
        ? ((totales.mermaDespezonado.hoja + totales.mermaDespezonado.desecho + 
            totales.mermaLavado.hongo + totales.mermaLavado.desecho) / 
            totales.totalKilosRecepcionados) * 100
        : 0,
    // Porcentaje total de jugo
    jugoTotal:
      totales.totalKilosRecepcionados > 0
        ? ((totales.mermaDespezonado.jugo + 
            totales.mermaLavado.jugo + 
            totales.mermaLavado.frutaMalDespezonada +
            totales.totalKilosNoLavados) / 
            totales.totalKilosRecepcionados) * 100
        : 0,
    // Rendimiento final incluyendo jugo
    rendimientoConJugo:
      totales.totalKilosRecepcionados > 0
        ? ((totales.totalKilosLavados + 
            totales.mermaDespezonado.jugo + 
            totales.mermaLavado.jugo + 
            totales.mermaLavado.frutaMalDespezonada +
            totales.totalKilosNoLavados) / 
            totales.totalKilosRecepcionados) * 100
        : 0,
  };

  // Kilos totales de merma
  const totalKilosMerma = 
    totales.mermaDespezonado.hoja + 
    totales.mermaDespezonado.desecho + 
    totales.mermaLavado.hongo + 
    totales.mermaLavado.desecho;
    
  // Kilos totales de jugo
  const totalKilosJugo = 
    totales.mermaDespezonado.jugo + 
    totales.mermaLavado.jugo + 
    totales.mermaLavado.frutaMalDespezonada +
    totales.totalKilosNoLavados;

  return (
    <div>
      <motion.h2 
        className="text-2xl font-semibold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Detalle de Recepciones
        <button 
          onClick={() => setMostrarFechas(true)}
          className="ml-2 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          title="Ver fechas de recepciones"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </button>
        <button 
          onClick={() => setMostrarResumenMensual(!mostrarResumenMensual)}
          className="ml-2 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          title="Ver resumen mensual de recepciones"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
        </button>
      </motion.h2>

      {/* Nota aclaratoria sobre datos excluidos */}
      <motion.div
        className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-sm font-medium text-amber-800">Nota: Datos excluidos de los cálculos</h3>
        <ul className="mt-2 text-sm text-amber-700 space-y-1">
          <li>• Recepciones 1-4 de L. Carrasco (10.111 Kg) por deterioro total de la carga.</li>
          <li>• Recepción R-23 del 19-02-2025 (6.202 Kg) por devolución al productor.</li>
        </ul>
      </motion.div>

      {/* Modal para mostrar fechas */}
      {mostrarFechas && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="relative w-full max-w-2xl">
            <FechasRecepcion onClose={() => setMostrarFechas(false)} />
          </div>
        </div>
      )}

      {/* Selector de productor */}
      <div className="mb-6 flex justify-center">
        <div className="inline-block relative">
          <label
            htmlFor="productor"
            className="block text-sm font-medium text-gray-700 mb-1 text-center"
          >
            Filtrar por Productor:
          </label>
          <select
            id="productor"
            value={productorSeleccionado}
            onChange={(e) => setProductorSeleccionado(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {productores.map((productor) => (
              <option key={productor} value={productor}>
                {productor === "todos" ? "Todos los Productores" : productor}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-6">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Resumen de totales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
        <motion.div 
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Kilos Recepcionados
          </h3>
          <p className="text-3xl font-bold text-green-700">
            {formatearNumero(
              productorSeleccionado === "todos"
                ? datosCompletos.kilosRealesRecepcionados
                : totales.totalKilosRecepcionados
            )}{" "}
            kg
          </p>
          <div className="text-sm text-gray-600 mt-1 jus">
            <p>
              {productorSeleccionado === "todos"
                ? "Recepciones totales: 75"
                : `Recepciones: ${
                    recepcionesPorProductor[
                      productorSeleccionado as keyof typeof recepcionesPorProductor
                    ] || 1
                  }`}
            </p>
            {productorSeleccionado === "todos" && (
              <div className="flex justify-center mt-1">
                <button
                  onClick={() => setMostrarDetalles(!mostrarDetalles)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  {mostrarDetalles
                    ? "Ocultar detalles"
                    : "Ver distribución por productor"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 ml-1"
                  >
                    {mostrarDetalles ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    )}
                  </svg>
                </button>
              </div>
            )}

            {/* Panel de detalles */}
            {mostrarDetalles && (
              <div className="mt-2 text-xs bg-white p-3 rounded border border-gray-200">
                <p className="font-medium mb-2 text-center">
                  Detalle por Productor
                </p>
                <div className="overflow-hidden">
                  {datosCompletos.porProductor.map((item) => (
                    <div
                      key={item.productor}
                      className="flex justify-between items-center py-1 px-2 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <span>{item.productor}</span>
                      <span className="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full">
                        {item.recepciones}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-[10px] text-center mt-2">
                  Total: {datosCompletos.total} recepciones
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-medium text-purple-800 mb-2">
            Kilos Despezonados
          </h3>
          <p className="text-3xl font-bold text-purple-700">
            {formatearNumero(totales.totalKilosDespezonados)} kg
          </p>
          <div className="text-sm text-gray-600 mt-1">
            <p className="flex items-center justify-center">
              Rendimiento área despezonado:{" "}
              {formatearNumero(porcentajes.rendimientoDespezonado)}%
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-lg" 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium text-blue-800 mb-2">
            Kilos Lavados
          </h3>
          <p className="text-3xl font-bold text-blue-700">
            {formatearNumero(totales.totalKilosLavados)} kg
          </p>
          <div className="text-sm text-gray-600 mt-1">
            <p className="flex items-center justify-center">
              Rendimiento área lavado:{" "}
              {formatearNumero(porcentajes.rendimientoLavado)}%
            </p>
          </div>
        </motion.div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gráfico de recepciones */}
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-medium mb-4 text-center">
            Comparativa por Productor
          </h3>
          <div className="h-80">
            <Bar
              data={datosGraficoRecepciones}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Kilos por productor y etapa de proceso",
                  },
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      afterTitle: (tooltipItems) => {
                        const producerIndex = tooltipItems[0].dataIndex;
                        const producer =
                          datosGraficoRecepciones.labels[producerIndex];
                        let recCount = 0;
                        recepcionesFiltradas.forEach((r) => {
                          if (r.productor === producer) recCount++;
                        });
                        return `Recepciones: ${recCount}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Tabla de detalle de mermas */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-medium p-4 bg-gradient-to-r from-gray-50 to-gray-100">
            Detalle de Procesos
          </h3>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sección de Jugo */}
            <motion.div 
              className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-md font-medium text-amber-800 mb-3 border-b border-amber-200 pb-2">
                Jugo
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <motion.div 
                  className="bg-white p-3 rounded-lg shadow"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-amber-800">Jugo Despezonado</p>
                  <p className="text-lg font-bold text-amber-700">
                    {formatearNumero(totales.mermaDespezonado.jugo)} kg
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white p-3 rounded-lg shadow"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-amber-800">Jugo Lavado</p>
                  <p className="text-lg font-bold text-amber-700">
                    {formatearNumero(totales.mermaLavado.jugo)} kg
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white p-3 rounded-lg shadow"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-amber-800">Fruta Mal Desp.</p>
                  <p className="text-lg font-bold text-amber-700">
                    {formatearNumero(totales.mermaLavado.frutaMalDespezonada)} kg
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white p-3 rounded-lg shadow"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-amber-800">No Lavado</p>
                  <p className="text-lg font-bold text-amber-700">
                    {formatearNumero(totales.totalKilosNoLavados)} kg
                  </p>
                </motion.div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-amber-200">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-md font-medium text-amber-800">Total Jugo:</p>
                  <p className="text-xl font-bold text-amber-700">
                    {formatearNumero(totalKilosJugo)} kg
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-amber-700">Porcentaje del total:</p>
                  <p className="text-lg font-bold text-amber-700">
                    {formatearNumero(porcentajes.jugoTotal)}%
                  </p>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min(porcentajes.jugoTotal, 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Sección de Mermas */}
            <motion.div 
              className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h4 className="text-md font-medium text-red-800 mb-3 border-b border-red-200 pb-2">
                Detalle de Mermas
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-red-800 mb-2">
                    Merma Despezonado: {formatearNumero(totales.mermaDespezonado.hoja + totales.mermaDespezonado.desecho)} kg ({formatearNumero(porcentajes.mermaDespezonado)}%)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div 
                      className="bg-white p-3 rounded-lg shadow"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm font-medium text-red-800">Hoja</p>
                      <p className="text-lg font-bold text-red-700">
                        {formatearNumero(totales.mermaDespezonado.hoja)} kg
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-white p-3 rounded-lg shadow"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm font-medium text-red-800">Desecho</p>
                      <p className="text-lg font-bold text-red-700">
                        {formatearNumero(totales.mermaDespezonado.desecho)} kg
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-800 mb-2">
                    Merma Lavado: {formatearNumero(totales.mermaLavado.hongo + totales.mermaLavado.desecho)} kg ({formatearNumero(porcentajes.mermaLavado)}%)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div 
                      className="bg-white p-3 rounded-lg shadow"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm font-medium text-blue-800">Hongo</p>
                      <p className="text-lg font-bold text-blue-700">
                        {formatearNumero(totales.mermaLavado.hongo)} kg
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-white p-3 rounded-lg shadow"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm font-medium text-blue-800">Desecho</p>
                      <p className="text-lg font-bold text-blue-700">
                        {formatearNumero(totales.mermaLavado.desecho)} kg
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-red-200">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-md font-medium text-red-800">Total Merma:</p>
                    <p className="text-xl font-bold text-red-700">
                      {formatearNumero(totalKilosMerma)} kg
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-red-700">Porcentaje del total:</p>
                    <p className="text-lg font-bold text-red-700">
                      {formatearNumero(porcentajes.mermaTotal)}%
                    </p>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${Math.min(porcentajes.mermaTotal, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rendimiento Final */}
            <motion.div 
              className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{ gridColumn: "span 2" }}
            >
              <p className="text-md font-medium text-emerald-800 border-b border-emerald-200 pb-2 mb-2">
                Rendimiento Final
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-emerald-700 mb-1">Sin incluir jugo:</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {formatearNumero(porcentajes.rendimientoTotal)}%
                  </p>
                  <p className="text-xs text-emerald-600">
                    Relación entre kilos lavados y kilos recepcionados
                  </p>
                </div>
                <div>
                  <p className="text-sm text-emerald-700 mb-1">Incluyendo jugo:</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {formatearNumero(porcentajes.rendimientoConJugo)}%
                  </p>
                  <p className="text-xs text-emerald-600">
                    Rendimiento total considerando productos derivados
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Tabla de recepciones */}
      {recepcionesFiltradas.length > 0 && (
        <div 
          className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden opacity-100 transform translate-y-0 transition-all duration-500"
        >
          <h3 className="text-lg font-medium p-4 bg-gradient-to-r from-gray-50 to-gray-100">
            Listado de Recepciones
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nº
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Productor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kilos Recepcionados
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kilos Despezonados
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kilos Lavados
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rend. Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recepcionesFiltradas.map((recepcion, index) => {
                  const recepcionNeta =
                    recepcion.kilosRecepcionados -
                    (recepcion.kilosNoLavados || 0);
                  
                  // Calcular el rendimiento incluyendo jugo
                  const rendimientoConJugo =
                    recepcion.kilosRecepcionados > 0
                      ? ((recepcion.kilosLavados + 
                         (recepcion.mermaDespezonado?.jugo || 0) + 
                         (recepcion.mermaLavado?.jugo || 0) + 
                         (recepcion.mermaLavado?.frutaMalDespezonada || 0) +
                         (recepcion.kilosNoLavados || 0)) / 
                         recepcion.kilosRecepcionados) * 100
                      : 0;

                  return (
                    <tr 
                      key={recepcion.numero}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {recepcion.numero}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {recepcion.productor}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatearNumero(recepcion.kilosRecepcionados)} kg
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatearNumero(recepcion.kilosDespezonados)} kg
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatearNumero(recepcion.kilosLavados)} kg
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatearNumero(rendimientoConJugo)}%
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resumen mensual */}
      <ResumenMensual visible={mostrarResumenMensual} />
    </div>
  );
};

export default Recepciones;
