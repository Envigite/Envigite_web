import { useState } from 'react';
import { motion } from 'framer-motion';

interface DesviacionesAccionesProps {
  visible: boolean;
}

const DesviacionesAcciones = ({ visible }: DesviacionesAccionesProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<'desviaciones' | 'acciones'>('desviaciones');

  const desviaciones = [
    {
      id: 1,
      titulo: "Proceso 100% Manual",
      descripcion: "Ralentiza el proceso y lo deja expuesto a errores humanos"
    },
    {
      id: 2,
      titulo: "Falta de Planificación y Programación",
      descripcion: "Dificulta la comunicación entre áreas del proceso"
    },
    {
      id: 3,
      titulo: "Personal no Capacitado",
      descripcion: "Pone en riesgo el proceso, el producto o la seguridad de las personas"
    },
    {
      id: 4,
      titulo: "Definición de Estándar Corporativo",
      descripcion: "Necesitamos hablar todos el mismo lenguaje"
    },
    {
      id: 5,
      titulo: "Definición de Norma de Calidad",
      descripcion: "Asegurar la consistencia y adecuación a un estándar determinado"
    },
    {
      id: 6,
      titulo: "Información en Tiempo Real",
      descripcion: "Facilita la planeación"
    },
    {
      id: 7,
      titulo: "Materiales / Insumos",
      descripcion: "Genera pausas laborales y pérdida de tiempo y dinero"
    },
    {
      id: 8,
      titulo: "Cuadraturas de Proceso",
      descripcion: "Verifica la consistencia y precisión de los datos"
    },
    {
      id: 9,
      titulo: "Adquisición de Equipos y Materiales",
      descripcion: "Necesidad de actualización tecnológica"
    }
  ];

  const acciones = [
    {
      id: 1,
      titulo: "Costo por Caja",
      descripcion: "Análisis y optimización del costo por unidad de producto"
    },
    {
      id: 2,
      titulo: "Estructura por Áreas",
      descripcion: "Definir y establecer estructura organizacional clara"
    },
    {
      id: 3,
      titulo: "Recopilación y Análisis de Datos",
      descripcion: "Recopilar información de cada área de proceso"
    },
    {
      id: 4,
      titulo: "Creación de Norma de Calidad",
      descripcion: "Establecer estándares y procedimientos"
    },
    {
      id: 5,
      titulo: "Canal de Comunicación y Sistemas",
      descripcion: "Implementar sistemas de información efectivos"
    },
    {
      id: 6,
      titulo: "Compra de Materiales Programada",
      descripcion: "Gestión de inventario según programación"
    },
    {
      id: 7,
      titulo: "Control de Cuadratura de Proceso",
      descripcion: "Implementar controles específicos"
    },
    {
      id: 8,
      titulo: "Información en Tiempo Real",
      descripcion: "Implementar sistemas de monitoreo"
    },
    {
      id: 9,
      titulo: "Compra de Equipos",
      descripcion: "Adquisición de equipos para nuevo sistema"
    }
  ];

  if (!visible) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Análisis de Proceso y Mejora</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCategoriaActiva('desviaciones')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              categoriaActiva === 'desviaciones'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Desviaciones
          </button>
          <button
            onClick={() => setCategoriaActiva('acciones')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              categoriaActiva === 'acciones'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Acciones Correctivas
          </button>
        </div>
      </div>

      {categoriaActiva === 'desviaciones' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-8 text-center">Desviaciones Detectadas en el Proceso</h3>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {desviaciones.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center transition-transform duration-300 hover:scale-105 transform-gpu cursor-pointer"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {item.id}
                </div>
                <div className="ml-6 flex-grow">
                  <div className="p-4 bg-white border-l-4 border-blue-500 shadow-sm rounded-r-lg hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-lg font-semibold text-gray-800">{item.titulo}</h4>
                    <p className="text-gray-600 mt-1">{item.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-8 text-center">Plan de Acciones Correctivas</h3>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 text-center border-b-2 border-blue-500 pb-2">Análisis y Planificación</h4>
              <div className="space-y-4">
                {[1, 2, 3].map(id => {
                  const accion = acciones.find(a => a.id === id);
                  if (!accion) return null;
                  return (
                    <div 
                      key={accion.id} 
                      className="flex items-center justify-center transition-transform duration-300 hover:scale-105 transform-gpu cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-sm mr-4">
                        {accion.id}
                      </div>
                      <div className="p-3 bg-white border-l-4 border-blue-100 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex-grow max-w-2xl">
                        <h5 className="font-medium text-gray-800">{accion.titulo}</h5>
                        <p className="text-sm text-gray-600">{accion.descripcion}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 text-center border-b-2 border-green-500 pb-2">Implementación de Sistemas</h4>
              <div className="space-y-4">
                {[4, 5, 8].map(id => {
                  const accion = acciones.find(a => a.id === id);
                  if (!accion) return null;
                  return (
                    <div 
                      key={accion.id} 
                      className="flex items-center justify-center transition-transform duration-300 hover:scale-105 transform-gpu cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-sm mr-4">
                        {accion.id}
                      </div>
                      <div className="p-3 bg-white border-l-4 border-green-100 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex-grow max-w-2xl">
                        <h5 className="font-medium text-gray-800">{accion.titulo}</h5>
                        <p className="text-sm text-gray-600">{accion.descripcion}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 text-center border-b-2 border-purple-500 pb-2">Recursos y Operaciones</h4>
              <div className="space-y-4">
                {[6, 7, 9].map(id => {
                  const accion = acciones.find(a => a.id === id);
                  if (!accion) return null;
                  return (
                    <div 
                      key={accion.id} 
                      className="flex items-center justify-center transition-transform duration-300 hover:scale-105 transform-gpu cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold text-sm mr-4">
                        {accion.id}
                      </div>
                      <div className="p-3 bg-white border-l-4 border-purple-100 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex-grow max-w-2xl">
                        <h5 className="font-medium text-gray-800">{accion.titulo}</h5>
                        <p className="text-sm text-gray-600">{accion.descripcion}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DesviacionesAcciones; 