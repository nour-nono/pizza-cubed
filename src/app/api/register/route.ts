import { User } from "@/app/models/User";
import mongoose from "mongoose";
export async function POST(req: Request) {
  const body = await req.json();  // Parse the request body it should be {email: string, password: string }
  mongoose.connect(process.env.MONGODB_URI as string,
    {dbName: "pizza_cubed"}
  );  // Connect to the database
  mongoose.set("strictQuery", true);  // if true, mongoose will throw an error if you try to query by a field that is not in the schema
  const user = new User(body);  // Create a new user
  await user.save();  // Save the user to the database
  return Response.json(user);
}
