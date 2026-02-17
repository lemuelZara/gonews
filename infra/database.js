import { Client } from "pg";

function getSSL() {
  return process.env.NODE_ENV === "production" ? true : false;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSL(),
  });

  await client.connect();

  return client;
}

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    const res = await client.query(queryObject);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export default {
  query,
  getNewClient,
};
