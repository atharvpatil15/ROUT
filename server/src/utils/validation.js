const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const productSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.number().positive(),
    category: z.enum(['Green', 'Black', 'Oolong', 'White', 'Herbal', 'Matcha', 'Pu-erh', 'Blends']),
    origin: z.string(),
    weight: z.number().positive(),
    steepingInstructions: z.object({
      temperature: z.number().min(0).max(100),
      time: z.number().positive(),
    }),
    stock: z.number().int().nonnegative(),
    images: z.array(z.string().url()).optional(),
    isFeatured: z.boolean().optional(),
  }),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error',
      errors: err.errors,
    });
  }
};

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  validate,
};
