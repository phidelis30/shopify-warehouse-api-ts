import axios from "axios";
import { client } from "../utils/shopifyClient";
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// get all orders from Shopify
export const getAllOrders = async (): Promise<any> => {
  try {
    const orders = await client.get({
      path: `orders`,
    });
    return orders.body.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

// create a new order in the database with web hooks
export const createShopifyOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    console.log("New order received:", order);

    // Check if the customer exists
    let customer = await prisma.customer.findUnique({
      where: { shopifyCustomerId: BigInt(order.customer.id) },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          shopifyCustomerId: BigInt(order.customer.id),
          email: order.customer.email,
          firstName: order.customer.first_name,
          lastName: order.customer.last_name,
          verifiedEmail: order.customer.verified_email,
        },
      });
    }

    // Store shipping address
    const shippingAddress = await prisma.address.create({
      data: {
        firstName: order.shipping_address?.first_name,
        lastName: order.shipping_address?.last_name,
        company: order.shipping_address?.company,
        address1: order.shipping_address?.address1,
        address2: order.shipping_address?.address2,
        city: order.shipping_address?.city,
        province: order.shipping_address?.province,
        country: order.shipping_address?.country,
        zip: order.shipping_address?.zip,
        phone: order.shipping_address?.phone,
        countryCode: order.shipping_address?.country_code,
        provinceCode: order.shipping_address?.province_code,
      },
    });

    // Store billing address
    const billingAddress = await prisma.address.create({
      data: {
        firstName: order.billing_address?.first_name,
        lastName: order.billing_address?.last_name,
        company: order.billing_address?.company,
        address1: order.billing_address?.address1,
        address2: order.billing_address?.address2,
        city: order.billing_address?.city,
        province: order.billing_address?.province,
        country: order.billing_address?.country,
        zip: order.billing_address?.zip,
        phone: order.billing_address?.phone,
        countryCode: order.billing_address?.country_code,
        provinceCode: order.billing_address?.province_code,
      },
    });

    // Store the order
    const newOrder = await prisma.shopifyOrder.create({
      data: {
        shopifyOrderId: BigInt(order.id),
        orderNumber: order.order_number,
        contactEmail: order.contact_email,
        createdAt: new Date(order.created_at),
        cancelledAt: order.cancelled_at ? new Date(order.cancelled_at) : null,
        financialStatus: order.financial_status,
        fulfillmentStatus: order.fulfillment_status,
        currency: order.currency,
        totalPrice: parseFloat(order.total_price),
        subtotalPrice: parseFloat(order.subtotal_price),
        totalDiscounts: parseFloat(order.total_discounts),
        totalTax: parseFloat(order.total_tax),
        totalShipping: parseFloat(
          order.total_shipping_price_set.shop_money.amount
        ),
        buyerAcceptsMarketing: order.buyer_accepts_marketing,
        testOrder: order.test,
        customerId: customer.id,
        shippingAddressId: shippingAddress.id,
        billingAddressId: billingAddress.id,
      },
    });

    // Store line items
    for (const item of order.line_items) {
      await prisma.lineItem.create({
        data: {
          shopifyLineItemId: BigInt(item.id),
          orderId: newOrder.id,
          productId: item.product_id ? BigInt(item.product_id) : null,
          variantId: item.variant_id ? BigInt(item.variant_id) : null,
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
          requiresShipping: item.requires_shipping,
        },
      });
    }

    return res
      .status(201)
      .json({ message: "Order saved successfully!", order: newOrder });
  } catch (error) {
    console.error("Error saving Shopify order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
