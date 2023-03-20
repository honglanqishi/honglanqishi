// const { User } = require("../db");
import { User,Dialog } from "../db.js";
import express from 'express'
// var express = require('express');
let router = express.Router();

router.post('/getUserInfo', async (req, res) => {

    console.log('openid', req.body.openid)
    let ret = await User.findOne({
        where: {
            openid: req.body.openid
        },
        raw: true
    })
    console.log(ret, '查询结果')
    res.send(ret)
});

router.post('/addUser', async (req, res) => {
    console.log('addUser', req.body)
    let ret = await User.create(req.body)
    await Dialog.create({
        openid:req.body.openid,
        dialogName:'默认对话'
    })
    console.log(ret, 'addUser')
    res.send(ret)
});


router.post('/addDialog', async (req, res) => {
    let ret = await Dialog.create(req.body)
    console.log(ret, 'addDialog')
    res.send(ret)
})

router.post('/deleteDialog', async (req, res) => {
    let ret = await Dialog.destroy({
        where:{
            dialogId:req.body.dialogId
        }
    })
    console.log(ret, 'deleteDialog')
    res.send(ret)
})


router.post('/getDialogList', async (req, res) => {
    let ret = await Dialog.findAll({
        where:{
            openid:req.body.openid
        }
    })
    console.log(ret, 'getDialogList')
    res.send(ret)
})



export default router