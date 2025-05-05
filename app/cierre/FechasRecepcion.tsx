import { useState } from "react";

interface FechaRecepcion {
  fecha: string;
  recepcion: string;
  productor: string;
}

interface FechasRecepcionProps {
  onClose?: () => void;
}

const FechasRecepcion = ({ onClose }: FechasRecepcionProps) => {
  const [filtroProductor, setFiltroProductor] = useState<string>("todos");
  
  // Datos de fechas de recepción basados en la imagen proporcionada
  const fechasRecepciones: FechaRecepcion[] = [
    { fecha: "10-12-2024", recepcion: "R-1", productor: "L. Carrasco" },
    { fecha: "27-12-2024", recepcion: "R-5", productor: "L. Carrasco" },
    { fecha: "17-01-2025", recepcion: "R-6", productor: "L. Carrasco" },
    { fecha: "20-01-2025", recepcion: "R-7", productor: "P. Farías" },
    { fecha: "21-01-2025", recepcion: "R-8", productor: "P. Farías" },
    { fecha: "22-01-2025", recepcion: "R-9", productor: "P. Farías" },
    { fecha: "23-01-2025", recepcion: "R-10", productor: "P. Farías" },
    { fecha: "24-01-2025", recepcion: "R-11", productor: "P. Farías" },
    { fecha: "27-01-2025", recepcion: "R-12", productor: "P. Farías" },
    { fecha: "28-01-2025", recepcion: "R-13", productor: "P. Farías" },
    { fecha: "29-01-2025", recepcion: "R-14", productor: "F. Carrasco" },
    { fecha: "02-03-2025", recepcion: "R-15", productor: "J. Carrasco" },
    { fecha: "02-04-2025", recepcion: "R-16", productor: "C. Giofer Spa" },
    { fecha: "02-07-2025", recepcion: "R-17", productor: "C. Giofer Spa" },
    { fecha: "02-09-2025", recepcion: "R-18", productor: "C. Giofer Spa" },
    { fecha: "02-11-2025", recepcion: "R-19", productor: "P. Farías" },
    { fecha: "02-12-2025", recepcion: "R-20", productor: "C. Giofer Spa" },
    { fecha: "18-02-2025", recepcion: "R-21", productor: "C. Giofer Spa" },
    { fecha: "18-02-2025", recepcion: "R-22", productor: "Agricola Frut JH SPA" },
    { fecha: "19-02-2025", recepcion: "R-23", productor: "C. Giofer Spa" },
    { fecha: "19-02-2025", recepcion: "R-24", productor: "Agricola Frut JH SPA" },
    { fecha: "20-02-2025", recepcion: "R-25", productor: "Agricola Frut JH SPA" },
    { fecha: "21-02-2025", recepcion: "R-26", productor: "Agricola Frut JH SPA" },
    { fecha: "22-02-2025", recepcion: "R-27", productor: "Agricola Frut JH SPA" },
    { fecha: "25-02-2025", recepcion: "R-28", productor: "Agricola Frut JH SPA" },
    { fecha: "26-02-2025", recepcion: "R-29", productor: "Agricola Frut JH SPA" },
    { fecha: "27-02-2025", recepcion: "R-30", productor: "Agricola Frut JH SPA" },
    { fecha: "28-02-2025", recepcion: "R-31", productor: "Agricola Frut JH SPA" },
    { fecha: "03-01-2025", recepcion: "R-32", productor: "Agricola Frut JH SPA" },
    { fecha: "03-04-2025", recepcion: "R-33", productor: "Agricola Frut JH SPA" },
    { fecha: "03-05-2025", recepcion: "R-34", productor: "Agricola Frut JH SPA" },
    { fecha: "03-06-2025", recepcion: "R-35", productor: "Agricola Frut JH SPA" },
    { fecha: "03-07-2025", recepcion: "R-36", productor: "Agricola Frut JH SPA" },
    { fecha: "03-08-2025", recepcion: "R-37", productor: "Agricola Frut JH SPA" },
    { fecha: "03-11-2025", recepcion: "R-38", productor: "Agricola Frut JH SPA" },
    { fecha: "03-12-2025", recepcion: "R-39", productor: "Agricola Frut JH SPA" },
    { fecha: "13-03-2025", recepcion: "R-40", productor: "Agricola Frut JH SPA" },
    { fecha: "14-03-2025", recepcion: "R-41", productor: "Agricola Frut JH SPA" },
    { fecha: "15-03-2025", recepcion: "R-42", productor: "Agricola Frut JH SPA" },
    { fecha: "18-03-2025", recepcion: "R-43", productor: "Agricola Frut JH SPA" },
    { fecha: "18-03-2025", recepcion: "R-44", productor: "Agricola Frut JH SPA" },
    { fecha: "19-03-2025", recepcion: "R-45", productor: "Agricola Frut JH SPA" },
    { fecha: "19-03-2025", recepcion: "R-46", productor: "Agricola Frut JH SPA" },
    { fecha: "20-03-2025", recepcion: "R-47", productor: "Agricola Frut JH SPA" },
    { fecha: "20-03-2025", recepcion: "R-48", productor: "Agricola Frut JH SPA" },
    { fecha: "21-03-2025", recepcion: "R-49", productor: "Agricola Frut JH SPA" },
    { fecha: "25-03-2025", recepcion: "R-50", productor: "Agricola Frut JH SPA" },
    { fecha: "26-03-2025", recepcion: "R-51", productor: "Agricola Frut JH SPA" },
    { fecha: "27-03-2025", recepcion: "R-52", productor: "Agricola Frut JH SPA" },
    { fecha: "27-03-2025", recepcion: "R-53", productor: "Agricola Frut JH SPA" },
    { fecha: "28-03-2025", recepcion: "R-54", productor: "Agricola Frut JH SPA" },
    { fecha: "29-03-2025", recepcion: "R-55", productor: "Agricola Frut JH SPA" },
    { fecha: "04-01-2025", recepcion: "R-56", productor: "Agricola Frut JH SPA" },
    { fecha: "04-01-2025", recepcion: "R-57", productor: "Agricola Frut JH SPA" },
    { fecha: "04-01-2025", recepcion: "R-58", productor: "Agricola Frut JH SPA" },
    { fecha: "04-02-2025", recepcion: "R-59", productor: "Agricola Frut JH SPA" },
    { fecha: "04-02-2025", recepcion: "R-60", productor: "Agricola Frut JH SPA" },
    { fecha: "04-03-2025", recepcion: "R-61", productor: "P. Farías" },
    { fecha: "04-03-2025", recepcion: "R-62", productor: "Agricola Frut JH SPA" },
    { fecha: "04-03-2025", recepcion: "R-63", productor: "Agricola Frut JH SPA" },
    { fecha: "04-04-2025", recepcion: "R-64", productor: "Agricola Frut JH SPA" },
    { fecha: "04-08-2025", recepcion: "R-65", productor: "Agricola Frut JH SPA" },
    { fecha: "04-09-2025", recepcion: "R-66", productor: "Agricola Frut JH SPA" },
    { fecha: "04-10-2025", recepcion: "R-67", productor: "Agricola Frut JH SPA" },
    { fecha: "04-10-2025", recepcion: "R-68", productor: "Agricola Frut JH SPA" },
    { fecha: "04-11-2025", recepcion: "R-69", productor: "Agricola Frut JH SPA" },
    { fecha: "04-12-2025", recepcion: "R-70", productor: "Agricola Frut JH SPA" },
    { fecha: "15-04-2025", recepcion: "R-71", productor: "Agricola Frut JH SPA" },
    { fecha: "16-04-2025", recepcion: "R-72", productor: "Agricola Frut JH SPA" },
    { fecha: "16-04-2025", recepcion: "R-73", productor: "Agricola Frut JH SPA" },
    { fecha: "17-04-2025", recepcion: "R-74", productor: "Agricola Frut JH SPA" },
    { fecha: "17-04-2025", recepcion: "R-75", productor: "Agricola Frut JH SPA" },
  ];

  // Obtener lista de productores únicos
  const productoresUnicos = ["todos", ...Array.from(new Set(fechasRecepciones.map(f => f.productor)))];

  // Filtrar las fechas por productor
  const fechasFiltradas = filtroProductor === "todos" 
    ? fechasRecepciones 
    : fechasRecepciones.filter(f => f.productor === filtroProductor);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="text-lg font-medium">Calendario de Recepciones</h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="filtroProductor" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por productor:
          </label>
          <select
            id="filtroProductor"
            value={filtroProductor}
            onChange={(e) => setFiltroProductor(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          >
            {productoresUnicos.map(productor => (
              <option key={productor} value={productor}>
                {productor === "todos" ? "Todos los productores" : productor}
              </option>
            ))}
          </select>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recepción
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fechasFiltradas.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {item.fecha}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.recepcion}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {item.productor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FechasRecepcion; 