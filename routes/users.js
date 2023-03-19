// const { User } = require("../db");
import { User } from "../db.js";
import express from 'express'
// var express = require('express');
let router = express.Router();

router.post('/getUserInfo', async (req, res) => {

    console.log('openid', req.body.openid)
    let ret = await User.findOne({
        where: {
            openid: req.body.openid
        },
        raw:true
    })
    console.log(ret,'查询结果')
    res.send(ret)
});

router.post('/addUser', async (req, res) => {

    console.log('addUser', req.body)
    let ret = await User.create(req.body)
    console.log(ret,'addUser')
    res.send(ret)
});


export default router