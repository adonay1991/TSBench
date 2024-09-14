import type { BenchmarkResult, ProfilerState, Reports } from "../types/types";
import {
	createProfiler,
	startSection,
	endSection,
	getReport,
} from "./profiler";


// TODO: actualizar documentación
/**
 * Mide el tiempo de ejecución de una función sincrónica.
 * @param fn - La función a medir.
 * @param functionName - El nombre de la función para reportes.
 * @returns El resultado del benchmark con el tiempo en nanosegundos.
 */

export function benchmark(
	fn: (profiler?: ProfilerState) => void,
	functionName: string,
	detailedReport?: boolean,
): BenchmarkResult {
	if (typeof fn !== "function") {
		throw new Error("fn must be a function");
	}

	let profiler: ProfilerState | undefined;

	// si se solicita un reporte detallado, inicia el perfilador
	if (detailedReport) {
		console.warn("Generating detailed report...");
		profiler = createProfiler();
		profiler = startSection(profiler, functionName);
		console.log("profiler benchmark", profiler);
	}

	const start = Bun.nanoseconds();
	let result: BenchmarkResult;

	try {
		// se ejecuta la función
		fn(profiler);
		const end = Bun.nanoseconds();

		if (detailedReport && profiler) {
			profiler = endSection(profiler, functionName);
			result = {
				functionName,
				time: end - start,
				report: getReport(profiler),
			};
		} else {
			result = {
				functionName,
				time: end - start,
			};
		}
	} catch (error) {
		result = {
			functionName,
			time: Number(0n),
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}

	return result;
}
