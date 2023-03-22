// const { User } = require("../db");
import { User, Dialog, Answer, sequelize } from "../db.js";
import express from 'express'
// var express = require('express');
let router = express.Router();

router.post('/getUserInfo', async (req, res) => {

    console.log('getUserInfo请求参数openid', req.body.openid)
    let ret = await User.findOne({
        where: {
            openid: req.body.openid
        }
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

router.post('/updateUserInfo', async (req, res) => {
    console.log('updateUserInfo', req.body)
    let ret = await User.update(req.body,{
        where:{
            openid:req.body.openid
        }
    })
    console.log(ret,'updateUserInfo')
    res.send(ret)
});

//根据userid修改积分
router.post('/updateUserPoints', async (req, res) => {
    console.log('updateUserPoints被调用,',req.body)
    let ret = await User.increment('points',{
        where:{
            userId:req.body.userId
        },
        by:req.body.addNum
    })
    console.log(ret, 'updateUserPoints')

    res.send(ret)
})



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
        where: {
            dialogId: req.body.dialogId,
            openid: req.body.openid
        }
    })

    console.log(ret, 'deleteDialog')
    if (ret == 1 && ret1 == 1) {
        await t.commit();
        res.send({
            code: 200,
            msg: '删除成功'
        })
    } else {
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

    let ret = await Answer.upsert(req.body)
    console.log(ret, 'addAnswerList')

    res.send(ret)
})









export default router