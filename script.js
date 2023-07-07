console.log("Running script...")

process.argv.push(...["_", "--emitTs", "-p", "sandbox/"])

// Runs executeCommandLine(...)
require("./built/local/tsc.js")
