const db = require('../bin/database/db');

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/user/:nickName', function (req, res, ) {
    res.setHeader('Content-Type', 'application/json');
    db.addUser(req.params.nickName).then(status => {

        if (status)
            res.send(JSON.stringify({status: true}));

        else
            res.send(JSON.stringify({status: false}));


    })

});
router.get('/user/check/:nickName', function (req, res, ) {
    res.setHeader('Content-Type', 'application/json');
    db.checkUser(req.params.nickName).then(status => {

        if (status)
            res.send(JSON.stringify({status: true}));

        else
            res.send(JSON.stringify({status: false}));


    })

});


router.get('/history/:length', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    db.getHistoryMessagesLength().then(countMessagesInDB=>{
       if(req.params.length<countMessagesInDB)
           db.getHistoryMessages(Number(req.params.length)).then(arMessages => {
            res.send(JSON.stringify(arMessages))
        });
        else res.send(JSON.stringify(false))

    })
});

module.exports = router;
