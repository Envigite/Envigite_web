import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

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
          "rgba(238, 70, 70, 0.98)",  // Indigo para Frutilla
          "rgba(209, 59, 246, 0.7)",  // Azul para Mix Berries
          "rgba(14, 165, 233, 0.7)",  // Celeste para Pulpa Frutilla
        ],
        borderColor: [
          "rgba(238, 70, 70, 0.98)",  // Indigo para Frutilla
          "rgba(209, 59, 246, 0.7)",  // Azul para Mix Berries
          "rgba(14, 165, 233, 1)",  // Celeste para Pulpa Frutilla
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
        Resumen General de la Temporada
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tarjetas de resumen */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-5 rounded-lg shadow-md border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Kilos Producto Final
            </h3>
            <p className="text-3xl font-bold text-blue-700">
              {formatearNumero(totales.totalKilosProductoFinal)} kg
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Rendimiento: {formatearNumero(porcentajes.porcentajeRendimiento)}%
            </p>
          </div>

          <div className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100">
            <h3 className="text-lg font-medium text-indigo-800 mb-2">
              Total Palets Producidos
            </h3>
            <p className="text-3xl font-bold text-indigo-700">{totales.totalPalets} palets</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sky-50 p-4 rounded-lg shadow-md border border-sky-100">
              <h3 className="text-md font-medium text-sky-800 mb-2">
                Total Totes
              </h3>
              <p className="text-2xl font-bold text-sky-700">712</p>
              <p className="text-sm text-gray-600 mt-1">146,611.40 kg</p>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg shadow-md border border-cyan-100">
              <h3 className="text-md font-medium text-cyan-800 mb-2">
                Total Cajas
              </h3>
              <p className="text-2xl font-bold text-cyan-700">1,074 palets</p>
              <p className="text-sm text-gray-600 mt-1">225,936.71 kg</p>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-lg font-medium mb-4 text-center text-blue-800">
            Distribución de Productos
          </h3>
          <div className="h-64">
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
                      padding: 15
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 text-center text-sm">
            <div>
              <p className="font-semibold text-indigo-700">Frutilla</p>
              <p>{formatearNumero(porcentajes.porcentajeFrutilla)}%</p>
            </div>
            <div>
              <p className="font-semibold text-blue-700">Mix Berries</p>
              <p>{formatearNumero(porcentajes.porcentajeMixBerries)}%</p>
            </div>
            <div>
              <p className="font-semibold text-sky-700">Pulpa Frutilla</p>
              <p>{formatearNumero(porcentajes.porcentajePulpaFrutilla)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenGeneral;
