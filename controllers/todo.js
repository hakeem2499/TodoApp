const moment = require('moment');
const Todo = require("../models/Todo");

const homeController = async(req, res) => {
    try {
        const todos = await Todo.find({}).sort({createdAt: -1});
        res.locals.moment = moment;
        res.render('index.ejs', {title: "List todo", todos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = homeController;