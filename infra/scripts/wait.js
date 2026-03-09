const { exec } = require("node:child_process");

function check() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleResult);

  function handleResult(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");

      check();

      return;
    }

    console.log("\n\n✅ Postgres ready!\n");
  }
}

process.stdout.write("\n\n⌛️ Waiting Postgres\n");

check();
