export default function drawReportBox(functionName: string, totalTime: number, report?: { [key: string]: number }) {
  const topBorder = "╔═══════════════════════════════════════════════════╗";
  const bottomBorder = "╚═══════════════════════════════════════════════════╝";
  const lineSeparator = "║───────────────────────────────────────────────────║";
  
  console.log(topBorder);
  console.log(`║ Function: ${functionName.padEnd(39)} ║`);
  console.log(lineSeparator);
  console.log(`║ Total Time: ${(totalTime / 1e6).toFixed(3)} ms`.padEnd(52) + "║");
  console.log(lineSeparator);

  if(report) {
    for (const [section, time] of Object.entries(report)) {
      console.log(`║ ${section}: ${(time).toFixed(3)} ms`.padEnd(52) + "║");
    }
  }
  console.log(bottomBorder);
}