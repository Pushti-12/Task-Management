const Task = require('../models/Task');
const { taskSchema, updateTaskSchema } = require('../utils/validation');

const createTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, description, dueDate, status } = req.body;
  const userId = req.user.id;

  try {
    const task = new Task({ title, description, dueDate, status, userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ _id: id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndUpdate({ _id: id, userId }, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };