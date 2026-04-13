const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  status: Joi.string().valid('pending', 'completed').optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid('pending', 'completed').optional(),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  taskSchema,
  updateTaskSchema,
};