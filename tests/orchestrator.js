import retry from "async-retry";

const STATUS_PAGE_ENTRYPOINT = "http://localhost:3000/api/v1/status";

async function fetchStatusPage(bail) {
  const res = await fetch(STATUS_PAGE_ENTRYPOINT);
  if (res.status !== 200) {
    bail(new Error('Can\"t connect with status endpoint!'));
    return;
  }
}

async function waitForWebServer() {
  return retry(fetchStatusPage, { retries: 50, maxTimeout: 1500 });
}

async function waitForAllServices() {
  await waitForWebServer();
}

export { waitForAllServices };
