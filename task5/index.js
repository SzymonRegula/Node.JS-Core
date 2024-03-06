const http = require("http");
const userRouter = require("./routers/usersRouter");

const server = http.createServer((req, res) => {
  userRouter(req, res);
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
