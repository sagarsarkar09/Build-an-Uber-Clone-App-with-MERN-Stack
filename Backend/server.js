const http = require("http");
const app = require("./app");
const port = process.env.PORT || 4000; // Changed from 3000 to 4000

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
