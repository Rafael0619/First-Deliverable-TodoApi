const { Todo } = require('../models/todo.model');
const { filterObj } = require('../util/filterObj');
const req = require('express/lib/request');
const res = require('express/lib/response');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { status: 'Active' } });

    res.status(200).json({
      data: {
        todos
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { content } = req.body;

    const newTodo = Todo.create({
      content
    });

    res.status(201).json({
      status: 'success',
      data: {
        newTodo: {
          content
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = filterObj(req.body, 'content');

    const todo = await Todo.findOne({ where: { status: 'Active', id: id } });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant Update todo, Invalid id'
      });
      return;
    }

    await todo.update({ ...data });
    res.status(204).json({
      status: 'Success'
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findOne({ where: { id, status: 'Active' } });

  if (!todo) {
    res.status(404).json({
      status: 'error',
      message: 'Doesnt exist Todo with the given Id'
    });
    return;
  }

  await todo.update({ status: 'Deleted' });

  res.status(204).json({
    status: 'Success'
  });
};
