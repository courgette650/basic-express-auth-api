require("dotenv").config();
const mongoose = require("mongoose");
const server = require("express")();
// const server = https.createServer(app);
// const cors = require("cors");

const authRoutes = require("./authRoutes");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const MONGO_URI =
  process.env.MONGO_URI ||
  (() => {
    const { HOST, PASSWORD, DB_NAME } = process.env;
    return `mongodb://${HOST}:${PASSWORD}localhost:27017/${DB_NAME}`;
  })();

// server.use(cors);

console.log(MONGO_URI);
server.use("/auth", authRoutes);

// server listening
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((/*req, res*/) => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
// 5R6iuEkFWwE5KSeU
