"use client";

import React, { useState, useRef } from 'react';
import { Calendar, ChevronDown, ChevronUp, CheckCircle, Circle, AlertCircle } from 'lucide-react';

// Definición de tipos para los datos del proyecto
interface Activity {
  id: number;
  name: string;
  status: 'completed' | 'in-progress' | 'delayed' | 'pending';
  responsible: string;
  startDate: string;
  endDate: string;
}

interface Phase {
  id: number;
  name: string;
  progress: number;
  startDate: string;
  endDate: string;
  activities: Activity[];
}

interface ProjectData {
  title: string;
  deadline: string;
  phases: Phase[];
  notes: string[];
}

// Datos del proyecto
const projectData: ProjectData = {
  title: "Cronograma de Cierre de Temporada 2024-2025",
  deadline: "5 de Mayo 2025",
  phases: [
    {
      id: 1,
      name: "Recopilación de datos",
      progress: 0,
      startDate: "24-Abr",
      endDate: "26-Abr",
      activities: [
        { id: 1.1, name: "Recopilación de datos de Recepción", status: "pending", responsible: "", startDate: "24-Abr", endDate: "26-Abr" },
        { id: 1.2, name: "Recopilación de datos y cuadratura de despezonado", status: "pending", responsible: "", startDate: "24-Abr", endDate: "26-Abr" },
        { id: 1.3, name: "Recopilación de datos y cuadratura de IQF", status: "pending", responsible: "", startDate: "24-Abr", endDate: "26-Abr" },
        { id: 1.4, name: "Recopilación de datos y cuadratura de embalaje", status: "pending", responsible: "", startDate: "24-Abr", endDate: "26-Abr" },
        { id: 1.5, name: "Recopilación de datos de Inventario cámara IQF", status: "pending", responsible: "", startDate: "24-Abr", endDate: "26-Abr" },
        { id: 1.6, name: "Recopilación de datos de Exportación", status: "pending", responsible: "", startDate: "24-Abr", endDate: "26-Abr" }
      ]
    },
    {
      id: 2,
      name: "Análisis de datos",
      progress: 0,
      startDate: "27-Abr",
      endDate: "29-Abr",
      activities: [
        { id: 2.1, name: "Cálculo de peso total de Recepción, Despezonado, IQF y Embalaje", status: "pending", responsible: "", startDate: "27-Abr", endDate: "28-Abr" },
        { id: 2.2, name: "Cálculo de Mermas", status: "pending", responsible: "", startDate: "27-Abr", endDate: "28-Abr" },
        { id: 2.3, name: "Análisis de datos cámara IQF", status: "pending", responsible: "", startDate: "27-Abr", endDate: "28-Abr" },
        { id: 2.4, name: "Segregación de datos y cálculo en porcentajes", status: "pending", responsible: "", startDate: "28-Abr", endDate: "29-Abr" }
      ]
    },
    {
      id: 3,
      name: "Identificación de desviaciones",
      progress: 0,
      startDate: "29-Abr",
      endDate: "30-Abr",
      activities: [
        { id: 3.1, name: "Análisis de desviaciones en procesos", status: "pending", responsible: "", startDate: "29-Abr", endDate: "30-Abr" },
        { id: 3.2, name: "Documentación de causas de desviaciones", status: "pending", responsible: "", startDate: "29-Abr", endDate: "30-Abr" }
      ]
    },
    {
      id: 4,
      name: "Diseño de acciones correctivas",
      progress: 0,
      startDate: "30-Abr",
      endDate: "02-May",
      activities: [
        { id: 4.1, name: "Formulación de acciones correctivas para cada desviación", status: "pending", responsible: "", startDate: "30-Abr", endDate: "01-May" },
        { id: 4.2, name: "Validación de viabilidad de acciones correctivas", status: "pending", responsible: "", startDate: "01-May", endDate: "02-May" }
      ]
    },
    {
      id: 5,
      name: "Elaboración del informe final",
      progress: 0,
      startDate: "02-May",
      endDate: "05-May",
      activities: [
        { id: 5.1, name: "Integración de todos los componentes del informe", status: "pending", responsible: "", startDate: "02-May", endDate: "03-May" },
        { id: 5.2, name: "Revisión y ajustes del informe", status: "pending", responsible: "", startDate: "03-May", endDate: "04-May" },
        { id: 5.3, name: "Entrega del informe final", status: "pending", responsible: "", startDate: "05-May", endDate: "05-May" }
      ]
    }
  ],
  notes: [
    "Dado que esta fue la primera temporada de operación, el proceso atravesó múltiples ajustes y adaptaciones. Por esta razón, algunos valores registrados en las etapas iniciales podrían no coincidir plenamente o carecer de respaldo detallado.",
    "Quien realiza este informe no estuvo presente desde el inicio, por lo que ciertos detalles podrían no estar disponibles. Agradecemos su comprensión."
  ]
};

