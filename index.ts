import { benchmark } from "./src/core/benchmark";
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

async function runAsync() {
  const result = await asyncBenchmark(fetchAsync, "fetchAsync");
  console.log(result);
}

runAsync();

const result = benchmark(count, "count");
console.log(result);

const results = compareBenchmarks([
  { fn: count, name: "count" },
  { fn: fetchAsync, name: "fetchAsync" },
]);
console.log(results);
