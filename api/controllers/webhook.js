import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51OQqOjSEuj1HRmQXbOGow0OlEtiGSIVIYYQOjQlZ6EqBMkp2rRElclRHKMZcW31YUYJx1sLnOGiX2rpSvepx51ZS00X8gXNPgv");


export const payment_intent = async (req, res) => {
    console.log('payment intent');
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
}
export const webhook =  (req, res) => {
        console.log('webhook');    
        const sig = req.headers['stripe-signature'];
      
        let event;
      
        try {
          event = stripe.webhooks.constructEvent(req.rawBody, sig, 'your_webhook_secret_here');
        } catch (err) {
          return res.status(400).send(`Webhook Error: ${err.message}`);
        }
      
        // Handle the event
        switch (event.type) {
          case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Handle successful payment
            break;
          case 'payment_intent.failed':
            const paymentIntentFailed = event.data.object;
            // Handle failed payment
            break;
          // Handle other event types as needed
          default:
            console.log(`Unhandled event type: ${event.type}`);
        }
      
        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
      };
    
