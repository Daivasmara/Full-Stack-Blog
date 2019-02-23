const express = require('express');
const router = express.Router();

// model
const posts = require('../models/posts');

router.get('/', (req, res) => {
    posts.getAll().then(posts => {
        res.status(200);
        res.json({
            message: 'OK',
            result: posts
        });
    });
});

router.get('/:id', (req, res) => {
    posts.getOne(req.params.id).then(posts => {
        res.status(200);
        res.json({
            message: 'OK',
            result: posts
        });
    });
});

router.post('/', (req, res) => {
    posts.insert(req.body).then(response => {
        res.status(200);
        res.json({
            message: 'OK',
            result: response
        });
    }).catch(error => {
        res.status(400);
        res.json({
            message: 'ERROR',
            result: error
        });
    });
});

router.put('/:id', (req, res) => {
    posts.update(req.params.id, req.body).then(response => {
        res.status(200);
        res.json({
            message: 'OK',
            result: response
        });
    }).catch(error => {
        res.status(400);
        res.json({
            message: 'ERROR',
            result: error
        });
    });
});

router.delete('/:id', (req, res) => {
    posts.remove(req.params.id).then(posts => {
        res.status(200);
        res.json({
            message: 'OK',
            result: posts
        });
    });
});


module.exports = router;