const express = require('express');
const app = express();
app.use(express.json());

let todos = []; 

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'المهمة غير موجودة' });
    res.json(todo);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'The task is not define ' });

    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('3000');
});
