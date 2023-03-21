import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { User, Timeou } from "../db.js";


import express from 'express'
// var express = require('express');
let router = express.Router();
const { APIKEY, accessToken } = process.env;

router.post('/getAnswer', async (req, res) => {
    let startDate = +new Date()
    let data = {
        apiKey: APIKEY || "",
        sessionId: req.body.sessionId || uuidv4(),
        content: req.body.content
    }
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.openai-proxy.com/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
        timeout: 60 * 1000
    };

    axios(config)
        .then(async function (response) {
            let endDate = +new Date()
            let resultNum = endDate - startDate
            if (resultNum > (15 * 1000)) {
                console.log('执行超时兼容操作')
                let tempdata = await Timeou.create({
                    openid: req.body.openid,
                    sessionId: response.data.sessionId,
                    data: response.data.data
                })
                // setTimeout(async ()=>{
                //    await tempdata.destroy()
                // },5000)
                res.send(JSON.stringify(ret))
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
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });

})




router.post('/getTempData', async (req, res) => {
    let ret = await Timeou.findOne(req.body)
    console.log(ret, 'getTempData')
    if (ret.data) {
        await User.decrement('points', {
            where: {
                openid: req.body.openid
            },
            by: 1
        })
    }
    res.send(ret)
    await ret.destroy()
})





export default router

