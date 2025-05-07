const express = require('express');
const router = express.Router();

//Router
router.get('', (req, res) => {
    const locals = {
        title : "NodeJs Blog",
        description : "Simple Blog created with NodeJs, Express & MongoDB."
    }
    res.render('index', { locals });
 });

router.get('/about', (req, res) => {
    res.render('about');
 });

module.exports = router;