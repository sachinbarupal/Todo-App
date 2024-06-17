const zod = require("zod");

const todoZodSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string(),
});

const updateTodoZodSchema = zod.object({
  _id: zod.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: "Invalid ObjectId format",
  }),
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
