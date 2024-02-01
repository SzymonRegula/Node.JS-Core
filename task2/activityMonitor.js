import { exec } from "child_process";
import { appendFile } from "fs";

let command;
switch (process.platform) {
  case "win32":
    command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
    break;
  case "linux":
  case "darwin":
    command = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
    break;
  default:
    console.error("Unsupported platform.");
    process.exit(1);
}

const execProcess = (command, callback = () => {}) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    const output = stdout.replace(/\n/g, "");
    process.stdout.write(`\r${output}`);
    callback(output);
  });
};

const appendToLogFile = (data) => {
  const logData = `${Math.floor(Date.now() / 1000)} : ${data}\n`;
  appendFile("activityMonitor.log", logData, (err) => {
    if (err) {
      console.error(`Error writing to file: ${err}`);
    }
  });
};

setInterval(() => execProcess(command), 100); // 10/s
setInterval(() => execProcess(command, appendToLogFile), 60000); // 1/min
