const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { parse } = require('dotenv');

//Router
/**
 * GET
 * Home
 */
router.get('', async(req, res) => {
    try {
        const locals = {
            title : "NodeJs Blog",
            description : "Simple Blog created with NodeJs, Express & MongoDB."
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ {$sort: { createAt: -1 }}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }
});

//  router.get('', async(req, res) => {
//     const locals = {
//         title : "NodeJs Blog",
//         description : "Simple Blog created with NodeJs, Express & MongoDB."
//     }

//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data });
//     } catch (error) {
//         console.log(error);
//     }

//     res.render('index', { locals });
//  });


//  function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text"
//         },
//     ])
//  }
//  insertPostData();

/**
 * GET
 * Post :id
 */
 router.get('/post/:id', async(req, res) => {
    try {
        const locals = {
            title : "NodeJs Blog",
            description : "Simple Blog created with NodeJs, Express & MongoDB."
        }

        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });
        res.render('post', { locals, data });
    } catch (error) {
        console.log(error);
    }
 });


router.get('/about', (req, res) => {
    res.render('about');
 });

module.exports = router;