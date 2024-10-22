import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

interface UserData {
    _id?: string;
    name: string;
    image: string;
    [key: string]: any;
}

export async function PUT(req: Request) {
    await mongoose.connect(process.env.MONGO_URL!);

    const data: UserData = await req.json();
    const { _id, name, image, ...otherUserInfo } = data;

    let filter = {};

    if (_id) {
        filter = { _id };
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        filter = { email };
    }

    const user = await User.findOne(filter);
    await User.updateOne(filter, { name, image });
    await UserInfo.findOneAndUpdate({ email: user?.email }, otherUserInfo, { upsert: true });

    return new Response(JSON.stringify(true), {
        headers: { 'Content-Type': 'application/json' },
    });
}
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.MONGO_URL!);

    const url = new URL(req.url!, `http://${req.headers.host}`);
    const _id = url.searchParams.get('_id');

    let filterUser = {};

    if (_id) {
        filterUser = { _id };
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) {
            return res.json({});
        }

        filterUser = { email };
    }

    const user = await User.findOne(filterUser).lean();
    const userInfo = await UserInfo.findOne({ email: user?.email }).lean();

    return res.json({ ...user, ...userInfo });
}
