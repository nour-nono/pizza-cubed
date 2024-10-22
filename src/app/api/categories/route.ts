import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/models/Category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface CategoryRequest extends NextRequest {
    json: () => Promise<{ name: string; _id?: string }>;
}

mongoose.connect(process.env.MONGO_URL as string);

export async function POST(req: CategoryRequest) {
    const { name } = await req.json();

    if (await isAdmin()) {
        const categoryDoc = await Category.create({ name });
        return NextResponse.json(categoryDoc);
    } else {
        return NextResponse.json({});
    }
}

export async function PUT(req: CategoryRequest) {
    const { _id, name } = await req.json();

    if (await isAdmin()) {
        await Category.updateOne({ _id }, { name });
    }

    return NextResponse.json(true);
}

export async function GET() {
    const categories = await Category.find();
    return NextResponse.json(categories);
}

export async function DELETE(req: CategoryRequest) {
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (await isAdmin()) {
        await Category.deleteOne({ _id });
    }

    return NextResponse.json(true);
}
