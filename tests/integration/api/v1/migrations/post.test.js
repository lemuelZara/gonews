import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to /api/v1/migrations returns 200 and the correct response body", async () => {
  const firstRequest = async () => {
    const res = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    expect(res.status).toBe(201);

    const responseBody = await res.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
  };

  const secondRequest = async () => {
    const res = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    expect(res.status).toBe(200);

    const responseBody = await res.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBe(0);
  };

  await firstRequest();
  await secondRequest();
});
