require("./config/db");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const http = require("http");
const app = express();
const server = http.createServer(app); // Add this
const port = process.env.PORT || 5080;

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/", async (req, res) => {
  res.send("Node is running")

}); 



const startServer = () => {
  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};
startServer();

module.exports = app;
