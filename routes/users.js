const { User } = require("../db");
var express = require('express');
let router = express.Router();

router.post('/userInfo', async (req, res) => {

    console.log(req, '请求对象')
    console.log(res, '返回对象')
    let ret = await User.findAll({
        where: {
            openid: req.body.oepnid
          }
    })

    res.send(ret)
});


module.exports = router