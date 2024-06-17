const zod = require("zod");

const todoZodSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string(),
});

const updateTodoZodSchema = zod.object({
  _id: zod.string(),
});

const userZodSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(1),
});

module.exports = {
  todoZodSchema,
  updateTodoZodSchema,
  userZodSchema,
};
