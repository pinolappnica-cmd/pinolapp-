import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function createPaymentIntent(amount: number, currency = "usd") {
  return stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
  });
}

export async function confirmPayment(paymentIntentId: string) {
  return stripe.paymentIntents.confirm(paymentIntentId);
}
