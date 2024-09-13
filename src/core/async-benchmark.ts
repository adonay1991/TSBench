import { BenchmarkResult } from "../types/types";

/**
   * Mide el tiempo de ejecución de una función asíncrona.
   * @param fn - Función asíncrona a medir.
   * @param functionName - El nombre de la función para reportes.
  * @returns El resultado del benchmark asíncrono con el tiempo en nanosegundos.
 */

export async function asyncBenchmark(fn: () => Promise<void>, functionName: string): Promise<BenchmarkResult> {
  const start = Bun.nanoseconds();
  try {
    await fn();
  } catch (error) {
    return { functionName, time: 0, error: error instanceof
Error ? error.message : 'Unknown error' };
  }
  const end = Bun.nanoseconds();
  return { functionName, time: end - start };
}