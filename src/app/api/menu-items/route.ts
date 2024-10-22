import { isAdmin } from '@/app/api/auth/[...nextauth]/route';
import { MenuItem } from '@/models/MenuItem';
import mongoose from 'mongoose';
import { z } from 'zod';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ message: 'Access denied' }, { status: 403 });
  }

  const body = await req.json();

  const extraPriceSchema = z.array(
    z.object({
      name: z
        .string({ message: 'Size name should be a string' })
        .min(1, 'Size name is too short'),
      price: z
        .number({ message: 'Size price should be a number' })
        .positive('Size price should be positive number'),
    }),
  );
  const menuItemSchema = z.object({
    name: z
      .string({ message: 'Name should be a string' })
      .min(1, 'Name is too short'),
    description: z
      .string({ message: 'Description should be a string' })
      .min(20, 'Description should be at least 20 characters'),
    category: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }, 'Category id is incorrect'),
    basePrice: z
      .number({ message: 'Base price should be a number' })
      .positive('Base price should be positive number'),
    sizes: extraPriceSchema.optional(),
    extraIngredientPrices: extraPriceSchema.optional(),
  });
  const validationResult = menuItemSchema.safeParse(body);

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const menuItemDoc = await MenuItem.create(validationResult.data);
  return Response.json(menuItemDoc);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ message: 'Access denied' }, { status: 403 });
  }

  const body = await req.json();
  const extraPriceSchema = z.array(
    z.object({
      name: z
        .string({ message: 'Size name should be a string' })
        .min(1, 'Size name is too short')
        .optional(),
      price: z
        .number({ message: 'Size price should be a number' })
        .positive('Size price should be positive number')
        .optional(),
    }),
  );
  const menuItemSchema = z.object({
    _id: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }, 'Menu item id is incorrect')
      .optional(),
    name: z
      .string({ message: 'Name should be a string' })
      .min(1, 'Name is too short')
      .optional(),
    description: z
      .string({ message: 'Description should be a string' })
      .min(20, 'Description should be at least 20 characters')
      .optional(),
    category: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }, 'Category id is incorrect')
      .optional(),
    basePrice: z
      .number({ message: 'Base price should be a number' })
      .positive('Base price should be positive number')
      .optional(),
    sizes: extraPriceSchema.optional(),
    extraIngredientPrices: extraPriceSchema.optional(),
  });
  const validationResult = menuItemSchema.safeParse(body);

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const { _id, ...data } = validationResult.data;
  const result = await MenuItem.updateOne({ _id }, data);
  if (!result.modifiedCount) {
    return Response.json(
      {
        error: [
          {
            message: 'Category not found',
          },
        ],
      },
      { status: 404 },
    );
  }
  return Response.json({ message: 'Category has been updated successfully' });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ message: 'Access denied' }, { status: 403 });
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  const updateCategorySchema = z.object({
    _id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }, 'Menu item id is incorrect'),
  });
  const validationResult = updateCategorySchema.safeParse({ _id });

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  await MenuItem.deleteOne({ _id });
  return Response.json({ message: 'Menu item has been deleted successfully' });
}

export async function GET() {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const menuItems = await MenuItem.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
  ]);
  return Response.json(menuItems);
}
