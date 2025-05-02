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
import { DatosCategorias } from "../types";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface DetalleCategoriaProps {
  datosCategorias: DatosCategorias;
}

const DetalleCategorias = ({ datosCategorias }: DetalleCategoriaProps) => {
  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Calcular total de palets por categoría
  const totalPalets =
    datosCategorias.granel +
    datosCategorias.bolsas6x5 +
    datosCategorias.bolsas13x2 +
    datosCategorias.bolsas14x2 +
    datosCategorias.bolsas10x1;

  // Calcular porcentajes
  const calcularPorcentaje = (valor: number) => {
    return ((valor / totalPalets) * 100).toFixed(1);
  };

  // Datos para el gráfico de barras de categorías
  const datosGraficoCategorias = {
    labels: ["Granel", "6 x 5Lb", "13 x 2Lb", "14 x 2Lb", "10 x 1Kg"],
    datasets: [
      {
        label: "Palets por Categoría",
        data: [
          datosCategorias.granel,
          datosCategorias.bolsas6x5,
          datosCategorias.bolsas13x2,
          datosCategorias.bolsas14x2,
          datosCategorias.bolsas10x1,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos estimados de peso por categoría (basados en los pesos por caja proporcionados)
  const pesoPorCategoria = {
    granel: datosCategorias.granel * 48 * 13.62, // 48 cajas por palet a 13.62 kg cada una
    bolsas6x5: datosCategorias.bolsas6x5 * 48 * 13.61, // 48 cajas por palet a 13.61 kg cada una
    bolsas13x2: datosCategorias.bolsas13x2 * 48 * 11.8, // 48 cajas por palet a 11.8 kg cada una
    bolsas14x2: datosCategorias.bolsas14x2 * 48 * 12.6, // 48 cajas por palet a 12.6 kg cada una
    bolsas10x1: datosCategorias.bolsas10x1 * 48 * 10, // 48 cajas por palet a 10 kg cada una
  };

  // Total de peso estimado
  const totalPesoEstimado =
    pesoPorCategoria.granel +
    pesoPorCategoria.bolsas6x5 +
    pesoPorCategoria.bolsas13x2 +
    pesoPorCategoria.bolsas14x2 +
    pesoPorCategoria.bolsas10x1;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Detalle por Categorías de Embalaje
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tabla de categorías */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Categoría
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Palets
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  % del Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-red-600">Granel</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    Cajas de frutillas sueltas
                  </div>
                  <div className="text-xs text-gray-500">13.62 kg/caja</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosCategorias.granel}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {calcularPorcentaje(datosCategorias.granel)}%
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">
                    6 x 5Lb
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    6 bolsas de 5 libras por caja
                  </div>
                  <div className="text-xs text-gray-500">13.61 kg/caja</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosCategorias.bolsas6x5}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {calcularPorcentaje(datosCategorias.bolsas6x5)}%
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-yellow-600">
                    13 x 2Lb
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    13 bolsas de 2 libras por caja
                  </div>
                  <div className="text-xs text-gray-500">11.8 kg/caja</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosCategorias.bolsas13x2}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {calcularPorcentaje(datosCategorias.bolsas13x2)}%
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-teal-600">
                    14 x 2Lb
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    14 bolsas de 2 libras por caja
                  </div>
                  <div className="text-xs text-gray-500">12.6 kg/caja</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosCategorias.bolsas14x2}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {calcularPorcentaje(datosCategorias.bolsas14x2)}%
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-purple-600">
                    10 x 1Kg
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    10 bolsas de 1 kilo por caja
                  </div>
                  <div className="text-xs text-gray-500">10 kg/caja</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosCategorias.bolsas10x1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {calcularPorcentaje(datosCategorias.bolsas10x1)}%
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  TOTAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium"></td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {totalPalets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Gráficos */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-center">
              Distribución por Categorías
            </h3>
            <div className="h-80">
              <Bar
                data={datosGraficoCategorias}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: "Palets por categoría de embalaje",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2 text-center">
              Resumen de Categorías
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-700">
                  Categoría Principal:
                </p>
                <p className="text-xl font-bold text-red-600">Granel</p>
                <p className="text-sm text-gray-500">
                  {calcularPorcentaje(datosCategorias.granel)}% del total
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-700">
                  Peso Estimado Total:
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {formatearNumero(totalPesoEstimado)} kg
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-700">
                  Total Cajas:
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {formatearNumero(totalPalets * 48)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-700">
                  Promedio Peso/Palet:
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {formatearNumero(totalPesoEstimado / totalPalets)} kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCategorias;
