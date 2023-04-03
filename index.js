
import path from 'path'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import usersRouter from './routes/users.js'
// import chatRouter from './chat/index.js'
import proxyRouter from './chat/proxy.js'


// const { init: initDB, Counter } = require("./db");
import { init, Counter } from './db.js'



const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/users',usersRouter)
// app.use('/chat',chatRouter)
app.use('/proxy',proxyRouter)

app.use(cors());
app.use(logger);


// 首页1
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 更新计数
app.post("/api/count", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }
  res.send({
    code: 0,
    data: await Counter.count(),
  });
});

// 获取计数
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    data: result,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    console.log('获取微信 Open ID',req.headers["x-wx-openid"])
    let data = {
      openid:req.headers["x-wx-openid"]
    }
    res.send(data);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await init();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
