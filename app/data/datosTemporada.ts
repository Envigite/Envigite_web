// Definición de tipos simple para uso interno
interface Recepcion {
  kilosRecepcionados: number;
  kilosDespezonados: number;
  kilosLavados: number;
}

// Datos de ejemplo para el cierre de temporada
export const datosCierre = {
  recepciones: [
    {
      numero: 1,
      productor: "L. Carrasco",
      kilosRecepcionados: 12138,
      kilosDespezonados: 0,
      kilosLavados: 10373,
      kilosNoLavados: 0,
      mermaDespezonado: {
        hoja: 0,
        jugo: 0,
        desecho: 0
      },
      mermaLavado: {
        jugo: 0,
        hongo: 0,
        frutaMalDespezonada: 0,
        desecho: 1781
      }
    },
    {
      numero: 2,
      productor: "P. Farías",
      kilosRecepcionados: 27800,
      kilosDespezonados: 4539,
      kilosLavados: 23209,
      kilosNoLavados: 0,
      mermaDespezonado: {
        hoja: 412,
        jugo: 492,
        desecho: 0
      },
      mermaLavado: {
        jugo: 0,
        hongo: 0,
        frutaMalDespezonada: 0,
        desecho: 3649
      }
    },
    {
      numero: 3,
      productor: "F. Carrasco",
      kilosRecepcionados: 10903,
      kilosDespezonados: 0,
      kilosLavados: 4946,
      kilosNoLavados: 5779.1,
      mermaDespezonado: {
        hoja: 0,
        jugo: 0,
        desecho: 0
      },
      mermaLavado: {
        jugo: 0,
        hongo: 0,
        frutaMalDespezonada: 0,
        desecho: 179
      }
    },
    {
      numero: 4,
      productor: "J. Carrasco",
      kilosRecepcionados: 6230,
      kilosDespezonados: 0,
      kilosLavados: 5360,
      kilosNoLavados: 0,
      mermaDespezonado: {
        hoja: 0,
        jugo: 0,
        desecho: 0
      },
      mermaLavado: {
        jugo: 0,
        hongo: 0,
        frutaMalDespezonada: 0,
        desecho: 1117
      }
    },
    {
      numero: 5,
      productor: "C. Giofer Spa",
      kilosRecepcionados: 49470,
      kilosDespezonados: 0,
      kilosLavados: 32333,
      kilosNoLavados: 15113,
      mermaDespezonado: {
        hoja: 0,
        jugo: 0,
        desecho: 0
      },
      mermaLavado: {
        jugo: 16428,
        hongo: 0,
        frutaMalDespezonada: 0,
        desecho: 442
      }
    },
    {
      numero: 6,
      productor: "Agricola Frut JH SPA",
      kilosRecepcionados: 435736,
      kilosDespezonados: 326733,
      kilosLavados: 323160,
      kilosNoLavados: 1669,
      mermaDespezonado: {
        hoja: 50587,
        jugo: 28676,
        desecho: 200
      },
      mermaLavado: {
        jugo: 22296,
        hongo: 288,
        frutaMalDespezonada: 1437,
        desecho: 3465
      }
    }
  ],
  datosProductores: {
    "L. Carrasco": { recepciones: 3 },
    "P. Farías": { recepciones: 8 },
    "F. Carrasco": { recepciones: 1 },
    "J. Carrasco": { recepciones: 1 },
    "C. Giofer Spa": { recepciones: 7 },
    "Agricola Frut JH SPA": { recepciones: 52 }
  },
  embalaje: {
    totalTotes: 712,
    pesoTotalTotes: 146611.40,
    totalPaletsCajas: 1074,
    pesoTotalCajas: 225936.71
  },
  categorias: {
    granel: 434,
    bolsas6x5: 16,
    bolsas13x2: 29,
    bolsas14x2: 8,
    bolsas10x1: 1
  },
  productos: {
    mixBerries: {
      palets: 2,
      peso: 684.4
    },
    frutilla: {
      palets: 478,
      peso: 220952.86
    },
    pulpaFrutilla: {
      palets: 8,
      peso: 3969
    }
  }
};

// Calcular totales
export const calcularTotales = () => {
  // Total de kilos recepcionados
  const totalKilosRecepcionados = datosCierre.recepciones.reduce(
    (total: number, recepcion: Recepcion) => total + recepcion.kilosRecepcionados, 
    0
  );
  
  // Total de kilos despezonados
  const totalKilosDespezonados = datosCierre.recepciones.reduce(
    (total: number, recepcion: Recepcion) => total + recepcion.kilosDespezonados, 
    0
  );
  
  // Total de kilos lavados
  const totalKilosLavados = datosCierre.recepciones.reduce(
    (total: number, recepcion: Recepcion) => total + recepcion.kilosLavados, 
    0
  );
  
  // Total de kilos en producto final
  const totalKilosProductoFinal = 
    datosCierre.productos.mixBerries.peso +
    datosCierre.productos.frutilla.peso +
    datosCierre.productos.pulpaFrutilla.peso;
  
  // Total de palets
  const totalPalets = 
    datosCierre.productos.mixBerries.palets +
    datosCierre.productos.frutilla.palets +
    datosCierre.productos.pulpaFrutilla.palets;
  
  return {
    totalKilosRecepcionados,
    totalKilosDespezonados,
    totalKilosLavados,
    totalKilosProductoFinal,
    totalPalets
  };
};

// Calcular porcentajes
export const calcularPorcentajes = () => {
  const totales = calcularTotales();
  
  // Porcentaje de rendimiento (kilos producto final / kilos recepcionados)
  const porcentajeRendimiento = totales.totalKilosRecepcionados > 0 
    ? (totales.totalKilosProductoFinal / totales.totalKilosRecepcionados) * 100 
    : 0;
  
  // Porcentaje por tipo de producto
  const porcentajeMixBerries = totales.totalKilosProductoFinal > 0 
    ? (datosCierre.productos.mixBerries.peso / totales.totalKilosProductoFinal) * 100 
    : 0;
  
  const porcentajeFrutilla = totales.totalKilosProductoFinal > 0 
    ? (datosCierre.productos.frutilla.peso / totales.totalKilosProductoFinal) * 100 
    : 0;
  
  const porcentajePulpaFrutilla = totales.totalKilosProductoFinal > 0 
    ? (datosCierre.productos.pulpaFrutilla.peso / totales.totalKilosProductoFinal) * 100 
    : 0;
  
  return {
    porcentajeRendimiento,
    porcentajeMixBerries,
    porcentajeFrutilla,
    porcentajePulpaFrutilla
  };
}; 