import {BenchmarkResult} from "../types/types";
import {benchmark} from "./benchmark";

/**
 * Compara múltiples funciones y sus tiempos de ejecución.
 * @param functions - Un array de funciones a comparar.
 * @returns Un array con los resultados de los benchmarks.
 */

export function compareBenchmarks(functions: Array<{ fn: ()
  => void; name: string }>): BenchmarkResult[] {
    return functions.map(({ fn, name }) => benchmark(fn, name));
  }