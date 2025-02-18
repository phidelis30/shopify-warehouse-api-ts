import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT!;
export const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY!;
export const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET!;
export const SHOPIFY_APP_URL = process.env.SHOPIFY_APP_URL!;
export const SHOPIFY_API_ACCESS = process.env.SHOPIFY_API_ACCESS!;
export const WAREHOUSE_API_URL = process.env.WAREHOUSE_API_URL!;
export const WAREHOUSE_API_KEY = process.env.WAREHOUSE_API_KEY!;
