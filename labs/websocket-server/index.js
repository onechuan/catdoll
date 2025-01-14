const Koa = require("koa");
const http = require("http");

const { runChatSocket } = require("./src/chatSocket.js");

const app = new Koa();
// 创建 HTTP 服务
const server = http.createServer(app.callback());

runChatSocket(server)

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})