const WebSocket = require("ws");

function runChatSocket(server) {
    // 创建 WebSocket 服务器，绑定到 HTTP 服务器上
    const wss = new WebSocket.Server({ server });

    // 监听 WebSocket 连接
    wss.on('connection', (ws) => {
        console.log('Client connected');

        // 处理接收到的消息
        ws.on('message', (message) => {
            console.log('Received:', message.toString());

            // 向客户端发送消息
            ws.send(`Server received: ${message}`);
        });

        // 处理客户端断开连接
        ws.on('close', () => {
            console.log('Client disconnected');
        });

        // 处理 WebSocket 错误
        ws.on('error', (err) => {
            console.error('WebSocket error:', err);
        });

        // 向客户端发送初始欢迎消息
        ws.send('Welcome to the WebSocket server!');
    });
}

module.exports = { runChatSocket };
