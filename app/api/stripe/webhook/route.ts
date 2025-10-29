import Stripe from "stripe";
import { NextRequest } from "next/server";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, { 
    apiVersion: "2025-07-30.basil" 
  });
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature")!;
  const buf = await req.text(); // important: raw body
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("Webhook event received:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment successful for session:", session.id);
        
        // TODO: Map customer to userId and update user.pro = true in database
        // Example:
        // const customerId = session.customer as string;
        // const email = session.customer_details?.email || session.metadata?.email;
        // await updateUserProStatus(email, true, customerId);
        
        break;
      }
      
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment failed for invoice:", invoice.id);
        
        // TODO: Temporarily disable pro access if payment fails
        // const customerId = invoice.customer as string;
        // await handlePaymentFailure(customerId);
        
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription cancelled:", subscription.id);
        
        // TODO: Remove pro access when subscription is cancelled
        // const customerId = subscription.customer as string;
        // await updateUserProStatus(customerId, false);
        
        break;
      }
      
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", subscription.id);
        
        // Handle subscription changes (plan changes, etc.)
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
