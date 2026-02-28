import { waitForAllServices } from "tests/orchestrator";

beforeAll(async () => {
  await waitForAllServices();
});

test("GET to /api/v1/status returns 200 and the correct response body", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);

  const responseBody = await res.json();

  const parsedDate = new Date(responseBody.updated_at).toISOString();

  expect(responseBody).toEqual({
    updated_at: parsedDate,
    dependencies: {
      database: {
        version: "18.1",
        max_connections: 100,
        used_connections: 1,
      },
    },
  });
});
