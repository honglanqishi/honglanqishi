const { User } = require("../db");
var express = require('express')
let router = express.Router()

router.get('/userInfo',async(req,res)=>{

    console.log(req,'请求对象')
    console.log(res,'返回对象')
    // await User.findAll({
    //     where: {
    //         oepnid: 2
    //       }
    // })
})


module.exports = router