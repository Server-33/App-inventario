export interface EMedic extends EmedicForm {
  id: string;
}

export interface EmedicForm {
  nombre: string;
  categoria: string;
  cantidad: number;
  precio: number;
  descripcion?: string;
  fecha_agregado?: string;
  proveedor?: string;
}


