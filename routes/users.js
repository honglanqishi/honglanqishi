const { User } = require("../db");
var express = require('express');
let router = express.Router();

router.post('/userInfo', async (req, res) => {

   
    let ret = await User.findAll({
        where: {
            openid: req.body.oepnid
          }
    })
    console.log(ret)
    // res.send(ret)
});


module.exports = router