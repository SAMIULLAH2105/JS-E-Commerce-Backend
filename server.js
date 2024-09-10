const app = require("./app");
const dotenv = require("dotenv");
const connectDataBase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({ path: "Backend/config/config.env" });

//connecting to database
connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.msg}`);
  console.log(`Shutting down the server due to Unhandled promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
