const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
    },
    { timestamps: true },

);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;