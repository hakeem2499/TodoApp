
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

// initialize application
const app = express();

const PORT = 3000;

const connectionUrl = "mongodb://localhost:27017/todoDb";


mongoose
    .connect(connectionUrl)
    .then(() => { console.log("Connect to database successfully") })
    .catch((error) => console.log(error.message));
//view engine

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

//database schema 
const todoSchema = mongoose.Schema(
    {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
    },
    { timestamps: true },

);
const Todo = mongoose.model('Todo', todoSchema);

//routes
app.get('/', async(req, res) => {
    try {
        const todos = await Todo.find({}).sort({createdAt: -1});
        res.locals.moment = moment;
        res.render('index.ejs', {title: "List todo", todos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get(('/add-todo'), (req, res, next) => {
    try {
        res.render('new-todo.ejs')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get(('/update-todo'), (req, res, next) => {
    try {
        res.render('update-todo.ejs')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get(('/delete-todo'), (req, res, next) => {
    try {
        res.render('delete-todo.ejs')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/add-todo', async (req, res, next) => {
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});