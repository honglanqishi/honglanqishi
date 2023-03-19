import axios from 'axios'
import { v4 as uuidv4 } from "uuid";

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
        data: JSON.stringify(data)
    };

    axios(config)
        .then(function (response) {
            console.log(data.sessionId);
            res.send(JSON.stringify(response.data))
        })
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });
    
})


export default router

