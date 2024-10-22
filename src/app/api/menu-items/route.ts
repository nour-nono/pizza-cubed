import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

mongoose.connect(process.env.MONGO_URL as string);

export async function POST(req: NextRequest) {
    const data = await req.json();
    if (await isAdmin()) {
        const menuItemDoc = await MenuItem.create(data);
        return NextResponse.json(menuItemDoc);
    } else {
        return NextResponse.json({});
    }
}

export async function PUT(req: NextRequest) {
    const { _id, ...data } = await req.json();
    if (await isAdmin()) {
        await MenuItem.findByIdAndUpdate(_id, data);
    }
    return NextResponse.json(true);
}

export async function GET() {
    const menuItems = await MenuItem.find();
    return NextResponse.json(menuItems);
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
        await MenuItem.deleteOne({ _id });
    }
    return NextResponse.json(true);
}
