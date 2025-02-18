import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION, Session } from "@shopify/shopify-api";
import {
  SHOPIFY_API_ACCESS,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_APP_URL,
} from "./env";

export const shopify = shopifyApi({
  apiKey: SHOPIFY_API_KEY,
  apiSecretKey: SHOPIFY_API_SECRET,
  scopes: ["read_products", "write_inventory", "read_orders"],
  hostName: SHOPIFY_APP_URL,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

export const session = new Session({
  id: `offline_${SHOPIFY_APP_URL}`,
  shop: SHOPIFY_APP_URL,
  state: "state",
  isOnline: false,
  accessToken: SHOPIFY_API_ACCESS,
});

export const client = new shopify.clients.Rest({
  apiVersion: LATEST_API_VERSION,
  session,
});

if (!shopify.rest || !shopify.rest.Order) {
  console.error("Failed to initialize Shopify API");
}
