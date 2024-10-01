import type { BenchmarkResult } from "../types/types";

import {
	createProfiler,
	getReport,
	setProfiler,
	getProfiler,
} from "./profiler";

import drawReportBox from "../utils/report-box";

/**
 * Mide el tiempo de ejecución de una función asíncrona.
 * @param fn - Función asíncrona a medir.
 * @param functionName - El nombre de la función para reportes.
 * @returns El resultado del benchmark asíncrono con el tiempo en nanosegundos.
 */

export async function asyncBenchmark(
	fn: () => Promise<void>,
	functionName: string,
	detailedReport?: boolean,
): Promise<BenchmarkResult> {
	if (typeof fn !== "function") {
		throw new Error("fn must be a function");
	}

	const profiler = createProfiler();
	setProfiler(profiler);

	const start = Bun.nanoseconds();
	try {
		await fn();
	} catch (error) {
		setProfiler(null);
		return {
			functionName,
			time: 0,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
	const end = Bun.nanoseconds();

	if (detailedReport) {
		const report = getReport(getProfiler()!);
		drawReportBox(functionName, (end - start) / 1e6, report);
	}
	setProfiler(null);
	return drawReportBox(functionName, end - start);
}
