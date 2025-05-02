import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import { DatosProductos } from "../types";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface DetalleProductosProps {
  datosProductos: DatosProductos;
  porcentajes: {
    porcentajeMixBerries: number;
    porcentajeFrutilla: number;
    porcentajePulpaFrutilla: number;
  };
}

const DetalleProductos = ({
  datosProductos,
  porcentajes,
}: DetalleProductosProps) => {
  // Formateador para números
  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL").format(
      Math.round(numero * 100) / 100
    );
  };

  // Datos para el gráfico de pastel de peso por producto
  const datosGraficoProductosPeso = {
    labels: ["Frutilla", "Mix Berries", "Pulpa Frutilla"],
    datasets: [
      {
        label: "Peso (kg)",
        data: [
          datosProductos.frutilla.peso,
          datosProductos.mixBerries.peso,
          datosProductos.pulpaFrutilla.peso,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de dona de palets por producto
  const datosGraficoProductosPalets = {
    labels: ["Frutilla", "Mix Berries", "Pulpa Frutilla"],
    datasets: [
      {
        label: "Palets",
        data: [
          datosProductos.frutilla.palets,
          datosProductos.mixBerries.palets,
          datosProductos.pulpaFrutilla.palets,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Calculamos totales
  const totalPalets =
    datosProductos.frutilla.palets +
    datosProductos.mixBerries.palets +
    datosProductos.pulpaFrutilla.palets;

  const totalPeso =
    datosProductos.frutilla.peso +
    datosProductos.mixBerries.peso +
    datosProductos.pulpaFrutilla.peso;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Detalle de Productos
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tabla de productos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Producto
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
                  Peso (kg)
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
                  <div className="text-sm font-medium text-pink-600">
                    Frutilla
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosProductos.frutilla.palets}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(
                      (datosProductos.frutilla.palets / totalPalets) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearNumero(datosProductos.frutilla.peso)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearNumero(porcentajes.porcentajeFrutilla)}%
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">
                    Mix Berries
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosProductos.mixBerries.palets}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(
                      (datosProductos.mixBerries.palets / totalPalets) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearNumero(datosProductos.mixBerries.peso)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearNumero(porcentajes.porcentajeMixBerries)}%
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-yellow-600">
                    Pulpa Frutilla
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {datosProductos.pulpaFrutilla.palets}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(
                      (datosProductos.pulpaFrutilla.palets / totalPalets) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearNumero(datosProductos.pulpaFrutilla.peso)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearNumero(porcentajes.porcentajePulpaFrutilla)}%
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  TOTAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {totalPalets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {formatearNumero(totalPeso)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  100%
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-4 bg-gray-50">
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Información Adicional
            </h3>
            <p className="text-sm text-gray-600">
              El promedio de peso por palet es de{" "}
              {formatearNumero(totalPeso / totalPalets)} kg.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              El producto predominante es la Frutilla con un{" "}
              {formatearNumero(porcentajes.porcentajeFrutilla)}% del total.
            </p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-center">
              Distribución por Peso
            </h3>
            <div className="h-64">
              <Pie
                data={datosGraficoProductosPeso}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-center">
              Distribución por Palets
            </h3>
            <div className="h-64">
              <Doughnut
                data={datosGraficoProductosPalets}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProductos;
