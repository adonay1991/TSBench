import type { BenchmarkResult, ProfilerState, Reports } from "../types/types";
import {
	createProfiler,
	startSection,
	endSection,
	getReport,
  setProfiler,
  getProfiler
} from "./profiler";

import drawReportBox from "../utils/report-box";


// TODO: actualizar documentación
/**
 * Mide el tiempo de ejecución de una función sincrónica.
 * @param fn - La función a medir.
 * @param functionName - El nombre de la función para reportes.
 * @returns El resultado del benchmark con el tiempo en nanosegundos.
 */

// benchmark.ts
export function benchmark(
  fn: () => void,
  functionName: string,
  detailedReport?: boolean
): BenchmarkResult {
  if (typeof fn !== "function") {
    throw new Error("fn must be a function");
  }

  // Inicializar el profiler
  const profiler = createProfiler();
  setProfiler(profiler);

  const start = Bun.nanoseconds();
  try {
    fn(); // Ejecutar la función que contiene las secciones
  } catch (error) {
    setProfiler(null); // Limpiar el profiler en caso de error
    return {
      functionName,
      time: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  const end = Bun.nanoseconds();

  if (detailedReport) {
    const report = getReport(getProfiler()!);
    setProfiler(null); // Limpiar el profiler después del reporte
    return drawReportBox(functionName, (end - start), report);
  }

  // Limpiar el profiler después de la ejecución
  setProfiler(null);

  return drawReportBox(functionName, (end - start));
}


