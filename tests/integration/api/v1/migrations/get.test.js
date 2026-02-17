import database from "infra/database";

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

beforeAll(cleanDatabase);

test("GET to /api/v1/migrations returns 200 and the correct response body", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");
  expect(res.status).toBe(200);

  const responseBody = await res.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBeGreaterThan(0);
});
