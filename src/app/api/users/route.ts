import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";

export async function GET(): Promise<Response> {
    await mongoose.connect(process.env.MONGO_URL as string);

    if (await isAdmin()) {
        const users = await User.find();
        return new Response(JSON.stringify(users), { status: 200 });
    } else {
        return new Response(JSON.stringify([]), { status: 200 });
    }
}
