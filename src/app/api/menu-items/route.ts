import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  const data = await req.json();
  if (await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req: Request) {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function GET() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  return Response.json(await MenuItem.find());
}

export async function DELETE(req: Request) {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await MenuItem.deleteOne({ _id });
  }
  return Response.json(true);
}
