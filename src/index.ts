import express, { Request, Response } from "express";
import {
  createShopifyOrder,
  getAllOrders,
} from "./controllers/orderController";
//import { updateStock } from "./controllers/stockController";
import { PORT } from "./utils/env";
const app = express();

if (
  !process.env.SHOPIFY_API_KEY ||
  !process.env.SHOPIFY_API_SECRET ||
  !process.env.SHOPIFY_APP_URL
) {
  throw new Error(
    "Missing Shopify API environment variables. Please set SHOPIFY_API_KEY, SHOPIFY_API_SECRET, and SHOPIFY_APP_URL."
  );
}

app.use(express.json());
// Endpoint to forward orders to the warehouse

app.get("/orders", async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post(
  "/webhooks/order/create",
  async (req: Request, res: Response, next: Function) => {
    await createShopifyOrder(req, res);
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
