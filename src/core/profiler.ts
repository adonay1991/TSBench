import type { ProfilerState } from "../types/types";

function createProfiler(): ProfilerState {
	return { sections: {} };
}

//TODO: docmuntación (ver notion)
// marca el inicio de una sección
function startSection(
	state: ProfilerState,
	sectionName: string,
): ProfilerState {
	//console.log("startsection", state, sectionName);
	state.sections[sectionName] = Bun.nanoseconds();
	return state;
}

//TODO: docmuntación (ver notion)
// marca el final de una sección
function endSection(state: ProfilerState, sectionName: string): ProfilerState {
	//console.log("endsection", state);
	const startTime = state.sections[sectionName];
	if (startTime) {
		state.sections[sectionName] = Bun.nanoseconds() - Number(startTime);
	}
	return state;
}

//TODO: tipado y docmuntación (ver notion)
// genera el reporte final y convierte los tiempos a milisegundos
function getReport(state: ProfilerState): any {
	const report: { [key: string]: number } = {};
	for (const section in state.sections) {
		report[section] = Number(state.sections[section]) / 1e6; // Convierte nanosegundos a milisegundos
	}
	return report;
}

export { createProfiler, startSection, endSection, getReport };
