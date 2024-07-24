const mysql = require("mysql2");

const Connection = mysql.createConnection({
  // host: "192.168.0.135",
  host: "192.168.0.166",
  user: "rootuser",
  // password: "rishi@123",
  password: "root@123",

  // database: "attendance_app", // Corrected the database name here
  // database: "pulsedb", // Corrected the database name here
  database: "pulsedb",

  
});

Connection.connect((err) => {
  if (err) console.log(err.stack);
  console.log("Successfully connected to the database.");
});

module.exports = Connection; // Export using module.exports for CommonJS
