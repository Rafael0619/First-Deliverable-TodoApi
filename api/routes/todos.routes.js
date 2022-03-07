const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller');

router.get('/', getAllTodos);

router.post('/', createTodo);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = { todoRouter: router };
