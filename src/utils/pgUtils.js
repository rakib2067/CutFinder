async function startTransaction(client) {
  try {
    await client.query("BEGIN");
    console.log("Transaction started");
  } catch (error) {
    console.log("Error starting transaction:", error);
  }
}

async function commitTransaction(client) {
  try {
    await client.query("COMMIT");
    console.log("Transaction committed");
  } catch (error) {
    console.log("Error committing transaction:", error);
  }
}

async function rollbackTransaction(client) {
  try {
    await client.query("ROLLBACK");
    console.log("Transaction rolled back");
  } catch (error) {
    console.log("Error rolling back transaction:", error);
  }
}

module.exports = {
  startTransaction,
  commitTransaction,
  rollbackTransaction,
};
