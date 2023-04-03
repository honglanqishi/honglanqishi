import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { User, Timeou } from "../db.js";


import express from 'express'
// var express = require('express');
let router = express.Router();
const { APIKEY, ANSWER_URL } = process.env;

router.post('/getAnswer', async (req, res) => {
    
    let txt = req.body.content
    txt = replaceSensitiveWords(txt)
    let startDate = +new Date()
    let data = {
        apiKey: APIKEY || "",
        sessionId: req.body.sessionId || uuidv4(),
        content: txt
    }
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'https://api.openai-proxy.com/v1/chat/completions',
        url:ANSWER_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
        timeout: 90 * 1000
    };

    axios(config)
        .then(async function (response) {
            let endDate = +new Date()
            let resultNum = endDate - startDate
            response.data.data = replaceSensitiveWords(response.data.data)
            if (resultNum > (15 * 1000)) {
                console.log('执行超时兼容操作')
                let tempdata = await Timeou.create({
                    openid: req.body.openid,
                    sessionId: data.sessionId,
                    data: response.data.data
                })
                // setTimeout(async ()=>{
                //    await tempdata.destroy()
                // },5000)
                res.send('服务超时或异常')
                return
            }
            console.log(data.sessionId, '请求成功并打印了sessionId');
            let ret = response.data
            ret.sessionId = data.sessionId
            // console.log(response,'打印了response')
            await User.decrement('points', {
                where: {
                    openid: req.body.openid
                },
                by: 1
            })
            console.log('执行了扣分操作11111111')
            res.send(JSON.stringify(ret))

        })
        .catch(async function (error) {
            console.log('打印了错误信息',error);
            await Timeou.create({
                openid: req.body.openid,
                sessionId: data.sessionId,
                data: "500"
            })
            res.send('服务超时或异常')
        });

})




router.post('/getTempData', async (req, res) => {
    let ret = await Timeou.findOne({
        where:{
            openid:req.body.openid
        }
    })
    console.log(ret, 'getTempData')
    //如覆data==500说明网络超时，不扣积分
    if (ret&&ret.data&&ret.data!='500') {
        await User.decrement('points', {
            where: {
                openid: req.body.openid
            },
            by: 1
        })
    }
    res.send(ret)
    if(ret){
        await ret.destroy()
    }
})

function replaceSensitiveWords(text) {
    const sensitiveWords = ['chatgpt', 'openai', '新疆', '西藏','gpt','xinjiang','xizang'];
    let replacedText = text;
    let count = 0;
  
    for (let i = 0; i < sensitiveWords.length; i++) {
      const regExp = new RegExp(sensitiveWords[i], 'ig');
      const match = replacedText.match(regExp);
      if (match) {
        count += match.length;
        replacedText = replacedText.replace(regExp, match => {
          let star = '';
          for (let j = 0; j < match.length; j++) {
            star += '*';
          }
          return star;
        });
      }
    }
  
    console.log(`替换了 ${count} 个敏感词`);
  
    return replacedText;
  }



export default router

