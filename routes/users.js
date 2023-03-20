// const { User } = require("../db");
import { User, Dialog, Answer,sequelize } from "../db.js";
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
        openid: req.body.openid,
        dialogName: '默认对话'
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
    const t = await sequelize.transaction();
    let ret = await Dialog.destroy({
        where: {
            dialogId: req.body.dialogId,
            openid: req.body.openid
        }
    })

    let ret1 = await Answer.destroy({
        dialogId: req.body.dialogId,
        openid: req.body.openid
    })

    console.log(ret, 'deleteDialog')
    if (ret == 1&&ret1==1) {
        await t.commit();
        res.send({
            code: 200,
            msg: '删除成功'
        })
    }else{
        await t.rollback();
    }

})


router.post('/getDialogList', async (req, res) => {
    let ret = await Dialog.findAll({
        where: {
            openid: req.body.openid
        }
    })
    console.log(ret, 'getDialogList')
    res.send(ret)
})


router.post('/getAnswerList', async (req, res) => {
    let ret = await Answer.findAll({
        where: {
            openid: req.body.openid,
            dialogId: req.body.dialogId
        }
    })
    console.log(ret, 'getAnswerList')
    res.send(ret)
})

router.post('/addAnswerList', async (req, res) => {
    let ret = await Answer.create(req.body)

    console.log(ret, 'getAnswerList')
    if (ret == 1) {
        res.send({
            code: 200,
            msg: '删除成功'
        })
    }
})






export default router