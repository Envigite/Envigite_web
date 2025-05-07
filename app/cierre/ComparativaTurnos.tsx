import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className="text-xl font-medium mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Comparativa de Turnos
      </motion.h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Lavado */}
        <motion.div 
          className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg shadow-sm border border-gray-200"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <h4 className="text-md font-medium mb-3 pb-2 border-b border-gray-200">
            Lavado ({datosLavado.fechaInicio} - {datosLavado.fechaFin})
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="text-sm font-medium text-yellow-800">Turno Día</p>
              <p className="text-xl font-bold text-yellow-700">{datosLavado.dia.toLocaleString('es-CL')} kg</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-yellow-700 mb-1">
                  <span>Porcentaje del total</span>
                  <span>{estadisticasLavado.porcentajeDia.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${estadisticasLavado.porcentajeDia}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="text-sm font-medium text-blue-800">Turno Noche</p>
              <p className="text-xl font-bold text-blue-700">{datosLavado.noche.toLocaleString('es-CL')} kg</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Porcentaje del total</span>
                  <span>{estadisticasLavado.porcentajeNoche.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-300 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${estadisticasLavado.porcentajeNoche}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="mt-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <p className="text-sm">
              <span className="font-medium">Diferencia:</span> {estadisticasLavado.diferencia.toLocaleString('es-CL')} kg
              <br />
              <span className="text-gray-600">
                El turno día procesó un <span className="font-semibold text-yellow-600">{estadisticasLavado.diferenciaPorcentual.toFixed(1)}%</span> más que el turno noche
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Embalaje */}
        <motion.div 
          className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg shadow-sm border border-gray-200"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <h4 className="text-md font-medium mb-3 pb-2 border-b border-gray-200">
            Embalaje ({datosEmbalaje.fechaInicio} - {datosEmbalaje.fechaFin})
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="text-sm font-medium text-yellow-800">Turno Día</p>
              <p className="text-xl font-bold text-yellow-700">{datosEmbalaje.dia.toLocaleString('es-CL')} kg</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-yellow-700 mb-1">
                  <span>Porcentaje del total</span>
                  <span>{estadisticasEmbalaje.porcentajeDia.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${estadisticasEmbalaje.porcentajeDia}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="text-sm font-medium text-blue-800">Turno Noche</p>
              <p className="text-xl font-bold text-blue-700">{datosEmbalaje.noche.toLocaleString('es-CL')} kg</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Porcentaje del total</span>
                  <span>{estadisticasEmbalaje.porcentajeNoche.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-300 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${estadisticasEmbalaje.porcentajeNoche}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="mt-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <p className="text-sm">
              <span className="font-medium">Diferencia:</span> {estadisticasEmbalaje.diferencia.toLocaleString('es-CL')} kg
              <br />
              <span className="text-gray-600">
                El turno día procesó un <span className="font-semibold text-yellow-600">{estadisticasEmbalaje.diferenciaPorcentual.toFixed(1)}%</span> más que el turno noche
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="h-64 bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg shadow-inner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
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
            },
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart'
            }
          }}
        />
      </motion.div>

      <motion.div 
        className="mt-4 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <div className="flex space-x-6 items-center text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
            <span>Turno Día: {(datosLavado.dia + datosEmbalaje.dia).toLocaleString('es-CL')} kg</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-400 mr-2"></div>
            <span>Turno Noche: {(datosLavado.noche + datosEmbalaje.noche).toLocaleString('es-CL')} kg</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComparativaTurnos; 