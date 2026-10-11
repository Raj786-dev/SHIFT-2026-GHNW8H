const fs = require('fs');

const code = fs.readFileSync('app.js', 'utf8');
const relevantPart = code.slice(0, code.indexOf('const AppState ='));
const vm = require('vm');
const context = {};
vm.createContext(context);

const wrappedCode = relevantPart + "\n;({ ROUTES, SEED_BATTERIES, assess });";
const { ROUTES, SEED_BATTERIES, assess } = vm.runInContext(wrappedCode, context);

console.log("=== SCORING ENGINE VALIDATION ===");
SEED_BATTERIES.forEach(b => {
  const res = assess(b);
  console.log(`Battery: ${b.id} (${b.model})`);
  console.log(`  Health Score: ${res.score}/100`);
  console.log(`  Triage Route: ${res.route.label}`);
  console.log(`  Deductions:`, res.deductions);
  console.log(`  Hazard Flag: ${res.hasCriticalHazard}`);
  console.log('-------------------------------------------');
});
