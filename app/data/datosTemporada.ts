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
      kilosRecepcionados: 12138.35,
      kilosDespezonados: 0,
      kilosLavados: 10373.85,
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
      kilosRecepcionados: 27800.40,
      kilosDespezonados: 4539.4,
      kilosLavados: 23209.33,
      kilosNoLavados: 0,
      mermaDespezonado: {
        hoja: 412.06,
        jugo: 492,
        desecho: 0
      },
      mermaLavado: {
        jugo: 351,
        hongo: 0,
        frutaMalDespezonada: 50,
        desecho: 3209.25
      }
    },
    {
      numero: 3,
      productor: "F. Carrasco",
      kilosRecepcionados: 10902.7,
      kilosDespezonados: 0,
      kilosLavados: 4945.81,
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
        desecho: 178.9
      }
    },
    {
      numero: 4,
      productor: "J. Carrasco",
      kilosRecepcionados: 6230,
      kilosDespezonados: 0,
      kilosLavados: 5360.01,
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
      kilosRecepcionados: 49469.50,
      kilosDespezonados: 0,
      kilosLavados: 32333.32,
      kilosNoLavados: 15113,
      mermaDespezonado: {
        hoja: 0,
        jugo: 0,
        desecho: 0
      },
      mermaLavado: {
        jugo:  1315,
        hongo: 0,
        frutaMalDespezonada: 0,
        desecho: 441.89
      }
    },
    {
      numero: 6,
      productor: "Agricola Frut JH SPA",
      kilosRecepcionados: 435736.20,
      kilosDespezonados: 326733.11,
      calculoParaDespezonado: 406714.9,
      calculoParaLavado: 300321.37,
      kilosLavados: 323159.94,
      kilosNoLavados: 1669,
      mermaDespezonado: {
        hoja: 50587.34,
        jugo: 28675.50,
        desecho: 200
      },
      mermaLavado: {
        jugo: 20577.4,
        hongo: 287.55,
        frutaMalDespezonada: 1436.9,
        desecho: 3465.05
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
    totalTotes: 311,
    pesoTotalTotes: 146611.4,
    totalPaletsCajas: 414,
    pesoTotalCajas: 222286.28,
    totalesCongelados: {
      paletsIQFPendientes: 69,
      pesoIQFPendientes: 17195.98
    },
    totalCajas: 16415,
    paletsIQF: 1074
  },
  categorias: {
    granel: 358,
    bolsas6x5: 16,
    bolsas13x2: 29,
    bolsas14x2: 9,
    bolsas10x1: 2
  },
  productos: {
    mixBerries: {
      palets: 2,
      peso: 684.4
    },
    frutilla: {
      palets: 403,
      peso: 217019.98
    },
    pulpaFrutilla: {
      palets: 9,
      peso: 4581.9
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