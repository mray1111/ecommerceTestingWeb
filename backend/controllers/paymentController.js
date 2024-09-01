const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY || "sk_test_51O4MU8SEQEh6MfmpHgknJQkn5c8Iv8OO2kOkDFTa5D3hYqi6dK6QgcRivJKP3l7JSizRCrYeYUeb7N9zEKOVABhW00FXCWSOhV"
const STRIPE_API_KEY=process.env.STRIPE_API_KEY||"pk_test_51O4MU8SEQEh6MfmpEv6CgirWqh2YynFW6KmXWdM9C6NrJLRfdEDQioT8RNrhtMX3HA6jR3rcY9UxogIJqVozgbim00NUUopTFc"
const stripe = require("stripe")(STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    description: "Description of the product or service",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: STRIPE_API_KEY });
});
