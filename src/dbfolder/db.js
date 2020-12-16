const { Pool, Client } = require("pg");
const connectionString =
  "postgres://zzicwjla:XI_6ttgBO2FrhlFwHZZIsQaCVIraQatf@raja.db.elephantsql.com:5432/zzicwjla";
const pool = new Pool({
  connectionString
});

const client = new Client({
  connectionString
});
client.connect();

module.exports = pool;
module.client = pool;
