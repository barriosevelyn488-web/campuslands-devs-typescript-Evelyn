/**
 * Módulo de práctica: Gestión de inventario con TypeScript estricto.
 * Aplica tipado fuerte, interfaces inmutables y manejo explícito de errores.
 */

export interface Producto {
  readonly id: string;
  readonly nombre: string;
  readonly precioUnitario: number;
  readonly stock: number;
}

export interface ResultadoOperacion<T> {
  readonly ok: boolean;
  readonly data?: T;
  readonly error?: string;
}

export function calcularValorInventario(productos: readonly Producto[]): number {
  return productos.reduce((total, item) => {
    if (item.precioUnitario < 0 || item.stock < 0) {
      return total;
    }
    return total + item.precioUnitario * item.stock;
  }, 0);
}

export function descontarStock(
  producto: Producto,
  cantidad: number
): ResultadoOperacion<Producto> {
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    return { ok: false, error: 'La cantidad debe ser un entero positivo.' };
  }
  if (producto.stock < cantidad) {
    return { ok: false, error: 'Stock insuficiente para realizar la operación.' };
  }
  return {
    ok: true,
    data: { ...producto, stock: producto.stock - cantidad },
  };
}
