const { workoutCalculator } = require("./workoutReader");

test("reads valid workout CSV file", async () => {
  const result = await workoutCalculator("./data/workouts.csv");
  expect(result.totalWorkouts).toBeGreaterThan(0);
  expect(result.totalMinutes).toBeGreaterThan(0);
});

test("throws error for missing workout file", async () => {
  await expect(
    workoutCalculator("missing.csv")
  ).rejects.toThrow();
});
