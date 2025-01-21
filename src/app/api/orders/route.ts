import { isAdmin, getUserEmail } from '@/app/lib/userInfos';
import { MongoDBConnection } from '@/app/lib/mongoClient';
import { Order } from '@/models/Order';
import mongoose from 'mongoose';
import { z } from 'zod';

export async function GET(req: Request) {
  await MongoDBConnection();
  let options = {};

  if (!(await isAdmin())) {
    const email = await getUserEmail();
    options = {
      userEmail: email,
    };
  }
  
  // if the url has id of the order, then return this specific order
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (_id) {
    const res = await Order.findById(_id);
    return Response.json(res);
  }

  const orders = await Order.find(options);
  // actually, that's not an error, this a valid response
  /*
  if (!orders.length) {
    return Response.json(
      { error: [{ message: 'No orders founds' }] },
      { status: 404 },
    );
  }
  */
  return Response.json(orders);
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  const updateOrderSchema = z.object({
    _id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }, 'Order id is incorrect'),
  });
  const validationResult = updateOrderSchema.safeParse({ _id });

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  await Order.updateOne({ _id }, { canceled: true });
  return Response.json({ message: 'Order has been canceled successfully' });
}
