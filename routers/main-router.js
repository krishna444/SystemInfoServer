var express = require('express');
var router = express.Router();

const serverInfo = require('../ServerInfo')



router.get("/", function (req, res) {
    res.render('index', { "serverInfo": serverInfo });
});

router.get("/about", function (req, res) {
    res.render("about");
});

router.get('/chat', (req, res) => {
    if (req.session.user) {
        console.log("Welcome "+req.session.user)
        res.render('comm/comm');
    } else {
        res.render('comm/login')
    }
});


router.get('/login', (req, res) => {
    req.session.user = "USER";
    res.redirect('chat');
});


router.get("/system-basic", (req, res) => {
    res.render('system-info/basic', { "serverInfo": serverInfo });
});

router.get("/system-advanced", (req, res) => {
    res.render('system-info/advanced', { "serverInfo": serverInfo });
});

router.get("/system-misc", (req, res) => {
    res.render('system-info/misc', { "serverInfo": serverInfo });
});

router.get("/:not_found", (req, res) => {
    res.render('page-not-found', { page: req.params.not_found })
});


module.exports = router