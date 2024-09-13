import { BenchmarkResult } from "../types/types";

/**
   * Mide el tiempo de ejecución de una función sincrónica.
   * @param fn - La función a medir.
   * @param functionName - El nombre de la función para reportes.
  * @returns El resultado del benchmark con el tiempo en nanosegundos.
 */

export function benchmark(fn: () => void, functionName: string): BenchmarkResult {
  const start = Bun.nanoseconds();
  try {
    fn();
  } catch (error) {
    return {functionName, time: 0, error: error instanceof
      Error ? error.message : 'Unknown error'};
  }
  const end = Bun.nanoseconds();
  return {
    functionName,
    time: end - start,
  };
}