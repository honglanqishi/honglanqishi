import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { User } from "../db.js";


import express from 'express'
// var express = require('express');
let router = express.Router();
const { APIKEY, accessToken } = process.env;

router.post('/getAnswer', async (req, res) => {
    let data ={
        apiKey:APIKEY || "",
        sessionId:req.body.sessionId||uuidv4(),
        content:req.body.content
    } 
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.openai-proxy.com/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
        timeout:6000
    };

    axios(config)
        .then(async function (response) {
            console.log(data.sessionId);
            let ret = response.data
            ret.sessionId = data.sessionId
            await User.decrement('points',{
                where:{
                    openid:req.body.openid
                },
                by:1
            })
            res.send(JSON.stringify(ret))

        })
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });
    
})


export default router

