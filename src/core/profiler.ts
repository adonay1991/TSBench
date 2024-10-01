import type { ProfilerState } from "../types/types";

let internalProfiler: ProfilerState | null = null;

function createProfiler(): ProfilerState {
	return {
		sections: {},
	};
}

function setProfiler(profiler: ProfilerState | null) {
	internalProfiler = profiler;
}

function getProfiler(): ProfilerState | null {
	return internalProfiler;
}

function startSection(sectionName: string) {
	const profiler = getProfiler();
	if (!profiler) {
		throw new Error(
			"Profiler has not been initialized. Ensure you are using benchmark correctly.",
		);
	}

	if (profiler.sections[sectionName]) {
		throw new Error(`Section '${sectionName}' already started.`);
	}

	profiler.sections[sectionName] = Bun.nanoseconds();
}

function endSection(sectionName: string) {
	const profiler = getProfiler();
	if (!profiler || !profiler.sections[sectionName]) {
		throw new Error(`Section '${sectionName}' was not started.`);
	}

	profiler.sections[sectionName] =
		Bun.nanoseconds() - Number(profiler.sections[sectionName]);
}

function getReport(state: ProfilerState) {
	const report: { [key: string]: number } = {};
	for (const section in state.sections) {
		report[section] = Number(state.sections[section]) / 1e6; // Convertimos nanosegundos a milisegundos
	}
	return report;
}

export {
	createProfiler,
	startSection,
	endSection,
	getReport,
	setProfiler,
	getProfiler,
};
