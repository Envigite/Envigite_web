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
  // Comentamos esta variable ya que no se utiliza
  // const [mostrarNotaLavado, setMostrarNotaLavado] = useState<boolean>(false);

  // Datos de todas las recepciones (75 en total)
  const datosCompletos = {
    total: 75,
    porProductor: [
      { productor: "P. Farías", recepciones: 8 },
      { productor: "L. Carrasco", recepciones: 3 },
      { productor: "J. Carrasco", recepciones: 1 },
      { productor: "F. Carrasco", recepciones: 1 },
      { productor: "C. Giofer Spa", recepciones: 7 },
      { productor: "Agricola Frut JH SPA", recepciones: 52 },
    ],
    kilosRealesRecepcionados: 542277,
    kilosNoLavados: 22561.1,
    kilosRecepcionadosNetos: 519716.05, // Total descontando lo no lavado
    kilosRecepcionadosConDespezonado: 412207,
    kilosLavadoConDespezonado: {
      kilosDespezonados: 331272,
      kilosLavados: 304437,
    },
    kilosLavadoSinDespezonado: {
      kilosRecepcionados: 109178,
      kilosNoLavados: 20892,
      kilosRecepcionadosNetos: 88286,
      kilosLavados: 94946,
    },
  };

  // Mapa de recepciones por productor
  const recepcionesPorProductor = {
    "L. Carrasco": 3,
    "P. Farías": 8,
    "F. Carrasco": 1,
    "J. Carrasco": 1,
    "C. Giofer Spa": 7,
    "Agricola Frut JH SPA": 52,
  };

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

  // Comentamos las variables que no se utilizan pero conservamos su utilidad
  /*
  // Datos para el gráfico de barras de mermas
  const datosGraficoMermas = useMemo(() => {
    const categorias = [
      "Merma Despezonado - Hoja",
      "Merma Despezonado - Jugo",
      "Merma Despezonado - Desecho",
      "Merma Lavado - Jugo",
      "Merma Lavado - Hongo",
      "Merma Lavado - Fruta Mal Desp.",
      "Merma Lavado - Desecho",
    ];

    const datos = [
      totales.mermaDespezonado.hoja,
      totales.mermaDespezonado.jugo,
      totales.mermaDespezonado.desecho,
      totales.mermaLavado.jugo,
      totales.mermaLavado.hongo,
      totales.mermaLavado.frutaMalDespezonada,
      totales.mermaLavado.desecho,
    ];

    return {
      labels: categorias,
      datasets: [
        {
          label: "Kilos",
          data: datos,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)", // Verde teal
            "rgba(75, 192, 192, 0.8)", // Verde teal más oscuro
            "rgba(75, 192, 192, 0.4)", // Verde teal más claro
            "rgba(54, 162, 235, 0.6)", // Azul
            "rgba(54, 162, 235, 0.8)", // Azul más oscuro
            "rgba(54, 162, 235, 0.4)", // Azul más claro
            "rgba(255, 99, 132, 0.6)", // Rojo
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)", // Verde teal
            "rgba(75, 192, 192, 1)", // Verde teal
            "rgba(75, 192, 192, 1)", // Verde teal
            "rgba(54, 162, 235, 1)", // Azul
            "rgba(54, 162, 235, 1)", // Azul
            "rgba(54, 162, 235, 1)", // Azul
            "rgba(255, 99, 132, 1)", // Rojo
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [totales]);

  // Datos para el gráfico de líneas de rendimiento (recepcionado vs lavado)
  const datosGraficoRendimiento = useMemo(() => {
    // Calcular resumen por número de recepción
    const numerosRecepcion = Array.from(
      new Set(recepcionesFiltradas.map((r) => r.numero))
    ).sort((a, b) => a - b);

    const datosRecepcionados = [];
    const datosLavados = [];

    for (const numero of numerosRecepcion) {
      const recepcionesFiltro = recepcionesFiltradas.filter(
        (r) => r.numero === numero
      );

      const totalRecepcionado = recepcionesFiltro.reduce(
        (sum, r) => sum + r.kilosRecepcionados,
        0
      );

      const totalLavado = recepcionesFiltro.reduce(
        (sum, r) => sum + r.kilosLavados,
        0
      );

      datosRecepcionados.push(totalRecepcionado);
      datosLavados.push(totalLavado);
    }

    return {
      labels: numerosRecepcion.map((n) => `Recepción ${n}`),
      datasets: [
        {
          label: "Kilos Recepcionados",
          data: datosRecepcionados,
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Verde teal
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.2,
        },
        {
          label: "Kilos Lavados",
          data: datosLavados,
          backgroundColor: "rgba(54, 162, 235, 0.6)", // Azul
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.2,
        },
      ],
    };
  }, [recepcionesFiltradas]);

  // Datos para el gráfico de barras apiladas del proceso
  const datosGraficoProceso = useMemo(() => {
    const datosKilosDespezonados = recepcionesFiltradas.filter(
      (r) => r.kilosDespezonados > 0
    );
    const datosKilosSinDespezonar = recepcionesFiltradas.filter(
      (r) => r.kilosDespezonados === 0
    );

    // Kilos que pasaron por despezonado
    const totalDespezonado = datosKilosDespezonados.reduce(
      (sum, r) => sum + r.kilosDespezonados,
      0
    );
    const totalLavadoConDespezonado = datosKilosDespezonados.reduce(
      (sum, r) => sum + r.kilosLavados,
      0
    );
    const mermaDespezonadoHoja = datosKilosDespezonados.reduce(
      (sum, r) => sum + r.mermaDespezonado.hoja,
      0
    );
    const mermaDespezonadoJugo = datosKilosDespezonados.reduce(
      (sum, r) => sum + r.mermaDespezonado.jugo,
      0
    );
    const mermaDespezonadoDesecho = datosKilosDespezonados.reduce(
      (sum, r) => sum + r.mermaDespezonado.desecho,
      0
    );
    const mermaLavadoConDespezonado =
      totalDespezonado -
      totalLavadoConDespezonado -
      mermaDespezonadoHoja -
      mermaDespezonadoJugo -
      mermaDespezonadoDesecho;

    // Kilos sin despezonar
    const totalRecepcionadoSinDespezonar = datosKilosSinDespezonar.reduce(
      (sum, r) => sum + r.kilosRecepcionados,
      0
    );
    const totalLavadoSinDespezonar = datosKilosSinDespezonar.reduce(
      (sum, r) => sum + r.kilosLavados,
      0
    );
    const totalNoLavado = datosKilosSinDespezonar.reduce(
      (sum, r) => sum + (r.kilosNoLavados || 0),
      0
    );
    const mermaLavadoSinDespezonado =
      totalRecepcionadoSinDespezonar - totalLavadoSinDespezonar - totalNoLavado;

    return {
      labels: ["Con Despezonado", "Sin Despezonar"],
      datasets: [
        {
          label: "Lavado",
          data: [totalLavadoConDespezonado, totalLavadoSinDespezonar],
          backgroundColor: "rgba(75, 192, 192, 0.8)", // Verde teal
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Merma Despezonado - Hoja",
          data: [mermaDespezonadoHoja, 0],
          backgroundColor: "rgba(54, 162, 235, 0.8)", // Azul
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Merma Despezonado - Jugo",
          data: [mermaDespezonadoJugo, 0],
          backgroundColor: "rgba(54, 162, 235, 0.6)", // Azul más claro
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Merma Despezonado - Desecho",
          data: [mermaDespezonadoDesecho, 0],
          backgroundColor: "rgba(54, 162, 235, 0.4)", // Azul aún más claro
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Merma Lavado",
          data: [mermaLavadoConDespezonado, mermaLavadoSinDespezonado],
          backgroundColor: "rgba(255, 99, 132, 0.8)", // Rojo
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "No Lavado",
          data: [0, totalNoLavado],
          backgroundColor: "rgba(255, 206, 86, 0.8)", // Amarillo
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [recepcionesFiltradas]);
  */

  // Optimizamos estas variables para que se usen en renderizado condicional futuro
  const datosGraficoMermas = null;
  const datosGraficoRendimiento = null;
  const datosGraficoProceso = null;

  // Calcular porcentajes
  const porcentajes = {
    mermaDespezonado:
      totales.totalKilosDespezonados > 0
        ? (totales.totalMermaDespezonado /
            (productorSeleccionado === "todos"
              ? datosCompletos.kilosRecepcionadosConDespezonado
              : totales.totalKilosRecepcionados)) *
          100
        : 0,
    mermaLavado:
      totales.totalKilosDespezonados > 0
        ? (totales.totalMermaLavado / totales.totalKilosDespezonados) * 100
        : 0,
    rendimientoDespezonado:
      totales.totalKilosDespezonados > 0
        ? (totales.totalKilosDespezonados /
            (productorSeleccionado === "todos"
              ? datosCompletos.kilosRecepcionadosConDespezonado
              : totales.totalKilosRecepcionados)) *
          100
        : 0,
    rendimientoLavado: 0, // Se calculará después
    rendimientoTotal:
      totales.totalKilosRecepcionados > 0
        ? (totales.totalKilosLavados / totales.totalKilosRecepcionadosNetos) *
          100
        : 0,
  };

  // Calcular el rendimiento ponderado del lavado
  if (productorSeleccionado === "todos") {
    const totalKilosLavadosProcesados =
      datosCompletos.kilosLavadoConDespezonado.kilosDespezonados +
      datosCompletos.kilosLavadoSinDespezonado.kilosRecepcionados;

    const totalKilosLavadosResultantes =
      datosCompletos.kilosLavadoConDespezonado.kilosLavados +
      datosCompletos.kilosLavadoSinDespezonado.kilosLavados;

    // Rendimiento promedio ponderado con la fórmula correcta
    porcentajes.rendimientoLavado =
      totalKilosLavadosProcesados > 0
        ? (totalKilosLavadosResultantes / totalKilosLavadosProcesados) * 100
        : 0;
  } else {
    // Para un productor específico, calculamos el rendimiento de lavado directo
    porcentajes.rendimientoLavado =
      totales.totalKilosRecepcionadosNetos > 0
        ? (totales.totalKilosLavados / totales.totalKilosRecepcionadosNetos) *
          100
        : 0;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Detalle de Recepciones
      </h2>

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
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Kilos Recepcionados
          </h3>
          <p className="text-3xl font-bold">
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

            {/* Mostrar información de kilos no lavados si existen */}
            {totales.totalKilosNoLavados > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Incluye {formatearNumero(totales.totalKilosNoLavados)} kg no
                procesados en lavado
              </p>
            )}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-purple-800 mb-2">
            Kilos Despezonados
          </h3>
          <p className="text-3xl font-bold">
            {formatearNumero(totales.totalKilosDespezonados)} kg
          </p>
          <div className="text-sm text-gray-600 mt-1">
            <p className="flex items-center justify-center">
              Rendimiento área despezonado:{" "}
              {formatearNumero(porcentajes.rendimientoDespezonado)}%
              <button
                onClick={() =>
                  setMostrarNotaDespezonado(!mostrarNotaDespezonado)
                }
                className="ml-1 text-gray-400 hover:text-gray-600"
                title="Información importante"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
            </p>

            {mostrarNotaDespezonado && (
              <div className="mt-2 text-xs bg-white p-2 rounded border border-gray-200">
                <p className="mb-1">
                  <span className="font-medium">Nota:</span> El cálculo
                  considera solo los 412.207 kg donde se registró el proceso de
                  despezonado, de un total de 542.277 kg recepcionados.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-blue-800 mb-2">
            Kilos Lavados
          </h3>
          <p className="text-3xl font-bold">
            {formatearNumero(totales.totalKilosLavados)} kg
          </p>
          <div className="text-sm text-gray-600 mt-1">
            <p className="flex items-center justify-center">
              Rendimiento área lavado:{" "}
              {formatearNumero(porcentajes.rendimientoLavado)}%
            </p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gráfico de recepciones */}
        <div className="bg-white p-4 rounded-lg shadow">
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
        </div>

        {/* Tabla de detalle de mermas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-medium p-4 bg-gray-50">
            Detalle de Mermas
          </h3>
          <div className="p-4">
            <div className="mb-4">
              <h4 className="text-md font-medium text-red-800 mb-2">
                Merma Despezonado:{" "}
                {formatearNumero(totales.totalMermaDespezonado)} kg (
                {formatearNumero(porcentajes.mermaDespezonado)}%)
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-red-50 p-2 rounded">
                  <p className="text-sm font-medium">Hoja</p>
                  <p className="text-lg">
                    {formatearNumero(totales.mermaDespezonado.hoja)} kg
                  </p>
                </div>
                <div className="bg-red-50 p-2 rounded">
                  <p className="text-sm font-medium">Jugo</p>
                  <p className="text-lg">
                    {formatearNumero(totales.mermaDespezonado.jugo)} kg
                  </p>
                </div>
                <div className="bg-red-50 p-2 rounded">
                  <p className="text-sm font-medium">Desecho</p>
                  <p className="text-lg">
                    {formatearNumero(totales.mermaDespezonado.desecho)} kg
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-medium text-blue-800 mb-2">
                Merma Lavado: {formatearNumero(totales.totalMermaLavado)} kg (
                {formatearNumero(porcentajes.mermaLavado)}%)
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-sm font-medium">Jugo</p>
                  <p className="text-lg">
                    {formatearNumero(totales.mermaLavado.jugo)} kg
                  </p>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-sm font-medium">Hongo</p>
                  <p className="text-lg">
                    {formatearNumero(totales.mermaLavado.hongo)} kg
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-sm font-medium">Fruta Mal Despezonada</p>
                  <p className="text-lg">
                    {formatearNumero(totales.mermaLavado.frutaMalDespezonada)}{" "}
                    kg
                  </p>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-sm font-medium">Desecho</p>
                  <p className="text-lg">
                    {formatearNumero(totales.mermaLavado.desecho)} kg
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm font-medium text-gray-700">
                Rendimiento Final
              </p>
              <p className="text-xl font-bold text-green-600">
                {formatearNumero(porcentajes.rendimientoTotal)}%
              </p>
              <p className="text-sm text-gray-500">
                De {formatearNumero(datosCompletos.kilosRecepcionadosNetos)} kg
                netos a {formatearNumero(totales.totalKilosLavados)} kg lavados
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Nota:</span> Se descontaron{" "}
                {formatearNumero(datosCompletos.kilosNoLavados)} kg no
                procesados en lavado.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de recepciones */}
      {recepcionesFiltradas.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-medium p-4 bg-gray-50">
            Listado de Recepciones
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
                {recepcionesFiltradas.map((recepcion) => {
                  const recepcionNeta =
                    recepcion.kilosRecepcionados -
                    (recepcion.kilosNoLavados || 0);
                  const rendimientoTotal =
                    recepcionNeta > 0
                      ? (recepcion.kilosLavados / recepcionNeta) * 100
                      : 0;

                  return (
                    <tr key={recepcion.numero}>
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
                          {(recepcion.kilosNoLavados || 0) > 0 && (
                            <div className="text-xs text-gray-500">
                              No Lavado:{" "}
                              {formatearNumero(recepcion.kilosNoLavados || 0)}{" "}
                              kg
                            </div>
                          )}
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
                          {formatearNumero(rendimientoTotal)}%
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
    </div>
  );
};

export default Recepciones;
