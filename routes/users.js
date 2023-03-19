const { User } = require("../db");
var express = require('express');
let router = express.Router();

router.post('/userInfo', async (req, res) => {

    console.log('openid', req.body.oepnid)
    let ret = await User.findAll({
        where: {
            openid: req.body.oepnid
        }
    })
    console.log(ret,'查询结果')
    // res.send(ret)
});


module.exports = router