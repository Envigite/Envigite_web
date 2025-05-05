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
  TimeScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

// Registrar componentes adicionales de Chart.js
ChartJS.register(
  TimeScale,
  LineElement,
  PointElement
);

interface Recepcion {
  numero: number;
  productor: string;
  kilosRecepcionados: number;
  kilosDespezonados: number;
  kilosLavados: number;
  kilosNoLavados?: number;
  fecha?: string;
}

interface FechasRecepcionesProps {
  recepciones: Recepcion[];
  visible: boolean;
}

const FechasRecepciones = ({ recepciones, visible }: FechasRecepcionesProps) => {
  const [filtroProductor, setFiltroProductor] = useState<string>("todos");
  
  // Formatear las fechas y agregar unas predeterminadas si no existen
  const recepcionesConFechas = useMemo(() => {
    const fechasEstimadas = {
      1: "2024-01-15",
      2: "2024-01-15", 
      3: "2024-01-29",
      4: "2024-01-29",
      5: "2024-02-15",
      6: "2024-03-05"
    };
    
    return recepciones.map(r => ({
      ...r,
      fechaFormateada: r.fecha ? new Date(r.fecha.split('/').reverse().join('-')) : 
        new Date(fechasEstimadas[r.numero as keyof typeof fechasEstimadas] || "2024-02-15")
    }));
  }, [recepciones]);
  
  // Obtener lista de productores únicos
  const productores = useMemo(() => {
    const productoresUnicos = Array.from(
      new Set(recepciones.map((r) => r.productor))
    );
    return ["todos", ...productoresUnicos];
  }, [recepciones]);
  
  // Filtrar por productor
  const recepcionesFiltradas = useMemo(() => {
    if (filtroProductor === "todos") {
      return recepcionesConFechas;
    }
    return recepcionesConFechas.filter(r => r.productor === filtroProductor);
  }, [recepcionesConFechas, filtroProductor]);
  
  // Datos para el gráfico de líneas por fecha
  const datosGraficoFechas = useMemo(() => {
    // Agrupar por fecha
    const recepcionesPorFecha = new Map();
    
    recepcionesFiltradas.forEach(r => {
      const fechaKey = r.fechaFormateada.toISOString().split('T')[0];
      
      if (!recepcionesPorFecha.has(fechaKey)) {
        recepcionesPorFecha.set(fechaKey, {
          fecha: r.fechaFormateada,
          kilosRecepcionados: 0,
          kilosLavados: 0,
          recepciones: 0
        });
      }
      
      const datos = recepcionesPorFecha.get(fechaKey);
      datos.kilosRecepcionados += r.kilosRecepcionados;
      datos.kilosLavados += r.kilosLavados;
      datos.recepciones += 1;
      
      recepcionesPorFecha.set(fechaKey, datos);
    });
    
    // Convertir a arrays ordenados por fecha
    const fechasOrdenadas = Array.from(recepcionesPorFecha.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
    
    const fechas = fechasOrdenadas.map(([_, datos]) => datos.fecha);
    const kilosRecepcionados = fechasOrdenadas.map(([_, datos]) => datos.kilosRecepcionados);
    const kilosLavados = fechasOrdenadas.map(([_, datos]) => datos.kilosLavados);
    
    return {
      labels: fechas,
      datasets: [
        {
          label: "Kilos Recepcionados",
          data: kilosRecepcionados,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Kilos Lavados",
          data: kilosLavados,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.4,
          fill: true,
        }
      ]
    };
  }, [recepcionesFiltradas]);
  
  if (!visible) return null;
  
  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Recepciones por Fecha</h3>
        
        <div className="inline-block relative">
          <select
            value={filtroProductor}
            onChange={(e) => setFiltroProductor(e.target.value)}
            className="block appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {productores.map((productor) => (
              <option key={productor} value={productor}>
                {productor === "todos" ? "Todos los Productores" : productor}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <Line
          data={datosGraficoFechas}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  tooltipFormat: 'dd/MM/yyyy',
                  displayFormats: {
                    day: 'dd/MM'
                  }
                },
                adapters: {
                  date: {
                    locale: undefined
                  }
                },
                title: {
                  display: true,
                  text: 'Fecha'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Kilos'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: (context) => {
                    const dataIndex = context[0].dataIndex;
                    const datasetIndex = context[0].datasetIndex;
                    
                    // Obtener la fecha del punto
                    const fechaKey = datosGraficoFechas.labels[dataIndex].toISOString().split('T')[0];
                    
                    // Encontrar las recepciones para esa fecha
                    const recepcionesFecha = recepcionesFiltradas.filter(r => 
                      r.fechaFormateada.toISOString().split('T')[0] === fechaKey
                    );
                    
                    return `Recepciones: ${recepcionesFecha.length}`;
                  }
                }
              },
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Distribución de recepciones por fecha'
              }
            }
          }}
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Nota: Algunas fechas son estimadas según el número de recepción</p>
      </div>
    </div>
  );
};

export default FechasRecepciones; 