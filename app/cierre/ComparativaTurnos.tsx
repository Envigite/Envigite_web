import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

interface ComparativaTurnosProps {
  visible: boolean;
}

const ComparativaTurnos = ({ visible }: ComparativaTurnosProps) => {
  const datosLavado = {
    fechaInicio: '18/03/2025',
    fechaFin: '27/03/2025',
    dia: 32930.91,
    noche: 19055.42
  };

  const datosEmbalaje = {
    fechaInicio: '18/03/2025',
    fechaFin: '02/04/2025',
    dia: 52616.05,
    noche: 32278.37
  };

  // Calcular porcentajes y diferencias
  const calcularEstadisticas = (datos: { dia: number; noche: number }) => {
    const total = datos.dia + datos.noche;
    const porcentajeDia = (datos.dia / total) * 100;
    const porcentajeNoche = (datos.noche / total) * 100;
    const diferencia = datos.dia - datos.noche;
    const diferenciaPorcentual = ((diferencia / datos.noche) * 100);

    return {
      porcentajeDia,
      porcentajeNoche,
      diferencia,
      diferenciaPorcentual
    };
  };

  const estadisticasLavado = calcularEstadisticas(datosLavado);
  const estadisticasEmbalaje = calcularEstadisticas(datosEmbalaje);

  // Datos para el gráfico
  const datosGrafico = {
    labels: ['Lavado', 'Embalaje'],
    datasets: [
      {
        label: 'Turno Día',
        data: [datosLavado.dia, datosEmbalaje.dia],
        backgroundColor: 'rgba(255, 206, 86, 0.6)', // Amarillo para el día
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Turno Noche',
        data: [datosLavado.noche, datosEmbalaje.noche],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Azul para la noche
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (!visible) return null;

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Comparativa de Turnos</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Lavado */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-2">Lavado ({datosLavado.fechaInicio} - {datosLavado.fechaFin})</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm font-medium">Turno Día</p>
              <p className="text-lg">{datosLavado.dia.toLocaleString('es-CL')} kg</p>
              <p className="text-sm text-gray-600">{estadisticasLavado.porcentajeDia.toFixed(1)}%</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm font-medium">Turno Noche</p>
              <p className="text-lg">{datosLavado.noche.toLocaleString('es-CL')} kg</p>
              <p className="text-sm text-gray-600">{estadisticasLavado.porcentajeNoche.toFixed(1)}%</p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white rounded border border-gray-200">
            <p className="text-sm">
              <span className="font-medium">Diferencia:</span> {estadisticasLavado.diferencia.toLocaleString('es-CL')} kg
              <br />
              <span className="text-gray-600">
                El turno día procesó un {estadisticasLavado.diferenciaPorcentual.toFixed(1)}% más que el turno noche
              </span>
            </p>
          </div>
        </div>

        {/* Embalaje */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-2">Embalaje ({datosEmbalaje.fechaInicio} - {datosEmbalaje.fechaFin})</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm font-medium">Turno Día</p>
              <p className="text-lg">{datosEmbalaje.dia.toLocaleString('es-CL')} kg</p>
              <p className="text-sm text-gray-600">{estadisticasEmbalaje.porcentajeDia.toFixed(1)}%</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm font-medium">Turno Noche</p>
              <p className="text-lg">{datosEmbalaje.noche.toLocaleString('es-CL')} kg</p>
              <p className="text-sm text-gray-600">{estadisticasEmbalaje.porcentajeNoche.toFixed(1)}%</p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white rounded border border-gray-200">
            <p className="text-sm">
              <span className="font-medium">Diferencia:</span> {estadisticasEmbalaje.diferencia.toLocaleString('es-CL')} kg
              <br />
              <span className="text-gray-600">
                El turno día procesó un {estadisticasEmbalaje.diferenciaPorcentual.toFixed(1)}% más que el turno noche
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="h-64">
        <Bar
          data={datosGrafico}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Kilos'
                }
              }
            },
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: 'Comparativa de Producción por Turno'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ComparativaTurnos; 