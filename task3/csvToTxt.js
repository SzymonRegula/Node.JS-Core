import fs from "fs";
import csv from "csvtojson";

const readStream = fs.createReadStream("./task3/csv/data.csv");
const writeStream = fs.createWriteStream("./task3/data.txt");

readStream
  .on("error", (err) => console.error("Error reading file:", err))
  .pipe(csv())
  .on("error", (err) => console.error("Error converting CSV to JSON:", err))
  .on("data", (row) => {
    const jsonRow = JSON.parse(row);
    const formattedRow = Object.values(jsonRow).join(" ") + "\n";
    writeStream.write(formattedRow, "utf-8", (err) => {
      if (err) console.error("Error writing file:", err);
    });
  })
  .on("end", () => {
    console.log("CSV file processing completed.");
  });
