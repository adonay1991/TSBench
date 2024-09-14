export type BenchmarkResult = {
	functionName: string;
	time?: number;
	error?: string;
	detailedReport?: boolean;
	report?: { [key: string]: any };
};

export type Reports = {
	fn?: () => void;
};

export type ProfilerState = {
	startTimes?: { [key: string]: number | bigint | undefined }; // Usamos bigint para nanosegundos
	sections: { [key: string]: number | bigint }; // Acumulación de tiempos en nanosegundos
};
