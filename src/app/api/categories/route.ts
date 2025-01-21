import { isAdmin } from '@/app/lib/userInfos';
import { Category } from '@/models/Category';
import mongoose from 'mongoose';
import { z } from 'zod';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ message: 'Access denied' }, { status: 403 });
  }

  const body = await req.json();
  const createCategorySchema = z.object({
    name: z
      .string({ message: 'Category name should be a string' })
      .min(1, 'Category name is too short'),
  });
  const validationResult = createCategorySchema.safeParse(body);

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const categoryDoc = await Category.create({
    name: validationResult.data.name,
  });
  return Response.json(categoryDoc);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ message: 'Access denied' }, { status: 403 });
  }

  const body = await req.json();
  const updateCategorySchema = z.object({
    _id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }, 'Category id is incorrect'),
    name: z
      .string({ message: 'Category name should be a string' })
      .min(1, 'Category name is too short'),
  });
  const validationResult = updateCategorySchema.safeParse(body);

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const { _id, name } = validationResult.data;
  const result = await Category.updateOne({ _id }, { name });
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
    }, 'Category id is incorrect'),
  });
  const validationResult = updateCategorySchema.safeParse({ _id });

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  await Category.deleteOne({ _id });
  return Response.json({ message: 'Category has been deleted successfully' });
}

export async function GET() {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const categories = await Category.find();
  return Response.json(categories);
}
