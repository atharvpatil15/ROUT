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

const productBodySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  category: z.enum(['Green', 'Black', 'Oolong', 'White', 'Herbal', 'Matcha', 'Pu-erh', 'Blends', 'Spiced', 'Pure']),
  origin: z.string().min(2),
  weight: z.coerce.number().positive(),
  steepingInstructions: z.object({
    temperature: z.coerce.number().min(0).max(100),
    time: z.coerce.number().positive(),
    amount: z.string().optional(),
  }),
  stock: z.coerce.number().int().nonnegative(),
  images: z.array(z.string().url()).optional(),
  isFeatured: z.boolean().optional(),
});

const productSchema = z.object({
  body: productBodySchema,
});

const productUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.coerce.number().positive().optional(),
    category: z.enum(['Green', 'Black', 'Oolong', 'White', 'Herbal', 'Matcha', 'Pu-erh', 'Blends', 'Spiced', 'Pure']).optional(),
    origin: z.string().min(2).optional(),
    weight: z.coerce.number().positive().optional(),
    steepingInstructions: z.object({
      temperature: z.coerce.number().min(0).max(100).optional(),
      time: z.coerce.number().positive().optional(),
      amount: z.string().optional(),
    }).optional(),
    stock: z.coerce.number().int().nonnegative().optional(),
    images: z.array(z.string().url()).optional(),
    isFeatured: z.boolean().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required for update',
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
  productUpdateSchema,
  validate,
};
