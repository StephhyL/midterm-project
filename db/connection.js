// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect(() => {
  console.log(`Jarvis we are connected`)
});


module.exports = db;
