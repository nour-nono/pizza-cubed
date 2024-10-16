import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  const { name } = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req: Request) {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  const { _id, name } = await req.json();
  if (await isAdmin()) {
    await Category.updateOne({ _id }, { name });
  }
  return Response.json(true);
}

export async function GET() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  return Response.json(await Category.find());
}

export async function DELETE(req: Request) {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Category.deleteOne({ _id });
  }
  return Response.json(true);
}
