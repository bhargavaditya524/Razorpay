// import dotenv from "dotenv";
// import express from "express";
// import Razorpay from "razorpay";

// /* Load env variables */
// dotenv.config({ path: "./config/config.env" });

// const app = express();


// /* Razorpay instance */
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /* Server */
// app.listen(process.env.PORT || 4000, () => {
//   console.log(`Server running on port ${process.env.PORT || 4000}`);
// });

// export { razorpay as instance };

import express from "express";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(express.json());

/* Add this line */
app.use("/api", paymentRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
