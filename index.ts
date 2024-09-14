import { benchmark } from "./src/core/benchmark";
import { startSection, endSection, createProfiler } from "./src/core/profiler";
import { asyncBenchmark } from "./src/core/async-benchmark";
import { compareBenchmarks } from "./src/core/compareBenchmark";

console.log("Hello via Bun!");

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

// async function runAsync() {
//   const result = await asyncBenchmark(fetchAsync, "fetchAsync");
//   console.log(result);
// }

// runAsync();

const result = benchmark(count, "count");
console.log(result);

// const results = compareBenchmarks([
//   { fn: count, name: "count" },
//   { fn: fetchAsync, name: "fetchAsync" },
// ]);
// console.log(results);


// TODO: el usuario no deberia porq usar el profiler como param y mucho menos usar un tipo
function granularBenchmark(profiler: any) {
	// Primer proceso
	//console.log("Process 1");
	profiler = startSection(profiler, "Process 1");
	for (let i = 0; i < 1e6; i++) {} // Simula un trabajo en Process 1
	profiler = endSection(profiler, "Process 1");

	// Segundo proceso
	//console.log("Process 2");
	profiler = startSection(profiler, "Process 2");
	for (let i = 0; i < 2e6; i++) {} // Simula un trabajo en Process 2
	profiler = endSection(profiler, "Process 2");

	// Tercer proceso
	//console.log("Process 3");
	profiler = startSection(profiler, "Process 3");
	for (let i = 0; i < 3e6; i++) {} // Simula un trabajo en Process 3
	profiler = endSection(profiler, "Process 3");

	console.log("Result", profiler);
	return profiler;
}

const granularResult = benchmark(granularBenchmark, "granularBenchmark", true);
console.log(granularResult);
