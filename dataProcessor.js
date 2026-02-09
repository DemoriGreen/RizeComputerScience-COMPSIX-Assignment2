require("dotenv").config();

const { healthMetricsCounter } = require("./healthReader");
const { workoutCalculator } = require("./workoutReader");

async function processFiles() {
  try {
    console.log(`Processing data for: ${process.env.USER_NAME}`);

    console.log("📁 Reading workout data...");
    const workoutData = await workoutCalculator("./data/workouts.csv");

    console.log(`Total workouts: ${workoutData.totalWorkouts}`);
    console.log(`Total minutes: ${workoutData.totalMinutes}`);

    console.log("📁 Reading health data...");
    const healthData = await healthMetricsCounter("./data/health.json");

    console.log("\n=== SUMMARY ===");
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthData.totalEntries}`);
    console.log(`Weekly goal: ${process.env.WEEKLY_GOAL} minutes`);

    if (workoutData.totalMinutes >= process.env.WEEKLY_GOAL) {
      console.log(
        `🎉 Congratulations ${process.env.USER_NAME}! You have exceeded your weekly goal!`
      );
    } else {
      console.log(
        `Keep going ${process.env.USER_NAME}, you're almost there!`
      );
    }
  } catch (error) {
    console.error(error.message);
  }
}

processFiles();
