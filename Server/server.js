require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://checkout.stripe.com",
  "https://matjar-app.vercel.app",
];
const YOUR_DOMAIN = "https://matjar-app.vercel.app";

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://matjar-app.vercel.app"); // Allow requests from your frontend port
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  next();
});
app.options("*", cors());

app.post("/create-customer", async (req, res) => {
  const { email, name } = req.body;
  try {
    const customer = await stripe.customers.create({ email, name });
    res.status(200).json({ customerId: customer.id });
    console.log();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/find-customer", async (req, res) => {
  const { email } = req.body;
  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length > 0) {
      const customer = customers.data[0];
      res.json({ customerId: customer.id });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/checkout", async (req, res) => {
  const { customerId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      invoice_creation: {
        enabled: true,
      },
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1QczgIEA6Fd2DvFig0e4Osqm" },
        { shipping_rate: "shr_1Qczh8EA6Fd2DvFimTT4063H" },
      ],
      line_items: req.body.cart.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.imageUrl],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.qty,
        };
      }),
      success_url: `${YOUR_DOMAIN}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cart`,
      customer: customerId,
      metadata: {
        fullName: req.body.address.fullName,
        phone: req.body.address.phoneNumber,
        city: req.body.address.city,
        address: req.body.address.streetAddress,
      },
    });

    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://matjar-app.vercel.app"
    ); // Set to specific origin
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    ); // Allow methods
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    ); // Allow headers
    res.status(200).json({ url: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res
      .status(400)
      .json({ error: "An error occurred, unable to create session" });
  }
});

app.post("/account/orders/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
    });
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://matjar-app.vercel.app"
    ); // Set to specific origin
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    ); // Allow methods
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    ); // Allow headers
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

app.post("/session/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  console.log("Session ID:", sessionId);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );
    let invoice = null;

    if (session) {
      invoice = await stripe.invoices.retrieve(paymentIntent.invoice);
      res.json({
        session,
        invoice,
      });
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to fetch session data" });
  }
});

app.listen(4242, () => console.log("Running on port 4242"));
