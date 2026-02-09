const fs = require("fs");
const csv = require("csv-parser");

function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    let workoutCount = 0;
    let totalMinutes = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        workoutCount++;
        totalMinutes += Number(row.minutes);
      })
      .on("end", () => {
        resolve({
          totalWorkouts: workoutCount,
          totalMinutes: totalMinutes
        });
      })
      .on("error", () => {
        reject(new Error("Error reading workout data file"));
      });
  });
}

module.exports = { workoutCalculator };
