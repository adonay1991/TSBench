import { benchmark } from "./src/core/benchmark";
import { startSection, endSection } from "./src/core/profiler";
import { asyncBenchmark } from "./src/core/async-benchmark";
import { compareBenchmarks } from "./src/core/compareBenchmark";

function count() {
	let count = 0;
	for (let i = 0; i < 1000000; i++) {
		count++;
	}
	return count;
}

async function fetchAsync() {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const data = await response.json();
	return data;
}

async function runAsync() {
	const result = await asyncBenchmark(fetchAsync, "fetchAsync");
	console.log(result);
}

// benchmark(count, "count");

// const results = compareBenchmarks([
//   { fn: count, name: "count" },
//   { fn: fetchAsync, name: "fetchAsync" },
// ]);
// console.log(results);

function granularBenchmark() {
	// Primer proceso
	startSection("Process 1");
	for (let i = 0; i < 1e6; i++) {} // Simula un trabajo en Process 1
	endSection("Process 1");

	// Segundo proceso
	startSection("Process 2");
	for (let i = 0; i < 2e6; i++) {} // Simula un trabajo en Process 2
	endSection("Process 2");

	// Tercer proceso
	startSection("Process 3");
	for (let i = 0; i < 100e6; i++) {} // Simula un trabajo en Process 3
	endSection("Process 3");
}

// benchmark(granularBenchmark, "granularBenchmark", true);

async function asynGranularBenchmark() {
	// Primer proceso
	startSection("Process 1");
	await new Promise((resolve) => setTimeout(resolve, 100)); // Simula un trabajo en Process 1 con un retraso de 100ms
	endSection("Process 1");

	// Segundo proceso
	startSection("Process 2");
	await new Promise((resolve) => setTimeout(resolve, 200)); // Simula un trabajo en Process 2 con un retraso de 200ms
	endSection("Process 2");

	// Tercer proceso
	startSection("Process 3");
	await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un trabajo en Process 3 con un retraso de 300ms
	endSection("Process 3");
}

// Ejecutar el benchmark

async function runAsync2() {
	const result = await asyncBenchmark(
		asynGranularBenchmark,
		"asynGranularBenchmark",
		true,
	);
}

runAsync2();
