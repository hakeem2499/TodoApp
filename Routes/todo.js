const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const homeController = require('../controllers/todo');


router.get('/', homeController);

router.get(('/add-todo'), (req, res, next) => {
    try {
        res.render('new-todo.ejs')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get(('/update-todo'), (req, res, next) => {
    try {
        res.render('update-todo.ejs')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get(('/delete-todo'), (req, res, next) => {
    try {
        res.render('delete-todo.ejs')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/add-todo', async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title){
            res.status(400).json({ error: "Title is required" }); 
        }
        if (!description){
            res.status(400).json({ error: "Description is required" });
        }
        const todo = new Todo({title, description});
        await todo.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});
module.exports = router;