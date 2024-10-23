import { Order } from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK as string, {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  let event: Stripe.Event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET as string;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    return NextResponse.json(e, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const orderId = (event.data.object as any).metadata.orderId;
    const isPaid = (event.data.object as any).payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

  return NextResponse.json('ok', { status: 200 });
}
