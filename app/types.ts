// Definición de tipos para la aplicación de cierre de temporada

// Tipo para merma de despezonado
export type MermaDespezonado = {
  hoja: number;
  jugo: number;
  desecho: number;
};

// Tipo para merma de lavado
export type MermaLavado = {
  jugo: number;
  hongo: number;
  frutaMalDespezonada: number;
  desecho: number;
};

// Tipo para cada recepción
export type Recepcion = {
  numero: number;
  productor: string;
  kilosRecepcionados: number;
  kilosDespezonados: number;
  kilosLavados: number;
  mermaDespezonado: MermaDespezonado;
  mermaLavado: MermaLavado;
};

// Tipo para datos de embalaje
export type DatosEmbalaje = {
  totalTotes: number;
  pesoTotalTotes: number;
  totalPaletsCajas: number;
  pesoTotalCajas: number;
  totalesCongelados?: {
    paletsIQFPendientes: number;
    pesoIQFPendientes: number;
  };
  totalCajas?: number;
  paletsIQF?: number;
};

// Tipo para categorías de embalaje
export type DatosCategorias = {
  granel: number;
  bolsas6x5: number;
  bolsas13x2: number;
  bolsas14x2: number;
  bolsas10x1: number;
};

// Tipo para un producto
export type DatoProducto = {
  palets: number;
  peso: number;
};

// Tipo para productos
export type DatosProductos = {
  mixBerries: DatoProducto;
  frutilla: DatoProducto;
  pulpaFrutilla: DatoProducto;
};

// Tipo principal para datos de cierre
export type DatosCierre = {
  recepciones: Recepcion[];
  embalaje: DatosEmbalaje;
  categorias: DatosCategorias;
  productos: DatosProductos;
}; 