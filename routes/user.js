var express = require('express');
var router = express.Router();

router.put('/update',(req, res)=>{
    res.send("You've done an update")
})


module.exports = router;