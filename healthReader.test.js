const { healthMetricsCounter } = require("./healthReader");

test("reads valid health JSON file", async () => {
  const result = await healthMetricsCounter("./data/health.json");
  expect(result.totalEntries).toBeGreaterThan(0);
});

test("throws error for missing health file", async () => {
  await expect(
    healthMetricsCounter("missing.json")
  ).rejects.toThrow();
});
