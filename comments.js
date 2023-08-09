// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');
const Comment = db.Comment;
const User = db.User;

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
router.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) return res.status(500).send('There was a problem finding the comments.');
        res.status(200).send(comments);
    });
});

// Get a comment by id
router.get('/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) return res.status(500).send('There was a problem finding the comment.');
        if (!comment) return res.status(404).send('No comment found.');
        res.status(200).send(comment);
    });
});

// Get all comments by a user
router.get('/user/:id', (req, res) => {
    Comment.find({ user: req.params.id }, (err, comments) => {
        if (err) return res.status(500).send('There was a problem finding the comments.');
        res.status(200).send(comments);
    });
});

// Get all comments by a post
router.get('/post/:id', (req, res) => {
    Comment.find({ post: req.params.id }, (err, comments) => {
        if (err) return res.status(500).send('There was a problem finding the comments.');
        res.status(200).send(comments);
    });
});

// Create a comment
router.post('/', (req, res) => {
    User.findById(req.body.user, (err, user) => {
        if (err) return res.status(500).send('There was a problem finding the user.');
        if (!user) return res.status(404).send('No user found.');

        Comment.create({
            user: req.body.user,
            post: req.body.post,
            content: req.body.content
        }, (err, comment) => {
            if (err) return res.status(500).send('There was a problem creating the comment.');
            res.status(200).send(comment);
        });
    });
});

// Update a comment
router.put('/:id', (req,