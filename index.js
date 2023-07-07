require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const port = process.env.PORT;
const { connectDb, disconnectDb } = require("./config/mongoose");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const authorizer = require("./authorizer/authorizer");
const orderRouter = require("./routes/order");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log('API is working fine!');
  res.json({ message: "You are connected to ShopON ecom-web rest API HomePage..." });
});

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', authorizer, cartRouter);
app.use('/api/orders', authorizer, orderRouter);

app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`Server is connected to the port ${port}`);
  } catch (err) {
    console.log("Error in running server", err);
  }
});

// Handle process termination and disconnect from MongoDB
process.on('SIGINT', async () => {
  try {
    await disconnectDb();
    process.exit(0);
  } catch (err) {
    console.log("Error in disconnecting from MongoDB", err);
    process.exit(1);
  }
});
