const fs = require("fs").promises;

async function healthMetricsCounter(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    return {
      totalEntries: jsonData.length
    };
  } catch (error) {
    throw new Error("Error reading health data file");
  }
}

module.exports = { healthMetricsCounter };