const CronogramaVisual: React.FC = () => {
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({});
  const [expandedActivities, setExpandedActivities] = useState<Record<string, boolean>>({});

  // Función para calcular automáticamente el progreso de cada fase basado en el tiempo
  const calculatePhaseProgress = (phase: Phase): number => {
    const phaseStartDays = calculateDaysFromStart(phase.startDate);
    const phaseEndDays = calculateDaysFromStart(phase.endDate);
    const phaseTotalDays = phaseEndDays - phaseStartDays + 1;
    const today = new Date();
    
    // Formatear la fecha actual para comparar
    const formattedToday = `${today.getDate()}-${today.getMonth() === 3 ? 'Abr' : 'May'}`;
    const currentDaysFromStart = calculateDaysFromStart(formattedToday);
    
    // Cálculo del progreso por tiempo
    if (currentDaysFromStart < phaseStartDays) {
      // La fase aún no ha comenzado
      return 0;
    } else if (currentDaysFromStart > phaseEndDays) {
      // La fase ya ha terminado
      return 100;
    } else {
      // Si estamos en el día de inicio de la fase (daysElapsed = 0), mostrar 20% de avance
      if (currentDaysFromStart === phaseStartDays) {
        return 20;
      }
      
      // La fase está en progreso
      const daysElapsed = currentDaysFromStart - phaseStartDays;
      const phaseProgress = Math.floor((daysElapsed / (phaseTotalDays - 1 || 1)) * 100);
      return Math.min(phaseProgress, 100); // Aseguramos que no supere el 100%
    }
  };

  const togglePhase = (phaseId: number): void => {
    setExpandedPhases({
      ...expandedPhases,
      [phaseId]: !expandedPhases[phaseId]
    });
  };

  const toggleActivity = (activityId: string): void => {
    setExpandedActivities({
      ...expandedActivities,
      [activityId]: !expandedActivities[activityId]
    });
  };

  const getStatusColor = (status: Activity['status']): string => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      case 'pending': default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: Activity['status']): React.ReactElement => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} className="text-green-500" />;
      case 'in-progress': return <Circle size={14} className="text-blue-500" />;
      case 'delayed': return <AlertCircle size={14} className="text-red-500" />;
      case 'pending': default: return <Circle size={14} className="text-gray-400" />;
    }
  };

  const calculateDaysFromStart = (dateStr: string): number => {
    const startDate = new Date('2025-04-24'); // Cambiado a 24-Abr
    const [day, month] = dateStr.split('-');
    const targetDate = new Date(`2025-${month === 'Abr' ? '04' : '05'}-${day.padStart(2, '0')}`);
    const diffTime = targetDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calcular la duración total en días
  const totalDays = calculateDaysFromStart('05-May') + 1;

  // Fecha actual para mostrar la línea de tiempo - para visualizar el avance, forzamos al 25 de abril
  // Esto es necesario porque la fecha del servidor podría no coincidir exactamente con la fecha local
  const today = new Date('2025-04-25');
  const formattedToday = `${today.getDate()}-${today.getMonth() === 3 ? 'Abr' : 'May'}`;
  const daysFromStart = calculateDaysFromStart(formattedToday);
  
  // Calcular el porcentaje de avance general basado en el tiempo transcurrido
  const calculateOverallProgress = (): number => {
    // Si la fecha actual es anterior a la fecha de inicio, el progreso es 0%
    if (daysFromStart < 0) return 0;
    
    // Si la fecha actual es posterior a la fecha de finalización, el progreso es 100%
    if (daysFromStart >= totalDays - 1) return 100;
    
    // Para el primer día (cuando daysFromStart = 0), asignamos 5% para mostrar que ha iniciado
    if (daysFromStart === 0) return 5;
    
    // En cualquier otro caso, el progreso es proporcional al tiempo transcurrido
    return Math.floor((daysFromStart / (totalDays - 1)) * 100);
  };
  
  const overallProgress = calculateOverallProgress();

  // Generar fechas para la línea de tiempo
  const timelineDates: string[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date('2025-04-24'); // Cambiado a 24-Abr
    date.setDate(date.getDate() + i);
    const day = date.getDate();
    const month = date.getMonth() === 3 ? 'Abr' : 'May';
    timelineDates.push(`${day}-${month}`);
  }
  
  // Actualizar manualmente el estado de las primeras actividades para reflejar el avance actual
  const updateActivityStatuses = () => {
    const updatedPhases = [...projectData.phases];
    
    // Actualizamos las actividades de la primera fase como "in-progress"
    if (updatedPhases[0] && updatedPhases[0].activities) {
      updatedPhases[0].activities = updatedPhases[0].activities.map(activity => ({
        ...activity,
        status: 'in-progress'
      }));
    }
    
    return updatedPhases;
  };
  
  // Aplicamos las actualizaciones de estado
  const updatedPhases = updateActivityStatuses();
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="mx-auto max-w-6xl w-full bg-white rounded-xl shadow-2xl p-3 sm:p-6 border border-gray-200">
        <div className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-3 sm:p-4 rounded-lg">
          <h1 className="text-lg sm:text-2xl font-bold text-center">{projectData.title}</h1>
          <div className="flex items-center justify-center mt-2">
            <Calendar size={18} className="text-yellow-300 mr-2" />
            <span className="font-medium text-sm sm:text-base">Fecha límite: {projectData.deadline}</span>
          </div>
        </div>

        {/* Progreso general */}
        <div className="mb-4 sm:mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <h2 className="text-sm sm:text-lg font-semibold mb-2 text-gray-800 text-center">Progreso General</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 sm:h-5 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">{overallProgress}%</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Fecha: {formattedToday}</span>
          </div>
        </div>

        {/* Timeline visual */}
        <div className="mb-4 sm:mb-6 overflow-x-auto bg-gray-50 p-3 rounded-lg border border-gray-200"
             style={{ scrollbarWidth: 'thin' }}>
          <h2 className="text-sm sm:text-lg font-semibold mb-2 text-gray-800 text-center">Línea de Tiempo</h2>
          
          {/* Información de días restantes (solo visible en móvil) */}
          <div className="sm:hidden mb-3 bg-blue-50 p-2 rounded border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-blue-800">Inicio: 24-Abr</span>
              <span className="text-xs font-medium text-blue-800">
                Días restantes: {totalDays - daysFromStart - 1}
              </span>
              <span className="text-xs font-medium text-blue-800">Fin: 5-May</span>
            </div>
          </div>
          
          <div className="relative">
            {/* Fechas de la línea de tiempo (ocultas en móvil) */}
            <div className="flex border-b border-gray-300 pb-2 hidden sm:flex">
              <div className="w-48 sm:w-64 flex-shrink-0"></div>
              {timelineDates.map((date, index) => (
                <div key={index} className="flex-1 text-center text-xs font-medium text-gray-700">{date}</div>
              ))}
            </div>

            {/* Fases del proyecto */}
            {updatedPhases.map((phase) => (
              <div key={phase.id} className="mt-2">
                <div 
                  className="flex items-center cursor-pointer py-2 hover:bg-blue-50 rounded-md px-2 transition-colors duration-150 ease-in-out border-l-4 border-blue-500"
                  onClick={() => togglePhase(phase.id)}
                >
                  <div className="w-40 sm:w-64 flex-shrink-0 flex items-center">
                    {expandedPhases[phase.id] ? 
                      <ChevronUp size={16} className="mr-1 sm:mr-2 text-blue-600" /> : 
                      <ChevronDown size={16} className="mr-1 sm:mr-2 text-blue-600" />
                    }
                    <span className="font-medium text-gray-800 text-xs sm:text-base">{phase.name}</span>
                  </div>
                  <div className="flex-grow flex items-center relative h-5">
                    {/* Barra de la fase */}
                    <div 
                      className="absolute h-4 bg-blue-200 rounded-full"
                      style={{ 
                        left: `${(calculateDaysFromStart(phase.startDate) / totalDays) * 100}%`,
                        width: `${((calculateDaysFromStart(phase.endDate) - calculateDaysFromStart(phase.startDate) + 1) / totalDays) * 100}%`
                      }}
                    >
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                           style={{ width: `${calculatePhaseProgress(phase)}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Actividades de la fase */}
                {expandedPhases[phase.id] && (
                  <div className="bg-gray-100 rounded-md mb-2 overflow-hidden">
                    {phase.activities.map((activity) => {
                      const activityId = `${phase.id}-${activity.id}`;
                      return (
                        <div key={activityId} className="border-b border-gray-200 last:border-b-0">
                          <div 
                            className="flex py-1.5 pl-6 sm:pl-10 hover:bg-blue-50 cursor-pointer"
                            onClick={() => toggleActivity(activityId)}
                          >
                            <div className="w-40 sm:w-64 flex-shrink-0 flex items-center">
                              <div className="flex-shrink-0 mt-0.5">
                                {getStatusIcon(activity.status)}
                              </div>
                              <div className="ml-1 sm:ml-2 flex items-center">
                                {/* Nombre de actividad truncado con indicador de expansión */}
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-700 truncate max-w-32 sm:max-w-56">
                                    {activity.name}
                                  </span>
                                  {expandedActivities[activityId] ? 
                                    <ChevronUp size={12} className="ml-1 text-blue-600" /> : 
                                    <ChevronDown size={12} className="ml-1 text-blue-600" />
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow flex items-center relative h-4">
                              <div 
                                className={`absolute h-2.5 ${getStatusColor(activity.status)} rounded-full shadow-sm`}
                                style={{ 
                                  left: `${(calculateDaysFromStart(activity.startDate) / totalDays) * 100}%`,
                                  width: `${((calculateDaysFromStart(activity.endDate) - calculateDaysFromStart(activity.startDate) + 1) / totalDays) * 100}%`
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Contenido expandible para mostrar el nombre completo */}
                          {expandedActivities[activityId] && (
                            <div className="py-1 pl-10 sm:pl-16 pr-4 bg-blue-50 text-xs text-gray-800">
                              <p><strong>Actividad:</strong> {activity.name}</p>
                              <div className="flex mt-1 justify-between">
                                <p><strong>Inicio:</strong> {activity.startDate}</p>
                                <p><strong>Fin:</strong> {activity.endDate}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sección inferior */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          {/* Información adicional */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h2 className="text-sm sm:text-lg font-semibold mb-2 text-gray-800 text-center">Notas y Consideraciones</h2>
            <ul className="list-disc pl-4 space-y-1">
              {projectData.notes.map((note, index) => (
                <li key={index} className="text-xs text-gray-700">{note}</li>
              ))}
            </ul>
          </div>

          {/* Próximas etapas */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h2 className="text-sm sm:text-lg font-semibold mb-2 text-gray-800 text-center">Próximas Etapas</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200">
              <h3 className="text-xs sm:text-base font-medium text-blue-800 mb-1 text-center">Informe de Mejoras Sistémicas (16 de Junio)</h3>
              <p className="text-xs text-gray-700">
                Se elaborará un informe enfocado en propuestas de mejoras sistémicas para las distintas áreas del proceso, 
                con el objetivo de optimizar la operación de cara a la temporada 2025-2026. 
                El cronograma detallado para su desarrollo se definirá una vez finalizado el informe de cierre de temporada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CronogramaVisual;