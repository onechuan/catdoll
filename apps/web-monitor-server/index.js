const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

// 创建Koa应用实例
const app = new Koa();

// 应用CORS中间件，允许跨域请求
app.use(cors());

// 应用body解析中间件，用于解析不同格式的请求体数据
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
    onerror: (err, ctx) => {
        ctx.throw('body parse error', 422);
    }
}));

// 定义处理 /reportData 路由的POST请求的中间件函数
app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/reportData') {
        // 输出请求体数据
        console.log("ct===>",ctx.request.body);
        // 设置响应状态码为200，并返回 'ok'
        ctx.status = 200;
        ctx.body = 'ok';
    } else {
        await next();
    }
});

// 启动服务器，监听在3000端口
app.listen(3000, () => {
    console.log('server is running on 3000');
});