import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.MONGO_URL as string);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url as string);
    const _id = url.searchParams.get('_id');
    if (_id) {
        const order = await Order.findById(_id);
        return res.json(order);
    }

    if (admin) {
        const orders = await Order.find();
        return res.json(orders);
    }

    if (userEmail) {
        const userOrders = await Order.find({ userEmail });
        return res.json(userOrders);
    }

    return res.status(404).json({ message: "Orders not found" });
}
