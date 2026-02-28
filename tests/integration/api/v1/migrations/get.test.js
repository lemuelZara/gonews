import { METHODS } from "node:http";
import database from "infra/database";
import { waitForAllServices } from "tests/orchestrator";

beforeAll(async () => {
  await waitForAllServices();
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
});

test("GET to /api/v1/migrations returns 200 and the correct response body", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");
  expect(res.status).toBe(200);

  const responseBody = await res.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBeGreaterThan(0);
});

test("should return 405 when HTTP method isn't GET or POST", async () => {
  const ignoredMethods = ["CONNECT", "TRACE"];
  const allowedMethods = ["GET", "POST"];
  const notAllowedMethods = METHODS.filter(
    (m) => ![...allowedMethods, ...ignoredMethods].includes(m),
  );

  notAllowedMethods.forEach(async (method) => {
    const res = await fetch("http://localhost:3000/api/v1/migrations", {
      method,
    });

    expect(res.status).toBe(405);
  });
});
