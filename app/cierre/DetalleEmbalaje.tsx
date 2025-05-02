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

// Definición local del tipo
interface DatosEmbalaje {
  totalTotes: number;
  pesoTotalTotes: number;
  totalPaletsCajas: number;
  pesoTotalCajas: number;
}

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface DetalleEmbalajeProps {
  datosEmbalaje: DatosEmbalaje;
}

const DetalleEmbalaje = ({ datosEmbalaje }: DetalleEmbalajeProps) => {
  const opcionesGrafico = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: function(context: {chart: {data: {datasets: {data: number[]}[]}}}) {
          // Aumentar el máximo en un 10% para dejar espacio arriba
          const max = context.chart.data.datasets[0].data.reduce((a: number, b: number) => Math.max(a, b), 0);
          return max * 1.1;
        }
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Datos para el gráfico de cantidad
  const datosGraficoCantidad = {
    labels: ["Totes", "Cajas (Palets)"],
    datasets: [{
      label: "Cantidad (unidades)",
      data: [datosEmbalaje.totalTotes, datosEmbalaje.totalPaletsCajas],
      backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)"],
      borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
      borderWidth: 1,
    }]
  };

  // Datos para el gráfico de peso
  const datosGraficoPeso = {
    labels: ["Totes", "Cajas"],
    datasets: [{
      label: "Peso Total (kg)",
      data: [datosEmbalaje.pesoTotalTotes, datosEmbalaje.pesoTotalCajas],
      backgroundColor: ["rgba(255, 159, 64, 0.8)", "rgba(54, 162, 235, 0.8)"],
      borderColor: ["rgba(255, 159, 64, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    }]
  };

  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Calcular porcentajes
  const totalPeso = datosEmbalaje.pesoTotalTotes + datosEmbalaje.pesoTotalCajas;
  const porcentajePesoTotes = (datosEmbalaje.pesoTotalTotes / totalPeso) * 100;
  const porcentajePesoCajas = (datosEmbalaje.pesoTotalCajas / totalPeso) * 100;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Detalle de Embalaje
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tarjetas de información */}
        <div className="space-y-6">
          <div className="bg-teal-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-teal-800 mb-4">Totes</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span>Cantidad:</span>
                <span className="font-semibold">
                  {datosEmbalaje.totalTotes} totes
                </span>
              </div>
              <div className="flex justify-between">
                <span>Peso Total:</span>
                <span className="font-semibold">
                  {formatearNumero(datosEmbalaje.pesoTotalTotes)} kg
                </span>
              </div>
              <div className="flex justify-between">
                <span>Promedio por Tote:</span>
                <span className="font-semibold">
                  {formatearNumero(
                    datosEmbalaje.pesoTotalTotes / datosEmbalaje.totalTotes
                  )}{" "}
                  kg
                </span>
              </div>
              <div className="flex justify-between">
                <span>Porcentaje del Peso Total:</span>
                <span className="font-semibold">
                  {formatearNumero(porcentajePesoTotes)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-indigo-800 mb-4">Cajas</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span>Cantidad (Palets):</span>
                <span className="font-semibold">
                  {datosEmbalaje.totalPaletsCajas} palets
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cantidad (Cajas Aprox.):</span>
                <span className="font-semibold">
                  {formatearNumero(datosEmbalaje.totalPaletsCajas * 48)} cajas
                </span>
              </div>
              <div className="flex justify-between">
                <span>Peso Total:</span>
                <span className="font-semibold">
                  {formatearNumero(datosEmbalaje.pesoTotalCajas)} kg
                </span>
              </div>
              <div className="flex justify-between">
                <span>Promedio por Palet:</span>
                <span className="font-semibold">
                  {formatearNumero(
                    datosEmbalaje.pesoTotalCajas /
                      datosEmbalaje.totalPaletsCajas
                  )}{" "}
                  kg
                </span>
              </div>
              <div className="flex justify-between">
                <span>Porcentaje del Peso Total:</span>
                <span className="font-semibold">
                  {formatearNumero(porcentajePesoCajas)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 text-center">
            Comparativa Totes vs Cajas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow-sm h-[300px]">
              <h4 className="text-sm font-medium text-center mb-2">Cantidades</h4>
              <Bar
                data={datosGraficoCantidad}
                options={{
                  ...opcionesGrafico,
                  maintainAspectRatio: true,
                  plugins: {
                    ...opcionesGrafico.plugins,
                    title: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.dataset.label}: ${formatearNumero(context.parsed.y)}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="bg-white p-3 rounded shadow-sm h-[300px]">
              <h4 className="text-sm font-medium text-center mb-2">Peso Total</h4>
              <Bar
                data={datosGraficoPeso}
                options={{
                  ...opcionesGrafico,
                  maintainAspectRatio: true,
                  plugins: {
                    ...opcionesGrafico.plugins,
                    title: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.dataset.label}: ${formatearNumero(context.parsed.y)} kg`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-teal-50 p-2 rounded">
              <p className="font-semibold">Peso Total:</p>
              <p>{formatearNumero(totalPeso)} kg</p>
            </div>
            <div className="bg-indigo-50 p-2 rounded">
              <p className="font-semibold">Total Unidades:</p>
              <p>{datosEmbalaje.totalTotes + datosEmbalaje.totalPaletsCajas}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleEmbalaje;
